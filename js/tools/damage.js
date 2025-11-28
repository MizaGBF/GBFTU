class DamageCalculator extends ToolBase
{
	static c_key = Object.freeze("damage");
	static c_storage_key = Object.freeze("gbftu-damage");
	static c_mod_list = Object.freeze([
		[
			"might",
			"might_magna",
			"might_ex",
			"might_ex_sp"
		],
		[
			"stamina",
			"stamina_magna",
			"stamina_ex"
		],
		[
			"enmity",
			"enmity_magna",
			"enmity_ex"
		],
		[
			"ele_atk",
			"crit_dmg",
			"dmg_cap",
			"dmg_supp",
			"dmg_amp",
			"dmg_cap_pen",
			"def_ignore"
		]
	]);
	static c_special_mod_list = Object.freeze([
		["Perpetuity", "buff_perp"],
		["Assassin", "buff_assassin"],
		["Unique 1", "buff_unique_a"],
		["Unique 2", "buff_unique_b"],
		["Unique 3", "buff_unique_c"]
	]);
	static c_soft_caps = Object.freeze([
		{base:[0, 1, 300000], assassin:[0, 1, 1000000]},
		{base:[300000, 0.8, 400000], assassin:[1000000, 0.6, 1200000]},
		{base:[400000, 0.6, 500000], assassin:[1200000, 0.3, 1300000]},
		{base:[500000, 0.05, 600000], assassin:[1300000, 0.05, 1500000]},
		{base:[600000, 0.01, Infinity], assassin:[1500000, 0.01, Infinity]}
	]);
	static c_last_soft_cap = 600000;
	static c_hard_caps = Object.freeze([
		[12000000, 0.2],
		[15000000, 0.001]
	]);
	static c_color_critical = "#ff0000";
	static c_color_good = "#357a47";
	static c_color_bad = "#a15e3a";
	
	constructor()
	{
		super();
		this.key = DamageCalculator.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.elements = [];
		this.anchors = [];
		let grid;
		add_to(
			this.tree[0],
			"div"
		).innerHTML = "Tool based on a spreadsheet from <a href=\"https://gbf.wiki/User:Cajunwildcat\">Cajun</a>.<br>Do note that the layout isn't optimized for mobile users or small-width windows.<br>This tool is for research purpose, to determine modifiers, etc... and works first and foremost in conjunction with the in-game estimate/calculator (i.e. auto-attack damage).<br><br>Please report bugs and consider it experimental.";
		
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
		
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "General");
		grid = this.create_grid(this.tree[0], 3, false);
		this.add_text_cell(grid, "assets/ui/damage/atk.png", "ATK");
		this.add_text_cell(grid, "assets/ui/damage/atk_up.png", "Base Mod. (%)");
		this.add_text_cell(grid, "assets/ui/damage/skill.png", "Skill DMG Boost (%)");
		
		this.add_input_cell(grid, "0", "atk");
		this.add_input_cell(grid, "100", "base_mod");
		this.add_input_cell(grid, "0", "skill_boost");
		
		this.add_text_cell(grid, "assets/ui/damage/def_up.png", "Enemy DEF.");
		this.add_text_cell(grid, "assets/ui/damage/def_down.png", "Def Down (%)");
		this.add_text_cell(grid, "assets/ui/damage/wpn.png", "Crit. WPN.");
		
		this.add_input_cell(grid, "10", "def");
		this.add_input_cell(grid, "0", "def_down");
		this.add_select_cell(grid, ["None", "Crab Grab", "Gae Bulg", "Mjolnir"], "crit_wpn");
		
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Toggles");
		grid = this.create_grid(this.tree[0], 4, false);
		this.add_text_cell(grid, "assets/ui/damage/ele_up.png", "Ele. Advantage");
		this.add_text_cell(grid, "assets/ui/damage/red_skill.png", "Skill DMG");
		this.add_text_cell(grid, "assets/ui/damage/assassin.png", "Assassin");
		this.add_text_cell(grid, "assets/ui/damage/cap.png", "Raid cap");
		
		this.add_select_cell(grid, ["Yes", "No"], "advantage");
		this.add_select_cell(grid, ["No", "Yes"], "is_skill");
		this.add_select_cell(grid, ["No", "Yes"], "is_assassin");
		this.add_select_cell(grid, ["6.6M", "13.1M"], "raid_cap");
		
		this.add_text_cell(grid, "assets/ui/damage/crew.png", "Crew Ship");
		this.add_text_cell(grid, "assets/ui/damage/reactor.png", "Crew Reactor");
		this.add_text_cell(grid, "assets/ui/damage/gw_fo.png", "GW First Officer");
		this.add_text_cell(grid, "assets/ui/damage/gw_atk.png", "GW Attack");
		
		this.add_select_cell(grid, ["Yes", "No"], "ship");
		this.add_select_cell(grid, ["Yes", "No"], "reactor");
		this.add_select_cell(grid, ["No", "Yes"], "gw_fo");
		this.add_select_cell(grid, ["No", "Yes"], "gw_atk");
		
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Wonders");
		grid = this.create_grid(this.tree[0], 4, false);
		
		this.add_text_cell(grid, "assets/ui/damage/wonder_amp.jpg", "Chara. AMP (%)");
		this.add_text_cell(grid, "assets/ui/damage/yupei.png", "Yupei");
		this.add_text_cell(grid, "assets/ui/damage/wonder_6d.jpg", "Six Dragons");
		this.add_text_cell(grid, "assets/ui/damage/wonder_m2.jpg", "Regalia");
		
		this.add_input_cell(grid, "0", "wonder_amp");
		this.add_select_cell(grid, ["Yes", "No"], "wonder_yupei");
		this.add_select_cell(grid, ["Yes", "No"], "wonder_6d");
		this.add_select_cell(grid, ["Yes", "No"], "wonder_m2");
		
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Grid");
		grid = this.create_grid(this.tree[0], 4, true);
		
		this.add_mod_header(grid);
		
		for(let i = 0; i < DamageCalculator.c_mod_list.length; ++i)
		{
			if(i > 0)
			{
				add_to(this.tree[0], "br");
				grid = this.create_grid(this.tree[0], 4, true);
			}
			this.add_grid_mods(grid, DamageCalculator.c_mod_list[i]);
		}
		
		// specific mods
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Buffs");
		grid = this.create_grid(this.tree[0], 4, true);
		
		this.add_mod_header(
			grid,
			this.add_select_cell(null, ["Enabled", "Disabled"], "buff_enable")
		);
		
		for(const [txt, key] of DamageCalculator.c_special_mod_list)
		{
			this.add_text_cell(grid, null, txt);
			this.add_input_cell(grid, "0", key + "_1");
			this.add_input_cell(grid, "0", key + "_2");
			this.add_input_cell(grid, "0", key + "_3");
			this.add_text_cell(grid, null, "0", key + "_total");
		}
		
		// results
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Results");
		grid = this.create_grid(this.tree[0], 5, false);
		
		this.add_text_cell(grid, "assets/ui/damage/atk.png", "Raw");
		this.add_text_cell(grid, "assets/ui/damage/def_up.png", "DEF");
		this.add_text_cell(grid, "assets/ui/damage/ele_atk.png", "");
		this.add_text_cell(grid, "assets/ui/damage/dmg_amp.png", "");
		this.add_invisible_cell(grid);
		
		this.add_text_cell(grid, null, "", "info_atk");
		this.add_text_cell(grid, null, "", "info_def");
		this.add_text_cell(grid, null, "", "info_ele");
		this.add_text_cell(grid, null, "", "info_amp");
		this.add_invisible_cell(grid);
		
		this.add_text_cell(grid, "assets/ui/damage/cap.png", "Cap up");
		this.add_text_cell(grid, "assets/ui/damage/cap.png", "Effect. Cap");
		this.add_text_cell(grid, "assets/ui/damage/icon.png", "Raw DMG.");
		this.add_text_cell(grid, "assets/ui/damage/icon.png", "Over Soft Cap");
		this.add_text_cell(grid, "assets/ui/damage/icon.png", "Overdamage");
		
		this.add_text_cell(grid, null, "", "info_dmg_cap");
		this.add_text_cell(grid, null, "", "info_effective_cap");
		this.add_text_cell(grid, null, "", "info_raw_dmg");
		this.add_text_cell(grid, null, "", "info_beyond_soft");
		this.add_text_cell(grid, null, "", "info_overdamage");
		
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		this.add_text_cell(grid, "assets/ui/damage/icon.png", "Final DMG");
		this.add_text_cell(grid, "assets/ui/damage/icon.png", "In-game");
		this.add_text_cell(grid, "assets/ui/damage/icon.png", "Difference");
		
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		this.add_text_cell(grid, null, "", "info_final");
		this.add_input_cell(grid, "", "observed");
		this.add_text_cell(grid, null, "", "info_difference");
		
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Soft caps");
		grid = this.create_grid(this.tree[0], 5, false);
		this.add_text_cell(grid, null, "Soft cap");
		this.add_text_cell(grid, null, "After boost");
		this.add_text_cell(grid, null, "Dampening");
		this.add_text_cell(grid, null, "After boost");
		this.add_text_cell(grid, null, "Range DMG");
		
		for(let i = 0; i < DamageCalculator.c_soft_caps.length; ++i)
		{
			this.add_text_cell(grid, null, "", "soft_cap_base_" + i);
			this.add_text_cell(grid, null, "", "soft_cap_" + i);
			this.add_text_cell(grid, null, "", "soft_dampening_base_" + i);
			this.add_text_cell(grid, null, "", "soft_dampening_" + i);
			this.add_text_cell(grid, null, "0", "soft_damage_" + i);
		}
		add_to(this.tree[0], "span", {innertext:"Hard soft caps"});
		grid = this.create_grid(this.tree[0], 5, false);
		for(let i = 0; i < DamageCalculator.c_hard_caps.length; ++i)
		{
			const [soft_cap, dampening] = DamageCalculator.c_hard_caps[i];
			this.add_text_cell(grid, null, this.round(soft_cap));
			this.add_text_cell(grid, null, this.round(soft_cap), "hard_cap_" + i);
			this.add_text_cell(grid, null, (dampening * 100) + "%");
			this.add_text_cell(grid, null, "", "hard_dampening_" + i);
			this.add_text_cell(grid, null, "0", "hard_damage_" + i);
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
		this.add_anchor(this.tree[0], "Variations / Bonus Damage test");
		grid = this.create_grid(this.tree[0], 1, false);
		grid.style.gridTemplateColumns = "repeat(11, calc(100% / 11))";
		this.add_select_cell(grid, [
			"5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%",
			"55%", "60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%", "100%",
			"105%", "110%", "115%", "120%", "125%", "130%", "135%", "140%", "145%", "150%",
			"155%", "160%", "165%", "170%", "175%", "180%", "185%", "190%", "195%", "200%"
		], "variation_mod").value = "100%";
		for(let i = 0; i < 10; ++i)
			this.add_text_cell(grid, null, "" + i + "‰");
		for(let i = -5; i <= 5; ++i)
		{
			this.add_text_cell(grid, null, "" + i + "%");
			for(let j = 0; j < 10; ++j)
				this.add_text_cell(grid, null, "", "variation_" + i + "_" + j);
		}
		this.add_text_cell(grid, "", "Round up?");
		this.add_select_cell(grid, ["No", "Yes"], "round_up");
		
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
			name: "DMG Calc.",
			key: DamageCalculator.c_key,
			storage_key: DamageCalculator.c_storage_key
		};
	}
	
	// add a text with some buttons to scroll up or down
	add_anchor(node, txt)
	{
		const anchor_pos = this.anchors.length;
		const span = add_to(node, "span");
		// up button
		add_to(
			span,
			"button",
			{
				cls:["std-button"],
				innertext:"▲",
				onclick:(() => {
					this.scroll_anchor(anchor_pos, -1);
				})
			}
		).style.width = "40px";
		// down button
		add_to(
			span,
			"button",
			{
				cls:["std-button"],
				innertext:"▼",
				onclick:(() => {
					this.scroll_anchor(anchor_pos, 1);
				})
			}
		).style.width = "40px";
		span.appendChild(document.createTextNode(" " + txt));
		this.anchors.push(span);
	}
	
	scroll_anchor(start, step)
	{
		this.anchors[(start + step + this.anchors.length) % this.anchors.length].scrollIntoView();
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
	
	// add the header row for mod grids
	add_mod_header(grid, topleft = null)
	{
		if(topleft == null)
			this.add_invisible_cell(grid);
		else
			grid.appendChild(topleft);
		this.add_text_cell(grid, null, "#1");
		this.add_text_cell(grid, null, "#2");
		this.add_text_cell(grid, null, "#3");
		this.add_text_cell(grid, null, "Total");
	}
	
	// add a grid mod line
	add_grid_mods(grid, files)
	{
		for(const file of files)
		{
			this.add_text_cell(grid, "assets/ui/damage/" + file + ".png", "");
			this.add_input_cell(grid, "0", file + "_1");
			this.add_input_cell(grid, "0", file + "_2");
			this.add_input_cell(grid, "0", file + "_3");
			this.add_text_cell(grid, null, "0", file + "_total");
		}
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
		if(icon != null)
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
	
	// return true if valid float
	is_number(value)
	{
		const num = Number(value);
		return (!Number.isNaN(num) && Number.isFinite(num));
	}
	
	// check if valid float and parse it
	parse(value)
	{
		if(!this.is_number(value))
		{
			throw new Error(value + " isn't a valid number");
		}
		return parseFloat(value);
	}
	
	// round a float to given decimals
	// also format it to string with thousand separators
	round(value, decimal = 2)
	{
		const mul = Math.pow(10, decimal);
		// note: French locale has space for thousand separators
		return (Math.floor(value * mul) / mul).toLocaleString('fr-FR');
	}
	
	// set a text cell content
	// for numbers, decimals can be given, along with the option to add % after
	set_text_cell(cell, value, decimal = 2, add_percent_to_value = false)
	{
		if(this.is_number(value))
		{
			if(add_percent_to_value)
				cell.childNodes[1].textContent = this.round(value, decimal) + "%";
			else
				cell.childNodes[1].textContent = this.round(value, decimal);
		}
		else
		{
			cell.childNodes[1].textContent = value;
		}
	}
	
	// color a cell background
	// adapted from the TripleAttackCalculator tool
	color_cell(node)
	{
		try
		{
			switch(node.tagName)
			{
				case "INPUT":
				case "DIV":
				{
					const val = (
						typeof(node.value) != "undefined" ?
						node.value :
						node.textContent
					);
					let f = parseFloat(val);
					if(isNaN(f))
						throw new Error("Not a value");
					switch(node.getAttribute("access"))
					{
						case "base_mod":
						{
							if(f == 100)
								node.style.background = "";
							else if(f < 0)
								node.style.background = DamageCalculator.c_color_critical;
							else if(f < 100)
								node.style.background = DamageCalculator.c_color_bad;
							else
								node.style.background = DamageCalculator.c_color_good;
							break;
						}
						case "skill_boost":
						{
							if(f == 0)
								node.style.background = "";
							else if(f < -99)
								node.style.background = DamageCalculator.c_color_critical;
							else if(f < 0)
								node.style.background = DamageCalculator.c_color_bad;
							else
								node.style.background = DamageCalculator.c_color_good;
							break;
						}
						case "def_down":
						{
							if(f == 0)
								node.style.background = "";
							else if(f > 50)
								node.style.background = DamageCalculator.c_color_critical;
							else if(f < 0)
								node.style.background = DamageCalculator.c_color_bad;
							else
								node.style.background = DamageCalculator.c_color_good;
							break;
						}
						case "def":
						case "info_def":
						{
							if(f == 10)
								node.style.background = "";
							else if(f < 1)
								node.style.background = DamageCalculator.c_color_critical;
							else if(f < 10)
								node.style.background = DamageCalculator.c_color_bad;
							else
								node.style.background = DamageCalculator.c_color_good;
							break;
						}
						case "wonder_amp":
						case "atk":
						{
							if(f == 0)
								node.style.background = "";
							else if(f < 0)
								node.style.background = DamageCalculator.c_color_critical;
							else
								node.style.background = DamageCalculator.c_color_good;
							break;
						}
						default:
						{
							if(f > 0)
								node.style.background = DamageCalculator.c_color_good;
							else if(f < 0)
								node.style.background = DamageCalculator.c_color_bad;
							else
								node.style.background = "";
							break;
						}
					}
					break;
				}
				case "SELECT":
				{
					switch(node.getAttribute("access"))
					{
						case "variation_mod":
						{
							node.style.background = DamageCalculator.c_color_good;
							break;
						}
						default:
						{
							switch(node.value)
							{
								case "Yes":
								case "Enabled":
								case "6.6M":
								case "Crab Grab":
								case "Gae Bulg":
								case "Mjolnir":
								{
									node.style.background = DamageCalculator.c_color_good;
									break;
								}
								case "No":
								case "13.1M":
								{
									node.style.background = DamageCalculator.c_color_bad;
									break;
								}
								case "Disabled":
								{
									node.style.background = DamageCalculator.c_color_critical;
									break;
								}
								default:
								{
									node.style.background = "";
									break;
								}
							}
							break;
						}
					}
					break;
				}
				default:
				{
					node.style.background = "";
					break;
				}
			}
		} catch(err) {
			node.style.background = DamageCalculator.c_color_critical;
		}
	}
	
	update()
	{
		// mods & buffs
		let mods = {};
		for(const section of DamageCalculator.c_mod_list)
		{
			for(const mod of section)
			{
				mods[mod] = 0;
				for(let i = 1; i < 4; ++i)
				{
					mods[mod] += this.parse(this.elements[mod + "_" + i].value);
				}
				this.set_text_cell(
					this.elements[mod + "_total"],
					mods[mod],
					2,
					mod != "dmg_supp" // add a % for everything but supplemental
				);
				this.color_cell(this.elements[mod + "_total"]);
			}
		}
		for(const [txt, mod] of DamageCalculator.c_special_mod_list)
		{
			mods[mod] = 0;
			for(let i = 1; i < 4; ++i)
			{
				mods[mod] += this.parse(this.elements[mod + "_" + i].value);
			}
			this.set_text_cell(
				this.elements[mod + "_total"],
				mods[mod],
				2,
				true
			);
			this.color_cell(this.elements[mod + "_total"]);
		}
		// adjustments
		for(const key of Object.keys(mods))
		{
			if(key != "dmg_supp") // supp doesn't need to be converted
				mods[key] /= 100.0;
		}
		mods.dmg_cap_pen += 1.0;
		
		// toggles
		const advantage = this.elements.advantage.value == "Yes";
		const is_skill = this.elements.is_skill.value == "Yes";
		const is_assassin = this.elements.is_assassin.value == "Yes";
		const hard_cap = this.elements.raid_cap.value == "6.6M" ? 6600000 : 13100000;
		const crew_ship = this.elements.ship.value == "Yes" ? 1.1 : 1.0;
		const crew_reactor = this.elements.reactor.value == "Yes" ? 1.1 : 1.0;
		const gw_fo = this.elements.gw_fo.value == "Yes";
		const gw_atk = this.elements.gw_atk.value == "Yes";
		const yupei = this.elements.wonder_yupei.value == "Yes";
		const w6d = this.elements.wonder_6d.value == "Yes";
		const wm2 = this.elements.wonder_m2.value == "Yes";
		const use_buff = this.elements.buff_enable.value == "Enabled";
		const round_up = this.elements.round_up.value == "Yes";
		
		// others
		let crit_modifier = 1.0;
		switch(this.elements.crit_wpn.value)
		{
			case "Mjolnir": crit_modifier += 7.0; break;
			case "Gae Bulg": crit_modifier += 2.0; break;
			case "Crab Grab": crit_modifier += 1.3; break;
		}
		
		// math stuff
		let base_multiplier = Math.max(
			0,
			this.parse(this.elements.base_mod.value) / 100
		);
		let skill_multiplier = Math.max(
			0,
			this.parse(this.elements.skill_boost.value) / 100
		);
		let atk = Math.max(
			0,
			this.parse(this.elements.atk.value)
		);
		let def = Math.max(
			1,
			this.parse(this.elements.def.value)
		);
		let def_down = Math.min(
			99,
			this.parse(this.elements.def_down.value)
		) / 100;
		let elemental_atk = (
			mods.ele_atk +
			(yupei ? 0.1 : 0) +
			(advantage ? 0.5 : 0) +
			(wm2 ? 0.03 : 0)
		);
		this.set_text_cell(this.elements.info_ele, 100*elemental_atk, 2, true);
		this.color_cell(this.elements.info_ele);
		
		let amplification = (
			mods.dmg_amp +
			Math.max(0, this.parse(this.elements.wonder_amp.value) / 100) +
			(yupei ? 0.05 : 0)
		);
		this.set_text_cell(this.elements.info_amp, 100*amplification, 2, true);
		this.color_cell(this.elements.info_amp);
		
		if(is_skill)
			mods.dmg_supp *= (1.0 + amplification);
		
		let damage_cap = (
			mods.dmg_cap +
			(gw_fo ? 0.1 : 0) +
			(yupei ? 0.05 : 0) +
			(w6d ? 0.03 : 0)
		);
		this.set_text_cell(this.elements.info_dmg_cap, (1.0 + damage_cap) * 100, 4, true);
		
		let effective_cap = (1.0 + damage_cap) * (1.0 + amplification);
		this.set_text_cell(this.elements.info_effective_cap, effective_cap * 100, 4, true);
		
		let adjusted_raw_atk = Math.ceil(
			(
				(atk > 51290 && atk < 74400) ?
				(
					(Math.floor(Math.floor(Math.ceil(atk / 10) * crew_ship) * crew_reactor) + 2)
				) :
				(
					Math.ceil(Math.ceil(Math.ceil(atk / 10) * crew_ship) * crew_reactor)
				)
			) * 10
		);
		this.set_text_cell(this.elements.info_atk, adjusted_raw_atk);
		
		let effective_defense = Math.max(0, 
			(1 - def_down) * def * (1 - mods.def_ignore)
		);
		this.set_text_cell(this.elements.info_def, effective_defense);
		this.color_cell(this.elements.info_def);
		
		let raw_damage = Math.ceil(
			adjusted_raw_atk *
			(
				base_multiplier + (
					is_skill ?
					(
						skill_multiplier + (
							yupei ? 0.05 : 0
						)
					) :
					0
				)
			) * 
			(1.0 + mods.might) *
			(1.0 + mods.might_magna) *
			(1.0 + mods.might_ex + mods.might_ex_sp) *
			(1.0 + mods.stamina) *
			(1.0 + mods.stamina_magna) *
			(1.0 + mods.stamina_ex) *
			(1.0 + mods.enmity) *
			(1.0 + mods.enmity_magna) *
			(1.0 + mods.enmity_ex) *
			(1.0 + elemental_atk) *
			(1.0 + amplification) *
			crit_modifier *
			(
				gw_atk ?
				1.25 :
				1.0
			) *
			(
				use_buff ?
				(
					(1.0 + mods.buff_perp) *
					(1.0 + mods.buff_assassin) *
					(1.0 + mods.buff_unique_a) *
					(1.0 + mods.buff_unique_b) *
					(1.0 + mods.buff_unique_c)
				) :
				1.0
			) /
			effective_defense
		);
		this.set_text_cell(this.elements.info_raw_dmg, raw_damage);
		
		// soft caps
		let soft_caps = {};
		for(let i = 0; i < DamageCalculator.c_soft_caps.length; ++i)
		{
			const [val, dampening, next] = (
				is_assassin ?
				DamageCalculator.c_soft_caps[i].assassin :
				DamageCalculator.c_soft_caps[i].base
			);
			// boosted value, boosted dampening, effective damage in range
			soft_caps[val] = [
				val * effective_cap,
				Math.min(1.0, dampening * mods.dmg_cap_pen),
				0
			];
			this.set_text_cell(this.elements["soft_cap_base_" + i], val);
			this.set_text_cell(this.elements["soft_cap_" + i], soft_caps[val][0]);
			this.set_text_cell(this.elements["soft_dampening_base_" + i], (dampening * 100), 5, true);
			this.set_text_cell(this.elements["soft_dampening_" + i], (soft_caps[val][1] * 100), 5, true);
		}
		let capped_dmg_sum = 0;
		for(let i = 0; i < DamageCalculator.c_soft_caps.length; ++i)
		{
			const [val, dampening, next] = (
				is_assassin ?
				DamageCalculator.c_soft_caps[i].assassin :
				DamageCalculator.c_soft_caps[i].base
			);
			// damage in that range
			soft_caps[val][2] = Math.min(
				Math.max(
					0,
					raw_damage - soft_caps[val][0]
				),
				(
					next in soft_caps ?
					soft_caps[next][0] :
					next
				) - val
			) * soft_caps[val][1];
			this.set_text_cell(this.elements["soft_damage_" + i], soft_caps[val][2]);
			
			capped_dmg_sum += soft_caps[val][2];
		}
		let beyond_soft = raw_damage - soft_caps[DamageCalculator.c_last_soft_cap][2];
		this.set_text_cell(this.elements.info_beyond_soft, beyond_soft);
		
		// hard caps
		// works mostly the same as soft caps
		let hard_caps = {};
		const last_soft_cap = soft_caps[DamageCalculator.c_last_soft_cap];
		for(let i = 0; i < DamageCalculator.c_hard_caps.length; ++i)
		{
			const [val, dampening] = DamageCalculator.c_hard_caps[i];
			hard_caps[val] = [
				val, // unchanged for now
				dampening * last_soft_cap[1],
				0
			];
			//this.set_text_cell(this.elements["hard_" + i], hard_caps[val][0]);
			this.set_text_cell(this.elements["hard_dampening_" + i], (hard_caps[val][1] * 100), 5, true);
		}
		let hard_capped_dmg_sum = 0;
		for(let i = 0; i < DamageCalculator.c_hard_caps.length; ++i)
		{
			const [val, dampening] = DamageCalculator.c_hard_caps[i];
			if(capped_dmg_sum >= hard_caps[val][0])
			{
				hard_caps[val][2] = Math.min(
					(
						raw_damage -
						(
							(last_soft_cap[2] / last_soft_cap[1]) +
							hard_capped_dmg_sum
						)
					) * hard_caps[val][1],
					(
						(
							i == 0 ?
							hard_caps[DamageCalculator.c_hard_caps[i+1]][0] :
							Infinity
						) - hard_caps[val][1]
					) * dampening
				)
			}
			this.set_text_cell(this.elements["hard_damage_" + i], hard_caps[val][2]);
			
			hard_capped_dmg_sum += hard_caps[val][2] / hard_caps[val][1];
			capped_dmg_sum += hard_caps[val][2];
			
		}
		
		let overdamage = soft_caps[DamageCalculator.c_last_soft_cap][2];
		for(const [unused1, unused2, val] of Object.values(hard_caps))
			overdamage += val;
		this.set_text_cell(this.elements.info_overdamage, overdamage);
		
		let final_damage = Math.min(
			Math.round(raw_damage + overdamage + mods.dmg_supp),
			hard_cap
		);
		this.set_text_cell(this.elements.info_final, final_damage);
		
		let value = this.elements.observed.value;
		if(value.trim() != "" && this.is_number(value))
		{
			const diff = final_damage - parseFloat(value);
			this.set_text_cell(this.elements.info_difference, diff);
		}
		else
		{
			this.set_text_cell(this.elements.info_difference, 0);
		}
		this.color_cell(this.elements.info_difference);
		
		// details section
		const variation_mod = this.parse(
			this.elements.variation_mod.value.slice(
				0,
				this.elements.variation_mod.value.length - 1
			)
		) / 100;
		for(let i = 0; i < 10; ++i)
		{
			for(let j = -5; j <= 5; ++j)
			{
				// base damage
				const dmg = raw_damage * (1 + (j / 100) + (i / 1000));
				// following will hold current cap details and the next one
				let cap_current;
				let cap_next = (
					is_assassin ?
					DamageCalculator.c_soft_caps[0].assassin[0] :
					DamageCalculator.c_soft_caps[0].base[0]
				);
				// the variable holding the final damage
				let dmg_sum = 0;
				// apply soft caps
				for(let n = 0; n < DamageCalculator.c_soft_caps.length; ++n)
				{
					cap_current = cap_next; // pass next to current
					if(n == DamageCalculator.c_soft_caps.length - 1)
					{
						dmg_sum += (
							Math.max(
								dmg - soft_caps[cap_current][0],
								0
							) * soft_caps[cap_current][1]
						);
					}
					else
					{
						// get next one
						cap_next = (
							is_assassin ?
							DamageCalculator.c_soft_caps[n + 1].assassin[0] :
							DamageCalculator.c_soft_caps[n + 1].base[0]
						);
						dmg_sum += (
							Math.min(
								soft_caps[cap_next][0] - soft_caps[cap_current][0],
								Math.max(
									dmg - soft_caps[cap_current][0],
									0
								)
							) * soft_caps[cap_current][1]
						);
					}
				}
				if(round_up)
					dmg_sum += 1;
				dmg_sum *= variation_mod;
				dmg_sum += mods.dmg_supp;
				dmg_sum = Math.ceil(dmg_sum);
				this.set_text_cell(this.elements["variation_" + j + "_" + i], dmg_sum);
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
			const data = localStorage.getItem(DamageCalculator.c_storage_key);
			if(data != null)
			{
				obj[DamageCalculator.c_storage_key] = data;
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
			localStorage.setItem(DamageCalculator.c_storage_key, obj[DamageCalculator.c_storage_key]);
		}
		catch(err)
		{
		}
	}
}

tool_constructors[DamageCalculator.c_key] = DamageCalculator;