class SaveManager extends ToolBase
{
	static c_key = Object.freeze("save-management");
	
	constructor()
	{
		super();
		this.key = SaveManager.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		add_to(
			this.tree[0],
			"span",
			{
				innerhtml:"The content of this web page is saved in your browser local storage.<br>Here you can export or import this data.<br>Note: The data is automatically wiped if you're using Private Browsing.",
				br:true
			}
		);
		add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Export to a File",
				onclick:(() => {
					this.export_all();
				})
			}
		).style.width = "250px";
		add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Import from a File",
				onclick:(() => {
					this.import_all();
				}),
				br:true
			}
		).style.width = "250px";
		add_to(this.tree[0], "hr");
		add_to(
			this.tree[0],
			"span",
			{
				innertext:"Manage your stored data:",
				br:true
			}
		);
		for(const tool of Object.values(tool_constructors))
		{
			const info = tool.get_tool_save_info();
			if(info != null)
			{
				add_to(
					this.tree[0],
					"div",
					{
						innertext:info.name
					}
				);
				
				this.create_manage_button(
					"Clear",
					(() => {
						this.clear(info);
					})
				);
				this.create_manage_button(
					"Export",
					(() => {
						this.export_single(info);
					})
				);
				this.create_manage_button(
					"Import",
					(() => {
						this.import_single(info);
					})
				);
				add_to(this.tree[0], "br");
			}
		}
	}
	
	create_manage_button(innertext, onclick)
	{
		let btn = add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:innertext,
				onclick:onclick
			}
		);
		btn.style.width = "120px";
		return btn;
	}
	
	clear(info)
	{
		try
		{
			if(localStorage.getItem(info.storage_key) != null)
			{
				if(window.confirm("ARE YOU SURE?\nThe data of '" + info.name + "' will be deleted."))
				{
					localStorage.removeItem(info.storage_key);
					push_popup("The data of '" + info.name + "' has been cleared.");
				}
			}
			else push_popup("'" + info.name + "' has no data in the locale storage.");
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
			push_popup("An unexpected error occured, the local storage might be unaccessible.");
		}
	}
	
	download_file(obj, file_name)
	{
		var data_url = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
		let a = document.createElement('a');
		a.setAttribute("href", data_url);
		a.setAttribute("download", file_name);
		a.click();
	}
	
	export_single(info)
	{
		const key = info.key;
		if(!(key in tool_constructors))
		{
			push_popup("An unexpected error occured.");
			return;
		}
		let obj = {};
		obj = tool_constructors[key].export_storage_data(obj);
		if(obj == {})
		{
			push_popup("There is no data to export.");
		}
		else
		{
			this.download_file(
				{key:key, obj:obj},
				"GBFTU_tool_" + key + "_" + new Date().toLocaleString() + ".json"
			);
		}
	}
	
	export_all()
	{
		let obj = {};
		for(const [key, object] of Object.entries(tool_constructors))
		{
			obj = object.export_storage_data(obj);
		}
		if(obj == {})
		{
			push_popup("There is no data to export.");
		}
		else
		{
			this.download_file(
				obj,
				"GBFTU_data_" + new Date().toLocaleString() + ".json"
			);
		}
	}
	
	upload_file(callback)
	{
		let input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.multiple = false;
		input.onchange = function(event)
		{
			if(this.files.length > 0)
			{
				var reader = new FileReader();
				reader.onload = function (e) {
					callback(reader);
				};
				reader.readAsText(this.files[0]);
			}
		};
		input.click();
	}
	
	import_single(info)
	{
		const key = info.key;
		if(!(key in tool_constructors))
		{
			push_popup("An unexpected error occured.");
			return;
		}
		this.upload_file((reader) => {
			try
			{
				let data = JSON.parse(reader.result);
				if(window.confirm("Are you sure you want to load this data for " + info.name +"?"))
				{
					if(typeof(data.key) == "undefined" || data.key != key)
					{
						push_popup("This file wasn't exported from this tool.");
					}
					else if(typeof(data.obj) == "undefined" || data.obj == null)
					{
						push_popup("This file contains no data.");
					}
					else
					{
						tool_constructors[key].import_storage_data(data.obj);
						if(key in tools)
							tools[key].reload();
						push_popup("Save file imported");
					}
				}
			}
			catch(err)
			{
				console.error("Exception thrown", err.stack);
				push_popup("The file isn't valid");
			}
		});
	}
	
	import_all()
	{
		this.upload_file((reader) => {
			try
			{
				let obj = JSON.parse(reader.result);
				if(window.confirm("Are you sure you want to load this data?"))
				{
					for(const [key, object] of Object.entries(tool_constructors))
					{
						object.import_storage_data(obj);
						if(key in tools)
							tools[key].reload();
					}
					push_popup("Save file imported");
				}
			}
			catch(err)
			{
				console.error("Exception thrown", err.stack);
				push_popup("The file isn't valid");
			}
		});
	}
}

tool_constructors[SaveManager.c_key] = SaveManager;