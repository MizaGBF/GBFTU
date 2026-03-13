var tool_constructors = {};
var tools = {};
var running = null;
var content = null;

function init()
{
	content = document.getElementById("content");
	let s = get_url_params().get("tool");
	if(s != null)
	{
		open_tool(s);
	}
}

function open_tool(key)
{
	if(!(key in tools))
	{
		if(!(key in tool_constructors))
		{
			throw new Error("Tool " + key + " doesn't exist");
		}
		tools[key] = new tool_constructors[key]();
	}
	tools[key].display(content);
	running = key;
	// update tab button active
	let tabbuttons = document.getElementsByClassName("tab-button");
	for (let i = 0; i < tabbuttons.length; i++)
		tabbuttons[i].classList.toggle("active", false);
	document.getElementById("tab-"+key).classList.toggle("active", true);
	// update url
	let params = new URLSearchParams("");
	params.set("tool", key);
	history.pushState(null, '', window.location.pathname + '?' + params.toString());
}