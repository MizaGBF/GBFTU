class CCWTracker extends ToolBase
{
	static c_key = Object.freeze("ccw-tracker");
	static c_storage_key = Object.freeze("gbftu-ccw-tracker");
	static c_weapons = Object.freeze([
		{label:"Tier IV - Replica"},
		{id:"1040308400", type:"t4-1", replica:"1030301900", creed:"20211", esteem:"20231", distinction:"20411", stone:"4041", coop:"20611"}, // zerk
		{id:"1040012600", type:"t4-1", replica:"1030003300", creed:"20211", esteem:"20231", distinction:"20421", stone:"4011", coop:"20621"}, // spart
		{id:"1040411600", type:"t4-1", replica:"1030402000", creed:"20221", esteem:"20241", distinction:"20431", stone:"4051", coop:"20651"}, // bunny
		{id:"1040412200", type:"t4-1", replica:"1030404100", creed:"20221", esteem:"20241", distinction:"20441", stone:"4051", coop:"20631"}, // warlock
		{id:"1040508000", type:"t4-1", replica:"1030501700", creed:"20211", esteem:"20231", distinction:"20451", stone:"4061", coop:"20641"}, // gizoku
		{id:"1040013200", type:"t4-1", replica:"1030102800", creed:"20221", esteem:"20241", distinction:"20461", stone:"4021", coop:"20661"}, // cr
		{id:"1040609100", type:"t4-1", replica:"1030602500", creed:"20211", esteem:"20231", distinction:"20471", stone:"4071", coop:"20611"}, // lucha
		{id:"1040707500", type:"t4-1", replica:"1030701500", creed:"20211", esteem:"20231", distinction:"20481", stone:"4081", coop:"20641"}, // nh
		{id:"1040807600", type:"t4-1", replica:"1030800700", creed:"20221", esteem:"20241", distinction:"20491", stone:"4091", coop:"20621"}, // ely
		{id:"1040209700", type:"t4-1", replica:"1030202800", creed:"20211", esteem:"20231", distinction:"20501", stone:"4031", coop:"20651"}, // apsa
		{id:"1040018100", type:"t4-1", replica:"1030008500", creed:"20211", esteem:"20231", distinction:"20791", stone:"4011", coop:"20641"}, // chry
		
		{label:"Tier IV - Rusted"},
		{id:"1040312000", type:"t4-2", rusted:"1030302000", silver:"5441", distinction:"20811", esteem:"20241", stone:"4041"}, // lj axe
		{id:"1040812100", type:"t4-2", rusted:"1030801200", silver:"5491", distinction:"20811", esteem:"20241", stone:"4091"}, // lj harp
		{id:"1040214000", type:"t4-2", rusted:"1030202400", silver:"5431", distinction:"20821", esteem:"20231", stone:"4031"}, // cav spear
		{id:"1040512600", type:"t4-2", rusted:"1030502500", silver:"5461", distinction:"20821", esteem:"20231", stone:"4061"}, // cav gun
		{id:"1040613100", type:"t4-2", rusted:"1030601400", silver:"5471", distinction:"20831", esteem:"20241", stone:"4071"}, // monk melee
		{id:"1040417200", type:"t4-2", rusted:"1030402200", silver:"5451", distinction:"20831", esteem:"20241", stone:"4051"}, // monk staff
		{id:"1040710000", type:"t4-2", rusted:"1030702300", silver:"5481", distinction:"20841", esteem:"20231", stone:"4081"}, // rh
		{id:"1040021100", type:"t4-2", rusted:"1030002900", silver:"5411", distinction:"20861", esteem:"20231", stone:"4011"}, // rb sword
		{id:"1040513800", type:"t4-2", rusted:"1030502500", silver:"5461", distinction:"20861", esteem:"20231", stone:"4061"}, // rb gun
		{id:"1040914600", type:"t4-2", rusted:"1030900600", silver:"5501", distinction:"20871", esteem:"20231", stone:"4101"}, // yama
		{id:"1040317500", type:"t4-2", rusted:"1030302000", silver:"5441", distinction:"20881", esteem:"20231", stone:"4041"}, // shield
		
		{label:"Tier V"},
		{id:"1040318500", type:"t5", rusted:"1030302000", silver:"5441", distinction:"20891", tome:"614", stone:"4041"}, // vik
		{id:"1040027000", type:"t5", rusted:"1030002900", silver:"5411", distinction:"20901", tome:"614", stone:"4011"}, // pala
		{id:"1040424400", type:"t5", rusted:"1030402200", silver:"5451", distinction:"20921", tome:"614", stone:"4051"}, // iatro
		{id:"1040121300", type:"t5", rusted:"1030102500", silver:"5421", distinction:"20931", tome:"616", stone:"4021"}, // mana
		{id:"1040120300", type:"t5", rusted:"1030102500", silver:"5421", distinction:"20911", tome:"616", stone:"4021"}, // street
		{id:"1040917300", type:"t5", rusted:"1030900600", silver:"5501", distinction:"20941", tome:"616", stone:"4101"}, // onmy
		{id:"1040620200", type:"t5", rusted:"1030601400", silver:"5471", distinction:"20951", tome:"618", stone:"4071"}, // sumo
		{id:"1040517400", type:"t5", rusted:"1030502500", silver:"5461", distinction:"20961", tome:"618", stone:"4061"}, // boog
		{id:"1040817300", type:"t5", rusted:"1030801200", silver:"5491", distinction:"20971", tome:"618", stone:"4091"}, // maria
		
		{label:"EX II"},
		{id:"1040509700", type:"ex2", replica:"1030103000", creed:"20221", esteem:"20241", distinction:"20511", stone:"4021", coop:"20631"}, // doc
		{id:"1040909300", type:"ex2", replica:"1030900300", creed:"20211", esteem:"20231", distinction:"20671", stone:"4101", coop:"20651"}, // kengo
		{id:"1040910300", type:"ex2", replica:"1030900400", creed:"20221", esteem:"20241", distinction:"20681", stone:"4101", coop:"20661"}, // rs
		{id:"1040014400", type:"ex2", replica:"1030005500", creed:"20211", esteem:"20231", distinction:"20691", stone:"4011", coop:"20611"}, // glory
		{id:"1040510600", type:"ex2", replica:"1030503800", creed:"20221", esteem:"20241", distinction:"20701", stone:"4061", coop:"20661"}, // soldier
		{id:"1040413400", type:"ex2", replica:"1030404100", creed:"20221", esteem:"20241", distinction:"20751", stone:"4051", coop:"20621"}, // neko
		{id:"1040111600", type:"ex2", replica:"1030104400", creed:"20211", esteem:"20231", distinction:"20761", stone:"4021", coop:"20641"}, // torm
		{id:"1040810900", type:"ex2", replica:"1030804100", creed:"20221", esteem:"20241", distinction:"20801", stone:"4091", coop:"20631"}, // rf
		{id:"1040114200", type:"ex2", replica:"1030108700", creed:"20221", esteem:"20241", distinction:"20851", stone:"4021", coop:"20621"} // masquerade
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
		
		this.cell_size = "calc(min(90px, 14vw))"; // 100vw / 7 = 14vw
		
		let grid = null;
		for(const entry of CCWTracker.c_weapons)
		{
			if("label" in entry) // section header
			{
				grid = this.add_new_grid();
				this.add_header(grid, entry.label);
				if(entry.label != "Tier V")
					this.add_elements(grid);
			}
			else
			{
				this.elements[entry.id] = [];
				
				const a = add_to(grid, "a");
				a.href = "https://gbf.wiki/index.php?search=" + entry.id;
				a.target = "_blank";
				a.rel = "noopener noreferrer";
				a.style.height = this.cell_size;
				const img = add_to(a, "img");
				img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/weapon/s/" + entry.id + "_note.jpg";
				img.style.width = this.cell_size;
				img.style.height = this.cell_size;
				
				if(entry.type == "t5")
				{
					this.add_tier5_row(grid, entry.id);
				}
				else
				{
					this.add_row(grid, entry.id);
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
		add_to(this.tree[0], "hr");
		add_to(this.tree[0], "div").textContent = "The following are the materials required to craft everything you're missing, for the purpose of filling the field notes (i.e. some steps are ignored, such as Emblems or maxing Tier V CCW).";
		add_to(this.tree[0], "br");
		this.result = add_to(this.tree[0], "div");
		this.load();
	}
	
	add_new_grid()
	{
		let grid = add_to(this.tree[0], "div");
		grid.style.display = "inline-grid";
		grid.style.marginLeft = "5px";
		grid.style.marginTop = "5px";
		grid.style.gridTemplateColumns = this.cell_size + " repeat(6, min(60px, 12vw))";
		return grid;
	}
	
	add_header(grid, label)
	{
		const save = add_to(grid, "div");
		save.style.backgroundColor = "#202030";
		save.style.height = "50px";
		save.style.textAlign = "center";
		
		const btn = add_to(
			save,
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
		btn.style.width = "90%";
		btn.style.fontSize = "16px";
		
		const div = add_to(grid, "div");
		div.style.textAlign = "center";
		div.style.gridColumn = "2 / 8";
		div.style.backgroundColor = "#202030";
		div.style.paddingTop = "3%";
		div.textContent = label;
	}
	
	add_elements(grid)
	{
		add_to(grid, "div");
		const elems = ["fire", "water", "earth", "wind", "light", "dark"];
		const bg_colors = ["#ea9999", "#a4c2f4", "#f9cb9c", "#b6d7a8", "#ffe599", "#b4a7d6"];
		for(let i = 0; i < 6; ++i)
		{
			const div = add_to(grid, "div");
			const img = add_to(div, "img");
			img.src = "assets/ui/ccw_tracker/" + elems[i] + ".png";
			div.style.height = "50px";
			div.style.textAlign = "center";
			div.style.backgroundColor = bg_colors[i];
		}
	}
	
	add_row(grid, id)
	{
		const bg_colors = ["#947b7b", "#7e8ca3", "#998876", "#76856f", "#999077", "#7c7887"];
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
				this.update();
			};
			this.elements[id].push(input);
		}
	}
	
	add_tier5_row(grid, id)
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
		div.style.backgroundColor = "#b5af9a";
		
		input.onchange = () => {
			this.set_save_pending(true);
			this.update();
		};
		this.elements[id].push(input);
	}
	
	static get_tool_save_info()
	{
		return {
			name: "CCW Tracker",
			key: CCWTracker.c_key,
			storage_key: CCWTracker.c_storage_key
		};
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
		this.update();
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
		push_popup("Your changes are saved.");
		this.set_save_pending(false);
	}
	
	update()
	{
		let weapons = {};
		let materials = {};
		let anything = {};
		let evolutions = {};
		for(const entry of CCWTracker.c_weapons)
		{
			if(!("label" in entry) && entry.id in this.elements)
			{
				let first_time_check = true;
				for(let i = 0; i < this.elements[entry.id].length; ++i)
				{
					if(!this.elements[entry.id][i].checked)
						first_time_check = false;
				}
				for(let i = 0; i < this.elements[entry.id].length; ++i)
				{
					if(!this.elements[entry.id][i].checked)
					{
						switch(entry.type)
						{
							case "t4-1":
							case "ex2":
							{
								this.add_item(weapons, entry.replica, 4);
								this.add_item(materials, entry.creed, 35);
								this.add_item(materials, entry.esteem, 20);
								this.add_item(materials, entry.distinction, 40);
								if(first_time_check)
								{
									this.add_item(materials, entry.stone, 200+255);
									first_time_check = false;
								}
								else
									this.add_item(materials, entry.stone, 768+255);
								this.add_item(materials, entry.coop, 50);
								this.add_item(materials, "1201", 170); // prism chip
								this.add_item(materials, "54", 20); // antique cloth
								this.add_item(materials, "20771", 3); // darkblade
								this.add_item(materials, "107", 6); // silver centrum
								this.add_item(materials, "2001", 30); // champion merit
								this.add_item(materials, "1", 45); // blue sky crystal
								this.add_item(materials, "79", 1); // primeval horn
								this.add_item(evolutions, "20003", 2); // steel brick
								
								switch(i)
								{
									case 0: // fire
									{
										this.add_item(materials, "1311", 70); // tome
										this.add_item(materials, "5011", 50); // quartz
										this.add_item(materials, "101", 60); // centrum
										this.add_item(materials, "20711", 30); // fire grimoire
										this.add_item(materials, "10018", 100); // ifrit
										this.add_item(materials, "506", 6); // michael
										break;
									}
									case 1: // water
									{
										this.add_item(materials, "1321", 70); // tome
										this.add_item(materials, "5021", 50); // quartz
										this.add_item(materials, "102", 60); // centrum
										this.add_item(materials, "20721", 30); // water grimoire
										this.add_item(materials, "10005", 100); // cocytus
										this.add_item(materials, "507", 6); // gabriel
										break;
									}
									case 2: // earth
									{
										this.add_item(materials, "1331", 70); // tome
										this.add_item(materials, "5031", 50); // quartz
										this.add_item(materials, "103", 60); // centrum
										this.add_item(materials, "20731", 30); // earth grimoire
										this.add_item(materials, "10011", 100); // vohu manah
										this.add_item(materials, "508", 6); // uriel
										break;
									}
									case 3: // wind
									{
										this.add_item(materials, "1341", 70); // tome
										this.add_item(materials, "5041", 50); // quartz
										this.add_item(materials, "104", 60); // centrum
										this.add_item(materials, "20711", 15); // fire grimoire
										this.add_item(materials, "20741", 15); // wind grimoire
										this.add_item(materials, "10027", 100); // sagittarius
										this.add_item(materials, "509", 6); // raphael
										break;
									}
									case 4: // light
									{
										this.add_item(materials, "1351", 70); // tome
										this.add_item(materials, "5051", 50); // quartz
										this.add_item(materials, "105", 60); // centrum
										this.add_item(materials, "20741", 30); // wind grimoire
										this.add_item(materials, "10046", 100); // vohu manah
										this.add_item(materials, "506", 3); // corow
										this.add_item(materials, "509", 3); // raphael
										break;
									}
									case 5: // dark
									{
										this.add_item(materials, "1361", 70); // tome
										this.add_item(materials, "5061", 50); // quartz
										this.add_item(materials, "106", 60); // centrum
										this.add_item(materials, "20721", 15); // water grimoire
										this.add_item(materials, "20731", 15); // earth grimoire
										this.add_item(materials, "10065", 100); // diablos
										this.add_item(materials, "507", 3); // gabriel
										this.add_item(materials, "508", 3); // uriel
										break;
									}
								}
								break;
							}
							case "t4-2":
							{
								this.add_item(weapons, entry.rusted, 4);
								this.add_item(materials, entry.esteem, 20);
								this.add_item(materials, entry.silver, 15);
								this.add_item(materials, entry.distinction, 40);
								if(first_time_check)
								{
									this.add_item(materials, entry.stone, 280);
									first_time_check = false;
								}
								else
									this.add_item(materials, entry.stone, 650);
								this.add_item(materials, "1202", 250); // flawed prism
								this.add_item(materials, "107", 6); // silver centrum
								this.add_item(materials, "1", 60); // blue sky crystal
								this.add_item(materials, "20771", 10); // darkblade
								this.add_item(materials, "20781", 10); // astaroth
								switch(i)
								{
									case 0: // fire
									{
										this.add_item(materials, "1011", 250); // low orb
										this.add_item(materials, "1313", 250); // whorl
										this.add_item(materials, "101", 60); // centrum
										break;
									}
									case 1: // water
									{
										this.add_item(materials, "1021", 250); // low orb
										this.add_item(materials, "1323", 250); // whorl
										this.add_item(materials, "102", 60); // centrum
										break;
									}
									case 2: // earth
									{
										this.add_item(materials, "1031", 250); // low orb
										this.add_item(materials, "1333", 250); // whorl
										this.add_item(materials, "103", 60); // centrum
										break;
									}
									case 3: // wind
									{
										this.add_item(materials, "1041", 250); // low orb
										this.add_item(materials, "1343", 250); // whorl
										this.add_item(materials, "104", 60); // centrum
										break;
									}
									case 4: // light
									{
										this.add_item(materials, "1051", 250); // low orb
										this.add_item(materials, "1353", 250); // whorl
										this.add_item(materials, "105", 60); // centrum
										break;
									}
									case 5: // dark
									{
										this.add_item(materials, "1061", 250); // low orb
										this.add_item(materials, "1363", 250); // whorl
										this.add_item(materials, "106", 60); // centrum
										break;
									}
								}
								break;
							}
							case "t5":
							{
								this.add_item(weapons, entry.rusted, 4);
								this.add_item(materials, entry.silver, 60);
								this.add_item(materials, entry.tome, 15);
								this.add_item(materials, entry.distinction, 5);
								this.add_item(materials, entry.stone, 1500);
								this.add_item(materials, "1202", 250); // flawed prism
								this.add_item(materials, "107", 10); // silver centrum
								this.add_item(materials, "1", 50); // blue sky crystal
								this.add_item(materials, "2003", 10); // legendary merit
								this.add_item(materials, "203", 10); // damascus crystal
								this.add_item(anything, "orb", 250); // low orb
								this.add_item(anything, "whorl", 250); // whorl
								break;
							}
							default:
							{
								break;
							}
						}
					}
				}
			}
		}
		// render result
		let index = 0;
		let len = this.result.childNodes.length;
		for(const [id, amount] of Object.entries(weapons))
		{
			if(index < len)
				this.modify_result(index, "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/weapon/s/" + id + ".jpg", amount);
			else
				this.add_result("https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/weapon/s/" + id + ".jpg", amount);
			++index;
		}
		for(const [id, amount] of Object.entries(materials))
		{
			if(index < len)
				this.modify_result(index, "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/article/s/" + id + ".jpg", amount);
			else
				this.add_result("https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/article/s/" + id + ".jpg", amount);
			++index;
		}
		for(const [id, amount] of Object.entries(anything))
		{
			if(index < len)
				this.modify_result(index, "assets/ui/ccw_tracker/" + id + ".gif", amount);
			else
				this.add_result("assets/ui/ccw_tracker/" + id + ".gif", amount);
			++index;
		}
		for(const [id, amount] of Object.entries(evolutions))
		{
			if(index < len)
				this.modify_result(index, "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/evolution/s/" + id + ".jpg", amount);
			else
				this.add_result("https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/evolution/s/" + id + ".jpg", amount);
			++index;
		}
		for(let i = len - 1; i >= index; --i)
		{
			this.result.childNodes[i].remove();
		}
	}
	
	add_result(url, amount)
	{
		let container = add_to(this.result, "span");
		container.style.display= "inline-block";
		container.style.width = "max-content";
		container.style.marginRight = "5px";
		let img = add_to(container, "img", {cls:["tool-icon"]});
		img.src = url;
		add_to(container, "span", {innertext:" x" + amount});
	}
	
	modify_result(index, url, amount)
	{
		if(this.result.childNodes[index].childNodes[0].src != url)
			this.result.childNodes[index].childNodes[0].src = url;
		this.result.childNodes[index].childNodes[1].innerText = " x" + amount;
	}
	
	add_item(pool, id, count)
	{
		if(!(id in pool))
			pool[id] = 0;
		pool[id] += count;
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