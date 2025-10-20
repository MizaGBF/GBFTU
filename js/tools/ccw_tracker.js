class CCWTracker extends ToolBase
{
	static c_key = Object.freeze("ccw-tracker");
	static c_storage_key = Object.freeze("gbftu-ccw-tracker");
	static c_weapons = Object.freeze([
		// T4
		{id:"1040308400", type:"t4-1"}, // zerk
		{id:"1040012600", type:"t4-1"}, // spart
		{id:"1040411600", type:"t4-1"}, // bunny
		{id:"1040412200", type:"t4-1"}, // warlock
		{id:"1040508000", type:"t4-1"}, // gizoku
		{id:"1040013200", type:"t4-1"}, // cr
		{id:"1040609100", type:"t4-1"}, // lucha
		{id:"1040707500", type:"t4-1"}, // nh
		{id:"1040807600", type:"t4-1"}, // ely
		{id:"1040209700", type:"t4-1"}, // apsa
		{id:"1040018100", type:"t4-1"}, // chry
		// T4 type 2
		{id:"1040312000", type:"t4-2"}, // lj
		{id:"1040812100", type:"t4-2"}, // lj
		{id:"1040214000", type:"t4-2"}, // cav
		{id:"1040512600", type:"t4-2"}, // cav
		{id:"1040613100", type:"t4-2"}, // monk
		{id:"1040417200", type:"t4-2"}, // monk
		{id:"1040710000", type:"t4-2"}, // rh
		{id:"1040021100", type:"t4-2"}, // rb
		{id:"1040513800", type:"t4-2"}, // rb
		{id:"1040914600", type:"t4-2"}, // yama
		{id:"1040317500", type:"t4-2"}, // shield
		// T5
		{id:"1040318500", type:"t5"}, // vik
		{id:"1040027000", type:"t5"}, // pala
		{id:"1040424400", type:"t5"}, // iatro
		{id:"1040121300", type:"t5"}, // mana
		{id:"1040120300", type:"t5"}, // street
		{id:"1040620200", type:"t5"}, // sumo
		{id:"1040517400", type:"t5"}, // boog
		{id:"1040817300", type:"t5"}, // maria
		// EX2
		{id:"1040509700", type:"ex2"}, // doc
		{id:"1040909300", type:"ex2"}, // kengo
		{id:"1040910300", type:"ex2"}, // rs
		{id:"1040014400", type:"ex2"}, // glory
		{id:"1040510600", type:"ex2"}, // soldier
		{id:"1040413400", type:"ex2"}, // neko
		{id:"1040111600", type:"ex2"}, // torm
		{id:"1040810900", type:"ex2"}, // rf
		{id:"1040114200", type:"ex2"} // masquerade
	]);
	
	constructor()
	{
		super();
		this.key = CCWTracker.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.elements = {};
		this.save_buttons.push(add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Save",
				onclick:(() => {
					this.save();
				})
			}
		));
		add_to(this.tree[0], "hr");
		
		let grid = add_to(this.tree[0], "div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "100px repeat(6, 60px)";
		
		add_to(grid, "div");
		const elems = ["fire", "water", "earth", "wind", "light", "dark"];
		let bg_colors = ["#ea9999", "#a4c2f4", "#f9cb9c", "#b6d7a8", "#ffe599", "#b4a7d6"];
		for(let i = 0; i < 6; ++i)
		{
			const div = add_to(grid, "div");
			const img = add_to(div, "img");
			img.src = "assets/ui/ccw_tracker/" + elems[i] + ".png";
			div.style.height = "50px";
			div.style.textAlign = "center";
			div.style.backgroundColor = bg_colors[i];
		}
		
		bg_colors = ["#947b7b", "#7e8ca3", "#998876", "#76856f", "#999077", "#7c7887"];
		for(const wpn of CCWTracker.c_weapons)
		{
			this.elements[wpn.id] = [];
			
			const a = add_to(grid, "a");
			a.href = "https://gbf.wiki/index.php?search=" + wpn.id;
			a.target = "_blank";
			a.rel = "noopener noreferrer";
			a.style.height = "100px";
			const img = add_to(a, "img");
			img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/weapon/s/" + wpn.id + "_note.jpg";
			img.style.width = "100px";
			img.style.height = "100px";
			
			if(wpn.type == "t5")
			{
				const div = add_to(grid, "div");
				const input = add_to(div, "input", {cls:["checkbox"]});
				input.type = "checkbox";
				input.style.marginLeft = "auto";
				input.style.marginRight = "auto";
				input.style.marginTop = "30px";
				input.style.marginBottom = "auto";
				div.style.textAlign = "center";
				div.style.gridColumn = "2 / 8";
				div.style.backgroundColor = "#735d6d";
				
				input.onchange = () => {
					this.set_save_pending(true);
					this.toggle(input.checked, wpn.id, 0);
				};
				this.elements[wpn.id].push(input);
			}
			else
			{
				for(let i = 0; i < 6; ++i)
				{
					const div = add_to(grid, "div");
					const input = add_to(div, "input", {cls:["checkbox"]});
					input.type = "checkbox";
					input.style.marginLeft = "auto";
					input.style.marginRight = "auto";
					input.style.marginTop = "30px";
					input.style.marginBottom = "auto";
					div.style.textAlign = "center";
					div.style.backgroundColor = bg_colors[i];
					
					input.onchange = () => {
						this.set_save_pending(true);
						this.toggle(input.checked, wpn.id, i);
					};
					this.elements[wpn.id].push(input);
				}
			}
		}
		add_to(this.tree[0], "hr");
		this.save_buttons.push(add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Save",
				onclick:(() => {
					this.save();
				})
			}
		));
		this.load();
	}
	
	static get_tool_save_info()
	{
		return {
			name: "CCW Tracker",
			key: CCWTracker.c_key,
			storage_key: CCWTracker.c_storage_key
		};
	}
	
	toggle(state, id, element_index)
	{
		// unused for now
	}
	
	load()
	{
		try
		{
			const data = localStorage.getItem(CCWTracker.c_storage_key);
			if(data != null)
			{
				const storage = JSON.parse(data);
				for(const [key, checks] of Object.entries(storage))
				{
					if(key in this.elements)
					{
						for(let i = 0; i < storage[key].length; ++i)
						{
							this.elements[key][i].checked = storage[key][i];
						}
					}
				}
			}
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
		}
		this.set_save_pending(false);
	}
	
	reload()
	{
		this.load();
	}
	
	save()
	{
		const storage = {};
		for(const [key, checks] of Object.entries(this.elements))
		{
			storage[key] = [];
			for(const check of checks)
			{
				storage[key].push(check.checked);
			}
		}
		localStorage.setItem(CCWTracker.c_storage_key, JSON.stringify(storage));
		push_popup("Your progress is saved.");
		this.set_save_pending(false);
	}
	
	static export_storage_data(obj)
	{
		try
		{
			const data = localStorage.getItem(CCWTracker.c_storage_key);
			if(data != null)
			{
				obj[CCWTracker.c_storage_key] = data;
			}
		}
		catch(err)
		{
		}
		return obj;
	}
	
	static import_storage_data(obj)
	{
		
		try
		{
			localStorage.setItem(CCWTracker.c_storage_key, obj[CCWTracker.c_storage_key]);
		}
		catch(err)
		{
		}
	}
}

tool_constructors[CCWTracker.c_key] = CCWTracker;