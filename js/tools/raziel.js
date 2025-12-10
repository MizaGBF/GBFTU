class RazielCalculator extends ToolBase
{
	static c_name = Object.freeze("S. Raziel");
	static c_key = Object.freeze("raziel");
	static c_storage_key = Object.freeze("gbftu-raziel");
	
	constructor()
	{
		super();
		this.key = RazielCalculator.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.elements = [];
		add_to(
			this.tree[0],
			"div"
		).innerHTML = "<a href=\"https://gbf.wiki/Raziel_(Summer)\">Summer Raziel</a>'s passive stack calculator.<br><b>BE SURE</b> to properly name the slot she is in \"Raziel\".<br>";
		
		let grid = this.create_grid(this.tree[0], 6);
		// name row
		this.add_invisible_cell(grid);
		this.add_input_cell(grid, "Gran/Djeeta", "name_1");
		this.color_cell(this.add_input_cell(grid, "Raziel", "name_2"));
		this.add_input_cell(grid, "Ally 3", "name_3");
		this.add_input_cell(grid, "Ally 4", "name_4");
		this.add_input_cell(grid, "Backline 1", "name_5");
		this.add_input_cell(grid, "Backline 2", "name_6");
		
		for(let i = 1; i <= 4; ++i)
		{
			this.add_text_cell(grid, "assets/ui/raziel/" + i + ".png", "Skill " + i);
			for(let j = 1; j <= 6; ++j)
			{
				const cell = this.add_select_cell(grid, ["None/Other", "Red", "Yellow"], "" + j + "_" + i);
				if(j == 2) // raziel
				{
					switch(i)
					{
						case 1:
							cell.value = "Red";
							break;
						case 2:
						case 3:
							cell.value = "Yellow";
							break;
						default:
							cell.value = "None/Other";
							break;
					}
					this.color_cell(cell);
				}
			}
		}
		this.add_text_cell(grid, null, "Qilin?");
		this.add_select_cell(grid, ["No", "Yes"], "kirin");
		this.add_text_cell(grid, null, "Death 1?");
		this.add_select_cell(grid, ["None", "Ally 1", "Ally 2", "Ally 3", "Ally 4"], "death_1");
		this.add_text_cell(grid, null, "Death 2?");
		this.add_select_cell(grid, ["None", "Ally 1", "Ally 2", "Ally 3", "Ally 4"], "death_2");
		
		add_to(this.tree[0], "br");
		add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Auto-set Raziel's skills",
				onclick:(() => {
					for(let i = 1; i <= 6; ++i)
					{
						if(this.elements["name_" + i].value.toLowerCase() == "raziel")
						{
							this.elements["" + i + "_1"].value = "Red";
							this.elements["" + i + "_2"].value = "Yellow";
							this.elements["" + i + "_3"].value = "Yellow";
							this.elements["" + i + "_4"].value = "None/Other";
							for(let j = 1; j < 4; ++j)
							{
								this.color_cell(this.elements["" + i + "_" + j]);
							}
						}
						this.update();
					}
				}),
				br:true
			}
		).style.width = "300px";
		add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Reset",
				onclick:(() => {
					if(window.confirm("The characters will be reset.\nAre you sure?"))
					{
						this.elements.name_1.value = "Gran/Djeeta";
						this.elements.name_2.value = "Raziel";
						this.elements.name_3.value = "Ally 3";
						this.elements.name_4.value = "Ally 4";
						this.elements.name_5.value = "Backline 1";
						this.elements.name_6.value = "Backline 2";
						
						for(let i = 1; i <= 4; ++i)
						{
							for(let j = 1; j <= 6; ++j)
							{
								this.color_cell(this.elements["name_" + j]);
								
								const cell = this.elements["" + j + "_" + i];
								if(j == 2) // raziel
								{
									switch(i)
									{
										case 1:
											cell.value = "Red";
											break;
										case 2:
										case 3:
											cell.value = "Yellow";
											break;
										default:
											cell.value = "None/Other";
											break;
									}
									this.color_cell(cell);
								}
								else
								{
									cell.value = "None/Other";
									this.color_cell(cell);
								}
							}
						}
						this.update();
					}
				})
			}
		).style.width = "300px";
		
		// results
		add_to(this.tree[0], "hr");
		add_to(this.tree[0], "span", {"innertext":"Result"});
		grid = this.create_grid(this.tree[0], 3);
		this.add_invisible_cell(grid);
		this.add_text_cell(grid, null, "Start at");
		this.add_text_cell(grid, null, "After all presses");
		this.add_text_cell(grid, null, "Missing presses");
		
		this.add_text_cell(grid, "assets/ui/raziel/b_red.png", "Red stack");
		this.add_text_cell(grid, null, "0", "result_1_1");
		this.add_text_cell(grid, null, "0", "result_1_2");
		this.add_text_cell(grid, null, "0", "result_1_3");
		
		this.add_text_cell(grid, "assets/ui/raziel/b_yellow.png", "Yellow stack");
		this.add_text_cell(grid, null, "0", "result_2_1");
		this.add_text_cell(grid, null, "0", "result_2_2");
		this.add_text_cell(grid, null, "0", "result_2_3");

		add_to(this.tree[0], "br");
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
		this.update();
	}
	
	static get_tool_save_info()
	{
		return {
			name: RazielCalculator.c_name,
			key: RazielCalculator.c_key,
			storage_key: RazielCalculator.c_storage_key
		};
	}
	
	// create a generic grid
	// the css is dynamic
	create_grid(node, column_count, has_left_column = true)
	{
		if(column_count < 1)
			throw new Error("column_count must be greater than zero");
		let grid = add_to(node, "div");
		grid.style.display = "grid";
		if(has_left_column)
			grid.style.gridTemplateColumns = "140px repeat(" + column_count + ", calc((min(1000px, 100%) - 140px) / " + column_count + "))";
		else
			grid.style.gridTemplateColumns = "repeat(" + column_count + ", calc(min(1000px, 100%) / " + column_count + "))";
		return grid;
	}
	
	// add an empty cell (used for top left corners and so on)
	add_invisible_cell(grid)
	{
		return add_to(grid, "div", {cls:["tool-grid-row-name"]});
	}
	
	// add a non editable text cell
	// access_as is optional and used to refer it in this.elements
	add_text_cell(grid, icon, txt, access_as = null)
	{
		if(access_as != null && access_as in this.elements)
			throw new Error("" + access_as + " is already in use");
		let cell = add_to(grid, "div", {cls:["tool-grid-cell"]});
		if(icon != null && icon != "")
		{
			const img = add_to(cell, "img");
			img.src = icon;
			img.style.float = "none";
			img.style.marginRight = "4px";
		}
		else
		{
			const spacer = add_to(cell, "div");
			spacer.style.display = "inline-block";
			spacer.style.minWidth = "1px";
			spacer.style.minHeight = "30px";
			spacer.style.maxWidth = "1px";
			spacer.style.maxHeight = "30px";
			spacer.style.verticalAlign = "middle";
		}
		cell.appendChild(document.createTextNode(txt));
		if(access_as != null)
		{
			cell.setAttribute("access", access_as);
			this.elements[access_as] = cell;
		}
		this.color_cell(cell);
		return cell;
	}
	
	// add a text input cell
	add_input_cell(grid, default_value, access_as)
	{
		if(access_as == null)
			throw new Error("access_as is set to null");
		if(access_as in this.elements)
			throw new Error("" + access_as + " is already in use");
		const input = add_to(grid, "input", {cls:["tool-grid-cell"]});
		input.value = default_value;
		input.onchange = () => {
			this.color_cell(input);
			this.update();
			this.set_save_pending(true);
		};
		input.setAttribute("access", access_as);
		this.color_cell(input);
		this.elements[access_as] = input;
		return input;
	}
	
	// add a selection cell
	add_select_cell(grid, choices, access_as)
	{
		if(access_as == null)
			throw new Error("access_as is set to null");
		if(access_as in this.elements)
			throw new Error("" + access_as + " is already in use");
		const sel = add_to(grid, "select", {cls:["tool-grid-cell", "tool-grid-select-cell"]});
		for(const val of choices)
		{
			let opt = add_to(sel, "option");
			opt.innerText = val;
		}
		sel.onchange = () => {
			this.color_cell(sel);
			this.update();
			this.set_save_pending(true);
		};
		sel.setAttribute("access", access_as);
		this.color_cell(sel);
		this.elements[access_as] = sel;
		return sel;
	}
	
	// set a text cell content
	set_text_cell(cell, value)
	{
		cell.childNodes[1].textContent = value;
		this.color_cell(cell);
	}
	
	color_cell(node)
	{
		const val = (
			typeof(node.value) != "undefined" ?
			node.value :
			node.textContent
		);
		const access = node.getAttribute("access");
		if(access && access.startsWith("name_"))
		{
			if(val.toLowerCase() == "raziel")
				node.style.background = "#357a47";
			else
				node.style.background = "";
		}
		else if(access && access.startsWith("result_"))
		{
			if(["result_1_3", "result_2_3"].includes(access))
			{
				if(val == "0")
					node.style.background = "#357a47";
				else
					node.style.background = "";
			}
			else
			{
				if(val == "10")
					node.style.background = "#357a47";
				else
					node.style.background = "";
			}
		}
		else
		{
			switch(val)
			{
				case "None/Other":
				case "None":
				{
					node.style.background = "#4e4e4e";
					break;
				}
				case "Yellow":
				{
					node.style.background = "#b4630f";
					break;
				}
				case "Red":
				{
					node.style.background = "#8e0929";
					break;
				}
				case "Yes":
				case "Ally 1":
				case "Ally 2":
				case "Ally 3":
				case "Ally 4":
				{
					node.style.background = "#357a47";
					break;
				}
				case "No":
				{
					node.style.background = "#a15e3a";
					break;
				}
				default:
				{
					node.style.background = "";
					break;
				}
			}
		}
	}
	
	update()
	{
		let raziel_index = null;
		let has_raziel = false;
		
		// determine front line and if raziel is in
		const front_line = [1, 2, 3, 4];
		let death1 = this.elements.death_1.value;
		if(death1 != "None")
		{
			const i = parseInt(death1[5]); // 5th character of Ally X
			front_line[i - 1] = 5;
		}
		let death2 = this.elements.death_2.value;
		if(death2 != "None" && death2 != death1)
		{
			const i = parseInt(death2[5]); // 5th character of Ally X
			front_line[i - 1] = death1 != "None" ? 6 : 5;
		}
		for(let i  = 1; i <= 6; ++i)
		{
			if(this.elements["name_" + i].value.toLowerCase() == "raziel")
			{
				if(front_line.includes(i))
					raziel_index = i;
				has_raziel = true;
				break
			}
		}
		if(!has_raziel)
		{
			// no raziel in team
			this.set_text_cell(this.elements.result_1_1, "?");
			this.set_text_cell(this.elements.result_1_2, "?");
			this.set_text_cell(this.elements.result_1_3, "?");
			
			this.set_text_cell(this.elements.result_2_1, "?");
			this.set_text_cell(this.elements.result_2_2, "?");
			this.set_text_cell(this.elements.result_2_3, "?");
		}
		else
		{
			// parsing skills
			let start_red = 0;
			let start_yellow = 0;
			let press_red = 0;
			let press_yellow = 0;
			for(let i = 1; i <= 4; ++i)
			{
				for(let j = 1; j <= 6; ++j)
				{
					const node = this.elements["" + j + "_" + i];
					const val = (
						typeof(node.value) != "undefined" ?
						node.value :
						node.textContent
					);
					if(val == "Red")
					{
						if(j <= 4) // front
							++start_red;
						if(front_line.includes(j))
							++press_red;
					}
					else if(val == "Yellow")
					{
						if(j <= 4) // front
							++start_yellow;
						if(front_line.includes(j) && (raziel_index != j || i != 3)) // ignore raziel skill 3
							++press_yellow;
					}
				}
			}
			if(this.elements.kirin.value == "Yes")
			{
				press_red *= 2;
				press_yellow *= 2;
			}
			
			// start stack
			this.set_text_cell(this.elements.result_1_1, Math.min(10, start_red));
			this.set_text_cell(this.elements.result_2_1, Math.min(10, start_yellow));
			
			let red = start_red;
			let yellow = start_yellow;
			if(raziel_index != null)
			{
				red += Math.floor(press_red / 3);
				yellow += Math.floor(press_yellow / 3);
			}
			let missing_red = Math.max(0, (10 - start_red) * 3 - press_red);
			let missing_yellow = Math.max(0, (10 - start_yellow) * 3 - press_yellow);
			
			this.set_text_cell(this.elements.result_1_1, Math.min(10, start_red));
			
			this.set_text_cell(this.elements.result_2_1, Math.min(10, start_yellow));
			
			if(raziel_index != null)
			{
				this.set_text_cell(this.elements.result_1_2, Math.min(10, red));
				this.set_text_cell(this.elements.result_1_3, missing_red);
				
				this.set_text_cell(this.elements.result_2_2, Math.min(10, yellow));
				this.set_text_cell(this.elements.result_2_3, missing_yellow);
			}
			else // not front lined
			{
				this.set_text_cell(this.elements.result_1_2, "?");
				this.set_text_cell(this.elements.result_1_3, "?");
			
				this.set_text_cell(this.elements.result_2_2, "?");
				this.set_text_cell(this.elements.result_2_3, "?");
			}
		}
	}
	
	load()
	{
		try
		{
			const data = localStorage.getItem(DamageCalculator.c_storage_key);
			if(data != null)
			{
				let storage = JSON.parse(data);
				for(const [key, val] of Object.entries(storage))
				{
					if(key in this.elements)
					{
						this.elements[key].value = val;
						this.color_cell(this.elements[key]);
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
		this.update();
	}
	
	save()
	{
		let storage = {};
		for(const [key, elem] of Object.entries(this.elements))
		{
			if(["INPUT", "SELECT"].includes(elem.tagName))
			{
				storage[key] = elem.value;
			}
		}
		localStorage.setItem(DamageCalculator.c_storage_key, JSON.stringify(storage));
		push_popup("Your changes are saved.");
		this.set_save_pending(false);
	}
	
	static export_storage_data(obj)
	{
		try
		{
			const data = localStorage.getItem(RazielCalculator.c_storage_key);
			if(data != null)
			{
				obj[RazielCalculator.c_storage_key] = data;
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
			localStorage.setItem(RazielCalculator.c_storage_key, obj[RazielCalculator.c_storage_key]);
		}
		catch(err)
		{
		}
	}
}

tool_constructors[RazielCalculator.c_key] = RazielCalculator;