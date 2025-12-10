class ToolBase
{
	constructor()
	{
		this.tree = [];
		this.key = null; // the tool unique identifier key
		this.save_buttons = []; // store save data button
	}
	
	// return true if the tool is in use
	is_running()
	{
		return this.key == running;
	}
	
	// return null if it can't save,
	// else {name:"Tool Name", key:"tool key", storage_key:"locale storage key"}
	static get_tool_save_info()
	{
		return null;
	}
	
	// set/remove the tool-save-pending class on save buttons
	set_save_pending(state)
	{
		for(const btn of this.save_buttons)
		{
			btn.classList.toggle("tool-save-pending", state);
		}
	}
	
	// called when a save file is loaded
	reload()
	{
		
	}
	
	// used to set the content of tree in the HTML
	display(node)
	{
		let fragment = document.createDocumentFragment();
		for(const elem of this.tree)
			fragment.appendChild(elem);
		update_next_frame(function() {
			node.innerHTML = "";
			node.appendChild(fragment);
		});
	}
	
	add_save_button(node = null)
	{
		const btn = add_to(
			node ? node : this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Save",
				onclick:(() => {
					this.save();
				})
			}
		);
		this.save_buttons.push(btn);
		return btn;
	}
	
	// export the locale storage content
	// don't bother to re-implement if no save data
	static export_storage_data(obj)
	{
		return obj;
	}
	
	// import to the locale storage content
	// don't bother to re-implement if no save data
	static import_storage_data(obj)
	{
		
	}
}