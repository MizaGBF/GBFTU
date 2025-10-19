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
				innerhtml:"The content of this web page is saved in your browser local storage.<br>Here you can export or import this data.",
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
	}
	
	export_all()
	{
		let obj = {};
		for(const [key, object] of Object.entries(tool_constructors))
		{
			obj = object.export_storage_data(obj);
		}
		var data_url = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
		let a = document.createElement('a');
		a.setAttribute("href", data_url);
		a.setAttribute("download", "GBFTU_data_" + new Date().toLocaleString() + ".json");
		a.click();
	}
	
	import_all()
	{
		let input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.multiple = false;
		input.onchange = function(event)
		{
			if(this.files.length > 0)
			{
				//var url = window.URL.createObjectURL(this.files[0]);
				var reader = new FileReader();
				reader.onload = function (e) {
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
				};
				reader.readAsText(this.files[0]);
			}
		};
		input.click();
	}
}

tool_constructors[SaveManager.c_key] = SaveManager;