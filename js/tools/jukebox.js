var jukebox = null;

class Jukebox extends ToolBase
{
	static c_key = Object.freeze("jukebox");
	
	constructor()
	{
		super();
		this.key = Jukebox.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		
		fetchJSON("../GBFML/json/jukebox.json").then((value) => {
			jukebox = new AudioJukeboxPlayer(this.tree[0], value);
		});
	}
}

tool_constructors[Jukebox.c_key] = Jukebox;