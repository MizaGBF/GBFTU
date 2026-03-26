var tool_constructors = {};
var tools = {};
var loaded_scripts = new Set();
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

function load_script(url, callback)
{
	try
	{
		const script = document.createElement('script');
		script.src = url;
		script.type = 'text/javascript';

		script.onload = () => {
			if(callback != null)
			{
				callback();
			}
		};
		document.head.appendChild(script);
		return true;
	} catch(err) {
		console.error("Failed to load script " + url, err.stack);
	}
	return false;
}

function load_tool(key, callback)
{
	if(!loaded_scripts.has(key))
	{
		return load_script(
			"js/tools/" + key.replace("-", "_") + ".js",
			callback
		);
	}
	return false;
}

function open_tool(key)
{
	if(!(key in tools))
	{
		if(
			load_tool(
				key,
				() => {
					loaded_scripts.add(key);
					open_tool(key);
				}
			)
		)
		{
			return;
		}
		else if(!(key in tool_constructors))
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
	{
		tabbuttons[i].classList.toggle("active", false);
	}
	document.getElementById("tab-"+key).classList.toggle("active", true);
	// update url
	let params = new URLSearchParams("");
	params.set("tool", key);
	history.pushState(null, '', window.location.pathname + '?' + params.toString());
}