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
		).innerHTML = "<a href=\"https://gbf.wiki/Raziel_(Summer)\">Summer Raziel</a>'s passive stack calculator";
		
		let grid = this.create_grid(this.tree[0], 4);
		// name row
		this.add_invisible_cell(grid);
		this.add_input_cell(grid, "Gran/Djeeta", "name_1");
		this.add_input_cell(grid, "Raziel", "name_2");
		this.add_input_cell(grid, "Ally 3", "name_3");
		this.add_input_cell(grid, "Ally 4", "name_4");
		
		for(let i = 1; i <= 4; ++i)
		{
			this.add_text_cell(grid, "assets/ui/raziel/" + i + ".png", "Skill " + i);
			for(let j = 1; j <= 4; ++j)
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
		if(access && access.startsWith("result_"))
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
		let yellow = 0;
		let red = 0;
		let kirin = this.elements.kirin.value == "Yes" ? 2 : 1;
		
		for(let i = 1; i <= 4; ++i)
		{
			for(let j = 1; j <= 4; ++j)
			{
				const node = this.elements["" + j + "_" + i];
				const val = (
					typeof(node.value) != "undefined" ?
					node.value :
					node.textContent
				);
				if(val == "Red")
				{
					++red;
				}
				else if(val == "Yellow")
				{
					++yellow;
				}
			}
		}
		let after_red = red + Math.floor(red * kirin / 3);
		let after_yellow = yellow + Math.floor((yellow - 1) * kirin / 3); // ignore raziel's s3
		let missing_red = Math.max(0, (10 - red) * 3 - red * kirin);
		let missing_yellow = Math.max(0, (10 - yellow) * 3 - (yellow - 1) * kirin);
		
		this.set_text_cell(this.elements.result_1_1, Math.min(10, red));
		this.set_text_cell(this.elements.result_1_2, Math.min(10, after_red));
		this.set_text_cell(this.elements.result_1_3, missing_red);
		
		this.set_text_cell(this.elements.result_2_1, Math.min(10, yellow));
		this.set_text_cell(this.elements.result_2_2, Math.min(10, after_yellow));
		this.set_text_cell(this.elements.result_2_3, missing_yellow);
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