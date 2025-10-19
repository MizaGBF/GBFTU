class ToolBase
{
	constructor()
	{
		this.tree = [];
		this.key = null;
	}
	
	is_running()
	{
		return this.key == running;
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