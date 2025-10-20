class TripleAttackCalculator extends ToolBase
{
	static c_key = Object.freeze("triple-attack");
	static c_storage_key = Object.freeze("gbftu-triple-attack");
	static c_classes = Object.freeze({
		"None/Other":0,
		"Apsaras":10,
		"Bandit Tycoon":7,
		"Boogeyman":10,
		"Cavalier":17,
		"Chaos Ruler":7,
		"Chrysaor":7,
		"Doctor":7,
		"Elysian":7,
		"Glorybringer":7,
		"Iatromantis":10,
		"Kengo":7,
		"Luchador":16,
		"Lumberjack":7,
		"Mariachi":10,
		"Masquerade":22,
		"Monk":7,
		"Nekomancer":5,
		"Nighthound":7,
		"Relic Buster":27,
		"Rising Force":7,
		"Robin Hood":14,
		"Runeslayer":31,
		"Shieldsworn":7,
		"Soldier":17,
		"Spartan":7,
		"Sumaibito":-45,
		"Tormentor":7,
		"Viking":20,
		"Warlock":7,
		"Yamato":7
	});
	
	constructor()
	{
		super();
		this.key = TripleAttackCalculator.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.elements = [];
		add_to(
			this.tree[0],
			"div"
		).innerHTML = "<ul><li><b>MC Class</b> assumes the class is fully maxed (max level, ultimate mastery, etc...).</li>"
			+ "<li><b>Class Mastery</b> is the Triple Attack bonuses you unlock along with mastering classes.</li>"
			+ "<li>Deduct the <b>Ultima</b> or/and <b>Celestial</b> values from <b>Grid</b>, if your MC is affected in the in-game calculator.</li></ul>";
		
		let grid = add_to(this.tree[0], "div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "repeat(5, 20%)";
		// name row
		this.add_input_row(grid, null, "", ["Gran/Djeeta", "Ally 2", "Ally 3", "Ally 4"]);
		grid.children[0].classList.toggle("tool-grid-cell", false); // remove the style of top left corner
		// MC
		this.add_select_row(grid, "assets/ui/triple_attack/class.png", "MC Class", Object.keys(TripleAttackCalculator.c_classes));
		this.add_select_row(grid, "assets/ui/triple_attack/mastered.png", "Class Mastery", ["0", "1", "2", "3"]);
		this.elements.classmastery[0].value = "3";
		this.color_cell(this.elements.classmastery[0]);
		// crucible
		this.add_select_row(grid, "assets/ui/triple_attack/crucible.png", "Crucible Wonder", ["0", "3", "5"]);
		// grid row
		this.add_input_row(grid, "../GBFML/assets/ui/icon/sword.png", "Grid", ["0", "0", "0", "0"]);
		// ultima row
		this.add_select_row(grid, "assets/ui/triple_attack/ultima.png", "Ultima", ["0", "20", "22.5", "25"]);
		// celestial row
		this.add_select_row(grid, "assets/ui/triple_attack/celestial.png", "Celestial", ["0", "5", "10"]);
		// EMP
		this.add_input_row(grid, "assets/ui/triple_attack/bonus.png", "EMP", ["0", "0", "0", "0"]);
		this.add_select_row(grid, "assets/ui/triple_attack/ring.png", "Ring", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
		this.add_select_row(grid, "assets/ui/triple_attack/earring.png", "Earring", ["0", "5", "6", "7", "8", "9", "10", "11", "12"]);
		this.add_select_row(grid, "assets/ui/triple_attack/awakening.png", "Awakening", ["Protagonist", "Balanced", "Attack", "Defense", "Multiattack"]);
		for(let i = 1; i < 4; ++i)
		{
			this.elements.awakening[i].value = "Balanced";
			this.color_cell(this.elements.awakening[i]);
		}
		// Passives
		this.add_input_row(grid, "assets/ui/triple_attack/passive.png", "Passive 1", ["0", "0", "0", "0"]);
		this.add_input_row(grid, "assets/ui/triple_attack/passive.png", "Passive 2", ["0", "0", "0", "0"]);
		this.add_input_row(grid, "assets/ui/triple_attack/passive_emp.png", "Passive 3", ["0", "0", "0", "0"]);
		this.add_input_row(grid, "assets/ui/triple_attack/domain.png", "Domain", ["0", "0", "0", "0"]);
		this.add_input_row(grid, "assets/ui/triple_attack/radiance.png", "Radiance", ["0", "0", "0", "0"]);
		// Buffs
		this.add_input_row(grid, "assets/ui/triple_attack/icon.png", "Buff 1", ["0", "0", "0", "0"]);
		this.add_input_row(grid, "assets/ui/triple_attack/icon2.png", "Buff 2", ["0", "0", "0", "0"]);
		this.add_input_row(grid, "assets/ui/triple_attack/icon3.png", "Buff 3", ["0", "0", "0", "0"]);
		this.add_input_row(grid, "assets/ui/triple_attack/special.png", "Buff 4", ["0", "0", "0", "0"]);
		// Others
		this.add_input_row(grid, "../GBFML/assets/ui/icon/other.png", "Other", ["0", "0", "0", "0"]);
		// Total
		add_to(grid, "div", {innertext:"Total"}).style.textAlign = "center";
		this.elements.total = [];
		for(let i = 0; i < 4; ++i)
		{
			let el = add_to(grid, "div", {innertext:"0%"});
			el.style.textAlign = "center";
			this.elements.total.push(el);
		}
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
			name: "TA Calc.",
			key: TripleAttackCalculator.c_key,
			storage_key: TripleAttackCalculator.c_storage_key
		};
	}
	
	add_input_row(grid, icon, txt, default_values)
	{
		const elem_key = txt.toLowerCase().replaceAll(" ", "");
		this.elements[elem_key] = [];
		let title = add_to(grid, "div", {cls:["tool-grid-cell"]});
		if(icon != null)
		{
			add_to(title, "img").src = icon;
		}
		title.appendChild(document.createTextNode(txt));
		for(let i = 0; i < 4; ++i)
		{
			const input = add_to(grid, "input", {cls:["tool-grid-cell"]});
			input.value = default_values[i];
			if(txt != "")
			{
				input.onchange = () => {
					this.color_cell(input);
					this.update();
					this.set_save_pending(true);
				};
				this.color_cell(input);
			}
			this.elements[elem_key].push(input);
		}
	}
	
	add_select_row(grid, icon, txt, possible_values)
	{
		const elem_key = txt.toLowerCase().replaceAll(" ", "");
		this.elements[elem_key] = [];
		let title = add_to(grid, "div", {cls:["tool-grid-cell"]});
		if(icon != null)
		{
			add_to(title, "img").src = icon;
		}
		title.appendChild(document.createTextNode(txt));
		for(let i = 0; i < 4; ++i)
		{
			const sel = add_to(grid, "select", {cls:["tool-grid-cell", "tool-grid-select-cell"]});
			for(const val of possible_values)
			{
				let opt = add_to(sel, "option");
				opt.innerText = val;
			}
			if(txt != "")
			{
				sel.onchange = () => {
					this.color_cell(sel);
					this.update();
					this.set_save_pending(true);
				};
				this.color_cell(sel);
			}
			this.elements[elem_key].push(sel);
		}
	}
	
	color_cell(node)
	{
		const val = node.value;
		switch(val.trim())
		{
			case "Protagonist":
			{
				node.style.background = "";
				break;
			}
			case "Balanced":
			{
				node.style.background = "#4e4e4e";
				break;
			}
			case "Attack":
			{
				node.style.background = "#8e0929";
				break;
			}
			case "Defense":
			{
				node.style.background = "#1c1b74";
				break;
			}
			case "Multiattack":
			{
				node.style.background = "#b4630f";
				break;
			}
			default:
			{
				if(val in TripleAttackCalculator.c_classes)
				{
					if(val == "None/Other")
						node.style.background = "";
					else
						node.style.background = "#4f785a";
				}
				else
				{
					let f = parseFloat(val);
					if(isNaN(f))
						node.style.background = "#ff0000";
					else if(f > 0)
						node.style.background = "#4f785a";
					else if(f < 0)
						node.style.background = "#784f5b";
					else
						node.style.background = "";
				}
				break;
			}
		}
	}
	
	update()
	{
		for(let i = 0; i < 4; ++i)
		{
			let ta = Math.min(
				75,
				this.parse_float(this.elements.grid[i].value)
				+ this.parse_float(this.elements.ultima[i].value)
				+ this.parse_float(this.elements.celestial[i].value)
				)
				+ (TripleAttackCalculator.c_classes[this.elements.mcclass[i].value] ?? 0)
				+ this.parse_float(this.elements.classmastery[i].value)
				+ this.parse_float(this.elements.cruciblewonder[i].value)
				+ this.parse_float(this.elements.emp[i].value)
				+ this.parse_float(this.elements.ring[i].value)
				+ this.parse_float(this.elements.earring[i].value)
				+ this.parse_float(this.elements.passive1[i].value)
				+ this.parse_float(this.elements.passive2[i].value)
				+ this.parse_float(this.elements.passive3[i].value)
				+ this.parse_float(this.elements.domain[i].value)
				+ this.parse_float(this.elements.radiance[i].value)
				+ this.parse_float(this.elements.buff1[i].value)
				+ this.parse_float(this.elements.buff2[i].value)
				+ this.parse_float(this.elements.buff3[i].value)
				+ this.parse_float(this.elements.buff4[i].value)
				+ this.parse_float(this.elements.other[i].value);
			switch(this.elements.awakening[i].value)
			{
				case "Balanced":
				{
					ta += 4;
					break;
				}
				case "Multiattack":
				{
					ta += 5;
					break;
				}
				default:
				{
					break;
				}
			}
			if(ta > 100)
				this.elements.total[i].innerText = "" + Math.min(100, ta) + "% (" + ta + "%)";
			else
				this.elements.total[i].innerText = "" + ta + "%";
			this.elements.total[i].style.background = (ta >= 100) ? "green" : "";
		}
	}
	
	parse_float(val)
	{
		try
		{
			let f = parseFloat(val);
			if(isNaN(f))
				return 0;
			return f;
		}
		catch(err)
		{
			return 0;
		}
	}
	
	load()
	{
		try
		{
			const data = localStorage.getItem(TripleAttackCalculator.c_storage_key);
			if(data != null)
			{
				let storage = JSON.parse(data);
				for(const [key, elem] of Object.entries(storage))
				{
					if(key == "total")
						continue;
					if(key in this.elements)
					{
						for(let i = 0; i < 4; ++i)
						{
							this.elements[key][i].value = storage[key][i];
							if(key != "")
								this.color_cell(this.elements[key][i]);
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
		this.update();
	}
	
	save()
	{
		let storage = {};
		for(const [key, elem] of Object.entries(this.elements))
		{
			if(key != "total")
			{
				storage[key] = [];
				for(let i = 0; i < 4; ++i)
				{
					storage[key].push(elem[i].value);
				}
			}
		}
		localStorage.setItem(TripleAttackCalculator.c_storage_key, JSON.stringify(storage));
		push_popup("Your progress is saved.");
		this.set_save_pending(false);
	}
	
	static export_storage_data(obj)
	{
		try
		{
			const data = localStorage.getItem(TripleAttackCalculator.c_storage_key);
			if(data != null)
			{
				obj[TripleAttackCalculator.c_storage_key] = data;
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
			localStorage.setItem(TripleAttackCalculator.c_storage_key, obj[TripleAttackCalculator.c_storage_key]);
		}
		catch(err)
		{
		}
	}
}

tool_constructors[TripleAttackCalculator.c_key] = TripleAttackCalculator;