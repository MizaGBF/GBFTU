class ToolBase
{
	constructor()
	{
		this.tree = [];
		this.key = null;
		this.save_buttons = [];
	}
	
	is_running()
	{
		return this.key == running;
	}
	
	set_save_pending(state)
	{
		for(const btn of this.save_buttons)
		{
			btn.classList.toggle("tool-save-pending", state);
		}
	}
	
	reload()
	{
		
	}
	
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
	
	static export_storage_data(obj)
	{
		return obj;
	}
	
	static import_storage_data(obj)
	{
		
	}
}