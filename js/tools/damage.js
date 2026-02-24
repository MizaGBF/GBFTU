class DamageCalculator extends ToolBase
{
	static c_name = Object.freeze("DMG Calc.");
	static c_key = Object.freeze("damage");
	static c_storage_key = Object.freeze("gbftu-damage");
	static c_dmg_type = Object.freeze({
		AUTO: 0,
		SKILL: 1,
		CA: 2
	});
	static c_mod_list = Object.freeze([
		[
			"might",
			"might_magna",
			"might_odious",
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
			"dmg_cap_spe",
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
		["Unique 3", "buff_unique_c"],
		["Unique 4", "buff_unique_d"],
		["Unique 5", "buff_unique_e"]
	]);
	// https://gbf.wiki/Damage_Cap
	static c_soft_cap_count = 5;
	static c_soft_caps = Object.freeze({
		"Auto":[
			[0, 1],
			[300000, 0.8],
			[400000, 0.6],
			[500000, 0.05],
			[600000, 0.01]
		],
		"Auto Assassin":[
			[0, 1],
			[1000000, 0.6],
			[1200000, 0.3],
			[1300000, 0.05],
			[1500000, 0.01]
		],
		"C.A.":[
			[0, 1],
			[1500000, 0.6],
			[1620000, 0.3],
			[1650000, 0.05],
			[1685000, 0.01]
		],
		/*"C.A. 2.15M":[
			[0, 1],
			[1935000, 0.6],
			[2050000, 0.3],
			[2100000, 0.05],
			[2150000, 0.01]
		],
		"C.A. 2.42M":[
			[0, 1],
			[2180000, 0.6],
			[2600000, 0.3],
			[2360000, 0.05],
			[2420000, 0.01]
		],
		"C.A. 2.90M":[
			[0, 1],
			[2610000, 0.6],
			[2760000, 0.3],
			[2830000, 0.05],
			[2900000, 0.01]
		],*/
		"C.A. 5★ Eternal":[
			[0, 1],
			[1800000, 0.6],
			[1920000, 0.3],
			[1980000, 0.05],
			[2020000, 0.01]
		],
		/*"C.A. 6★ Et.110":[
			[0, 1],
			[2060000, 0.6],
			[2180000, 0.3],
			[2240000, 0.05],
			[2300000, 0.01]
		],
		"C.A. 6★ Et.150":[
			[0, 1],
			[3160000, 0.6],
			[3280000, 0.3],
			[3340000, 0.05],
			[3400000, 0.01]
		],*/
		"Skill 200001": [
			[0, 1],
			[20000, 0.5],
			[50000, 0.2],
			[100000, 0.05],
			[150000, 0.01]
		],
		"Skill 300002": [
			[0, 1],
			[30000, 0.9],
			[40000, 0.7],
			[50000, 0.05],
			[100000, 0.01]
		],
		"Skill 300003": [
			[0, 1],
			[30000, 0.9],
			[50000, 0.7],
			[62500, 0.05],
			[125000, 0.01]
		],
		"Skill 500001": [
			[0, 1],
			[50000, 0.5],
			[66666, 0.3],
			[83333, 0.05],
			[166666, 0.01]
		],
		"Skill 500002": [
			[0, 1],
			[50000, 0.5],
			[100000, 0.3],
			[150000, 0.05],
			[500000, 0.01]
		],
		"Skill 500006": [
			[0, 1],
			[50000, 0.9],
			[100000, 0.7],
			[150000, 0.05],
			[500000, 0.01]
		],
		"Skill 600001": [
			[0, 1],
			[60000, 0.5],
			[80000, 0.3],
			[100000, 0.05],
			[200000, 0.01]
		],
		"Skill 600002": [
			[0, 1],
			[60000, 0.5],
			[100000, 0.2],
			[150000, 0.05],
			[200000, 0.01]
		],
		"Skill 750001": [
			[0, 1],
			[75000, 0.7],
			[100000, 0.5],
			[125000, 0.05],
			[250000, 0.01]
		],
		"Skill 1000002": [
			[0, 1],
			[100000, 0.4],
			[200000, 0.2],
			[300000, 0.1],
			[400000, 0.01]
		],
		"Skill 1000003": [
			[0, 1],
			[100000, 0.5],
			[133333, 0.3],
			[166666, 0.05],
			[333333, 0.01]
		],
		"Skill 1000004": [
			[0, 1],
			[100000, 0.5],
			[200000, 0.3],
			[300000, 0.05],
			[1000000, 0.01]
		],
		"Skill 1000008": [
			[0, 1],
			[100000, 0.6],
			[200000, 0.3],
			[300000, 0.05],
			[1000000, 0.01]
		],
		"Skill 1000009": [
			[0, 1],
			[100000, 0.6],
			[200000, 0.4],
			[300000, 0.05],
			[1000000, 0.01]
		],
		"Skill 1000010": [
			[0, 1],
			[100000, 0.6],
			[400000, 0.4],
			[500000, 0.05],
			[1000000, 0.01]
		],
		"Skill 1000014": [
			[0, 1],
			[100000, 0.9],
			[200000, 0.7],
			[300000, 0.05],
			[1000000, 0.01]
		],
		"Skill 1000015": [
			[0, 1],
			[100000, 0.3],
			[200000, 0.2],
			[300000, 0.05],
			[400000, 0.01]
		],
		"Skill 1000018": [
			[0, 1],
			[100000, 0.6],
			[150000, 0.4],
			[250000, 0.1],
			[400000, 0.01]
		],
		"Skill 1000020": [
			[0, 1],
			[200000, 0.6],
			[250000, 0.4],
			[350000, 0.1],
			[500000, 0.01]
		],
		"Skill 1500004": [
			[0, 1],
			[150000, 0.5],
			[200000, 0.3],
			[250000, 0.05],
			[500000, 0.01]
		],
		"Skill 2000001": [
			[0, 1],
			[200000, 0.6],
			[300000, 0.4],
			[400000, 0.05],
			[1000000, 0.01]
		],
		"Skill 2000002": [
			[0, 1],
			[200000, 0.7],
			[300000, 0.5],
			[400000, 0.05],
			[1000000, 0.01]
		],
		"Skill 2000003": [
			[0, 1],
			[200000, 0.8],
			[300000, 0.3],
			[400000, 0.05],
			[500000, 0.01]
		],
		"Skill 2000004": [
			[0, 1],
			[200000, 0.8],
			[300000, 0.6],
			[400000, 0.05],
			[1000000, 0.01]
		],
		"Skill 3000001": [
			[0, 1],
			[300000, 0.5],
			[400000, 0.3],
			[500000, 0.05],
			[1000000, 0.01]
		],
		"Skill 3000002": [
			[0, 1],
			[300000, 0.6],
			[400000, 0.4],
			[500000, 0.05],
			[1000000, 0.01]
		],
		"Skill 3000003": [
			[0, 1],
			[300000, 0.65],
			[400000, 0.45],
			[500000, 0.05],
			[1000000, 0.01]
		],
		"Skill 3000007": [
			[0, 1],
			[300000, 0.8],
			[400000, 0.6],
			[500000, 0.05],
			[1000000, 0.01]
		],
		"Skill 3000008": [
			[0, 1],
			[300000, 0.9],
			[400000, 0.7],
			[500000, 0.05],
			[1000000, 0.01]
		],
		"Skill 3000009": [
			[0, 1],
			[300000, 0.9],
			[400000, 0.7],
			[500000, 0.1],
			[1000000, 0.01]
		],
		"Skill 5000004": [
			[0, 1],
			[500000, 0.6],
			[600000, 0.4],
			[700000, 0.05],
			[1000000, 0.01]
		],
		"Skill 5000006": [
			[0, 1],
			[500000, 0.7],
			[600000, 0.5],
			[700000, 0.05],
			[1000000, 0.01]
		],
		"Skill 5000010": [
			[0, 1],
			[500000, 0.9],
			[600000, 0.8],
			[700000, 0.1],
			[1000000, 0.01]
		],
		"Skill 6000001": [
			[0, 1],
			[600000, 0.7],
			[800000, 0.5],
			[1000000, 0.05],
			[2000000, 0.01]
		],
		"Skill 6000002": [
			[0, 1],
			[600000, 0.9],
			[800000, 0.7],
			[1000000, 0.1],
			[2000000, 0.01]
		],
		"Skill 600007": [
			[0, 1],
			[600000, 0.5],
			[800000, 0.3],
			[1000000, 0.05],
			[2000000, 0.01]
		],
		"Skill 7000001": [
			[0, 1],
			[700000, 0.7],
			[800000, 0.4],
			[900000, 0.1],
			[1000000, 0.01]
		],
		"Skill 7000002": [
			[0, 1],
			[700000, 0.7],
			[800000, 0.25],
			[900000, 0.05],
			[1000000, 0.01]
		],
		"Skill 7000004": [
			[0, 1],
			[700000, 0.7],
			[900000, 0.5],
			[1400000, 0.05],
			[2000000, 0.01]
		],
		"Skill 8000006": [
			[0, 1],
			[1000000, 0.4],
			[1200000, 0.3],
			[1600000, 0.05],
			[1700000, 0.01]
		],
		"Skill 8000007": [
			[0, 1],
			[1100000, 0.4],
			[1300000, 0.3],
			[1700000, 0.05],
			[1800000, 0.01]
		],
		"Skill 10000001": [
			[0, 1],
			[1000000, 0.6],
			[1200000, 0.3],
			[1300000, 0.05],
			[1500000, 0.01]
		],
		"Skill 12000002": [
			[0, 1],
			[1200000, 0.8],
			[1600000, 0.6],
			[2000000, 0.4],
			[2400000, 0.01]
		],
		"Skill Unknown": [
			[0, 1],
			[700000, 0.9],
			[1000000, 0.5],
			[1100000, 0.05],
			[1200000, 0.01]
		]
	});
	static c_hard_cap_count = 3;
	static c_hard_caps = Object.freeze({
		"6.6M" : [
			[0, 1],
			[6000000, 0.5],
			[7000000, 0.1],
			[8000000, 0.001]
		],
		"13.1M" : [
			[0, 1],
			[12000000, 0.5],
			[14000000, 0.1],
			[15000000, 0.001]
		]
	});
	// https://gbf.wiki/Damage_Cap#Additional_Skill_Damage_Reduction
	static c_skill_cap_count = 3;
	static c_skill_caps = Object.freeze({
		"100" : [ // 100 and below
			[0, 1],
			[3000000, 0.2],
			[4500000, 0.01]
		],
		"200" : [
			[0, 1],
			[5000000, 0.2],
			[7500000, 0.01]
		],
		"300" : [
			[0, 1],
			[6000000, 0.2],
			[9000000, 0.01]
		],
		"400" : [
			[0, 1],
			[7000000, 0.2],
			[10500000, 0.01]
		],
		"500" : [
			[0, 1],
			[8000000, 0.2],
			[12000000, 0.01]
		],
		"600" : [
			[0, 1],
			[12000000, 0.2],
			[15000000, 0.01]
		]
	});
	
	static c_flurry = Object.freeze({
		"2 Hits": (1.0 / 2.0),
		"3 Hits": (1.0 / 3.0),
		"4 Hits": (1.0 / 4.0),
		"5 Hits": (1.0 / 5.0),
		"6 Hits": (1.0 / 6.0),
		"7 Hits": (1.0 / 7.0),
		"8 Hits": (1.0 / 8.0),
		"9 Hits": (1.0 / 9.0),
		"10 Hits": (1.0 / 10.0),
		"11 Hits": (1.0 / 11.0),
		"12 Hits": (1.0 / 12.0),
		"13 Hits": (1.0 / 13.0),
		"14 Hits": (1.0 / 14.0),
		"15 Hits": (1.0 / 15.0),
		"16 Hits": (1.0 / 16.0)
	});
	
	static c_color_critical = "#ff0000";
	static c_color_good = "#357a47";
	static c_color_bad = "#a15e3a";
	static c_color_red = "#a13a3a";
	static c_color_blue = "#3a89a1";
	static c_color_purple = "#a13a74";
	
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
		this.add_save_button();
		
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
		this.add_text_cell(grid, "assets/ui/damage/flurry.png", "Flurry");
		
		this.add_input_cell(grid, "10", "def");
		this.add_input_cell(grid, "0", "def_down");
		this.add_select_cell(grid, [
			"None", "2 Hits", "3 Hits", "4 Hits",
			"5 Hits", "6 Hits", "7 Hits", "8 Hits",
			"9 Hits", "10 Hits", "11 Hits", "12 Hits",
			"13 Hits", "14 Hits", "15 Hits", "16 Hits"
		], "flurry");
		
		this.add_text_cell(grid, "assets/ui/damage/wpn.png", "Crit. WPN.");
		this.add_text_cell(grid, "assets/ui/damage/bullet.png", "Bullet Mod. (%)");
		this.add_text_cell(grid, "assets/ui/damage/wide_open.png", "Wide Open (%)");
		
		this.add_select_cell(grid, ["None", "Crab Grab", "Gae Bulg", "Mjolnir"], "crit_wpn");
		this.add_input_cell(grid, "0", "bullet");
		this.add_input_cell(grid, "0", "wide_open");
		
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Toggles");
		grid = this.create_grid(this.tree[0], 4, false);
		this.add_text_cell(grid, "assets/ui/damage/ele_up.png", "Element");
		this.add_text_cell(grid, "assets/ui/damage/dmg_type.png", "DMG Type");
		this.add_text_cell(grid, "assets/ui/damage/crew.png", "Crew Ship");
		this.add_text_cell(grid, "assets/ui/damage/reactor.png", "Crew Reactor");

		this.add_select_cell(grid, ["Advantaged", "None", "Disadvantaged", "Destruction"], "ele_advantage");
		this.add_select_cell(grid, ["Auto", "Skill", "C.A."], "damage_type");
		this.add_select_cell(grid, ["Yes", "No"], "ship");
		this.add_select_cell(grid, ["Yes", "No"], "reactor");
		
		this.add_text_cell(grid, "assets/ui/damage/assassin.png", "C.A. Assassin");
		this.add_text_cell(grid, "assets/ui/damage/gw_fo.png", "GW First Officer");
		this.add_text_cell(grid, "assets/ui/damage/gw_atk.png", "GW Attack");
		this.add_text_cell(grid, "assets/ui/damage/atk_up.png", "GW Pity");
		
		this.add_select_cell(grid, ["No", "Yes"], "is_assassin");
		this.add_select_cell(grid, ["No", "Yes"], "gw_fo");
		this.add_select_cell(grid, ["No", "Yes"], "gw_atk");
		this.add_select_cell(grid, ["No", "Yes"], "gw_pity");
		
		add_to(this.tree[0], "span", {cls:["small-text"], innerhtml:"For auto attack assassins, simply change the 'Soft Cap type' to 'Auto Assassin' further below."});
		
		// wonder
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Wonders", "https://gbf.wiki/Wonders");
		grid = this.create_grid(this.tree[0], 4, false);
		
		this.add_text_cell(grid, "assets/ui/damage/wonder_amp.jpg", "Chara. AMP. (%)");
		this.add_text_cell(grid, "assets/ui/damage/yupei.png", "Yupei");
		this.add_text_cell(grid, "assets/ui/damage/wonder_6d.jpg", "Six Dragons");
		this.add_text_cell(grid, "assets/ui/damage/wonder_m2.jpg", "Regalia");
		
		this.add_input_cell(grid, "0", "wonder_amp");
		this.add_select_cell(grid, ["Yes", "No"], "wonder_yupei");
		this.add_select_cell(grid, ["Yes", "No"], "wonder_6d");
		this.add_select_cell(grid, ["Yes", "No"], "wonder_m2");
		
		// summons
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Summons");
		grid = this.create_grid(this.tree[0], 4, false);
		
		this.add_text_cell(grid, "assets/ui/damage/arcarum.png", "AMP. (%)");
		this.add_text_cell(grid, "assets/ui/damage/robur.png", "Supplemental");
		this.add_text_cell(grid, "assets/ui/damage/angel.png", "Cap up");
		this.add_invisible_cell(grid);
		
		this.add_input_cell(grid, "0", "summon_amp");
		this.add_select_cell(grid, ["None", "Robur 0★", "Belial", "Robur 3★"], "summon_supp");
		this.add_select_cell(grid, ["None", "0★", "3★", "4★"], "summon_cap_up");
		this.add_invisible_cell(grid);
		
		// grid and buffs
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Grid / Buffs", "https://gbf.wiki/Damage_Formula/Detailed_Damage_Formula");
		add_to(this.tree[0], "br");
		add_to(this.tree[0], "span", {cls:["small-text"], innertext:"(Input what's in the Estimate calculator, plus any other standard buff)"});
		
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
		add_to(this.tree[0], "span", {cls:["small-text"], innertext:"'Crit DMG' is where you can input the expected damage boost from crit buffs."});
		
		// specific mods
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Other Buffs");
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
		
		// soft caps
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Soft caps", "https://gbf.wiki/Damage_Cap");
		add_to(this.tree[0], "br");
		add_to(this.tree[0], "span", {cls:["small-text"], innertext:"(The various caps are applied after one another and Supplemental is applied after Soft caps)"});
		
		grid = this.create_grid(this.tree[0], 5, false);
		
		this.add_text_cell(grid, "assets/ui/damage/cap.png", "Soft Cap type");
		this.add_select_cell(grid, Object.keys(DamageCalculator.c_soft_caps), "soft_cap_type");
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		
		this.add_text_cell(grid, null, "Soft cap");
		this.add_text_cell(grid, null, "After boost");
		this.add_text_cell(grid, null, "Dampening");
		this.add_text_cell(grid, null, "After boost");
		this.add_text_cell(grid, null, "Range DMG");
		
		for(let i = 0; i < DamageCalculator.c_soft_cap_count; ++i)
		{
			this.add_text_cell(grid, null, "", "soft_cap_base_" + i);
			this.add_text_cell(grid, null, "", "soft_cap_" + i);
			this.add_text_cell(grid, null, "", "soft_dampening_base_" + i);
			this.add_text_cell(grid, null, "", "soft_dampening_" + i);
			this.add_text_cell(grid, null, "0", "soft_damage_" + i);
		}
		grid = this.create_grid(this.tree[0], 5, false);
		this.skill_cap_grid = grid;
		this.add_text_cell(grid, "assets/ui/damage/skill.png", "Skill reduction");
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		
		for(let i = 0; i < DamageCalculator.c_skill_cap_count; ++i)
		{
			this.add_text_cell(grid, null, "", "skill_cap_base_" + i);
			this.add_text_cell(grid, null, "", "skill_cap_" + i);
			this.add_text_cell(grid, null, "", "skill_dampening_base_" + i);
			this.add_text_cell(grid, null, "", "skill_dampening_" + i);
			this.add_text_cell(grid, null, "", "skill_damage_" + i);
		}
		
		grid = this.create_grid(this.tree[0], 5, false);
		this.add_text_cell(grid, "assets/ui/damage/cap.png", "Hard cap");
		this.add_select_cell(grid, ["6.6M", "13.1M"], "raid_cap");
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		this.add_invisible_cell(grid);
		
		for(let i = 0; i < DamageCalculator.c_hard_cap_count; ++i)
		{
			this.add_text_cell(grid, null, "", "hard_cap_base_" + i);
			this.add_text_cell(grid, null, "", "hard_cap_" + i);
			this.add_text_cell(grid, null, "", "hard_dampening_base_" + i);
			this.add_text_cell(grid, null, "", "hard_dampening_" + i);
			this.add_text_cell(grid, null, "", "hard_damage_" + i);
		}
		
		// results
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Results");
		grid = this.create_grid(this.tree[0], 5, false);
		
		this.add_text_cell(grid, "assets/ui/damage/atk.png", "Raw");
		this.add_text_cell(grid, "assets/ui/damage/def_up.png", "DEF");
		this.add_text_cell(grid, "assets/ui/damage/ele_atk.png", "");
		this.add_text_cell(grid, "assets/ui/damage/dmg_amp.png", "");
		this.add_text_cell(grid, "assets/ui/damage/wide_open.png", "Wide Open");
		
		this.add_text_cell(grid, null, "", "info_atk");
		this.add_text_cell(grid, null, "", "info_def");
		this.add_text_cell(grid, null, "", "info_ele");
		this.add_text_cell(grid, null, "", "info_amp");
		this.add_text_cell(grid, null, "", "info_wide_open");
		
		this.add_text_cell(grid, "assets/ui/damage/cap.png", "Cap up");
		this.add_text_cell(grid, "assets/ui/damage/cap.png", "Effect. Cap");
		this.add_text_cell(grid, "assets/ui/damage/icon.png", "Raw DMG.");
		this.add_text_cell(grid, "assets/ui/damage/over_soft.png", "Over Soft");
		this.add_text_cell(grid, "assets/ui/damage/over_hard.png", "Over Hard");
		
		this.add_text_cell(grid, null, "", "info_dmg_cap");
		this.add_text_cell(grid, null, "", "info_effective_cap");
		this.add_text_cell(grid, null, "", "info_raw_dmg");
		this.add_text_cell(grid, null, "", "info_over_soft");
		this.add_text_cell(grid, null, "", "info_over_hard");
		
		this.add_text_cell(grid, "assets/ui/damage/supplemental.png", "Supplemental");
		this.add_text_cell(grid, "assets/ui/damage/icon.png", "Final DMG");
		this.add_text_cell(grid, "assets/ui/damage/ingame.png", "In-game");
		this.add_text_cell(grid, "assets/ui/damage/difference.png", "Difference");
		this.add_text_cell(grid, "assets/ui/damage/flurry.png", "Flurry Sum");
		
		this.add_text_cell(grid, null, "", "info_supplemental");
		this.add_text_cell(grid, null, "", "info_final");
		this.add_input_cell(grid, "", "observed");
		this.add_text_cell(grid, null, "", "info_difference");
		this.add_text_cell(grid, null, "", "info_flurry");
		
		add_to(this.tree[0], "hr");
		this.add_save_button();
		
		// bonus damage
		add_to(this.tree[0], "hr");
		this.add_anchor(this.tree[0], "Variations / Bonus Damage test");
		add_to(this.tree[0], "br");
		add_to(this.tree[0], "span", {cls:["small-text"], innertext:"(Wide screen recommended)"});
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
		this.add_text_cell(grid, null, "Round up?");
		this.add_select_cell(grid, ["No", "Yes"], "round_up");
		
		add_to(this.tree[0], "span", {cls:["small-text"], innertext:"(C.A. bonus damage don't benefit from Supplemental, so you can turn it off above)"});
		
		add_to(this.tree[0], "br");
		this.add_save_button();
		this.load();
		this.update();
	}
	
	static get_tool_save_info()
	{
		return {
			name: DamageCalculator.c_name,
			key: DamageCalculator.c_key,
			storage_key: DamageCalculator.c_storage_key
		};
	}
	
	// add a text with some buttons to scroll up or down
	add_anchor(node, txt, wiki_link)
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
		if(wiki_link != null)
		{
			const btn = add_to(span, "button", {cls:["std-button"]});
			// I hate css, hack to align it with the rest
			btn.style.position = "relative";
			btn.style.top = "-2px";
			btn.style.width = "40px";
			btn.style.height = "40px";
			btn.style.padding = "0px";
			const a = add_to(btn, "a");
			a.target = "_blank";
			a.rel = "noopener noreferrer";
			a.href = wiki_link;
			add_to(a, "img", {cls:["mini-btn-icon"]}).src = "../GBFML/assets/ui/icon/wiki.png";
		}
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
						case "summon_amp":
						case "wide_open":
						case "skill_boost":
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
						case "flurry":
						{
							if(node.value == "None")
								node.style.background = "";
							else
								node.style.background = DamageCalculator.c_color_good;
							break;
						}
						case "damage_type":
						case "soft_cap_type":
						{
							switch(node.value)
							{
								case "Auto":
								{
									node.style.background = DamageCalculator.c_color_good;
									break;
								}
								case "Auto Assassin":
								{
									node.style.background = DamageCalculator.c_color_red;
									break;
								}
								case "C.A.":
								case "C.A. 2.15M":
								case "C.A. 2.42M":
								case "C.A. 2.90M":
								case "C.A. 5★ Eternal":
								case "C.A. 6★ Et.110":
								case "C.A. 6★ Et.150":
								{
									node.style.background = DamageCalculator.c_color_purple;
									break;
								}
								case "C.B.": // note: unused
								case "C.B. 2C":
								case "C.B. 3C":
								case "C.B. 4C":
								{
									node.style.background = DamageCalculator.c_color_blue;
									break;
								}
								default:
								{
									node.style.background = DamageCalculator.c_color_bad;
									break;
								}
							}
							break;
						}
						default:
						{
							switch(node.value)
							{
								case "Yes":
								case "Enabled":
								case "Advantaged":
								case "6.6M":
								case "Crab Grab":
								case "Gae Bulg":
								case "Mjolnir":
								case "Belial":
								case "4★":
								{
									node.style.background = DamageCalculator.c_color_good;
									break;
								}
								case "No":
								case "Disadvantaged":
								case "13.1M":
								case "Robur 0★":
								case "0★":
								{
									node.style.background = DamageCalculator.c_color_bad;
									break;
								}
								case "Disabled":
								{
									node.style.background = DamageCalculator.c_color_critical;
									break;
								}
								case "3★":
								case "Robur 3★":
								case "Destruction":
								{
									node.style.background = DamageCalculator.c_color_blue;
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
		mods.dmg_cap_spe += 1.0;
		mods.dmg_cap_pen += 1.0;
		
		// toggles
		const element_str = this.elements.ele_advantage.value;
		const advantage = (
			["Advantaged", "Destruction"].includes(element_str) ?
			0.5 :
			(
				element_str == "Disadvantaged" ?
				-0.25 :
				0
			)
		);
		const damage_type = (
			this.elements.damage_type.value == "Auto" ?
			DamageCalculator.c_dmg_type.AUTO :
			(
				this.elements.damage_type.value == "Skill" ?
				DamageCalculator.c_dmg_type.SKILL :
				DamageCalculator.c_dmg_type.CA
			)
		);
		const is_assassin = this.elements.is_assassin.value == "Yes";
		const hard_cap_str = this.elements.raid_cap.value;
		const hard_cap = hard_cap_str == "6.6M" ? 6600000 : 13100000;
		const crew_ship = (this.elements.ship.value == "Yes" && element_str != "Destruction") ? 1.1 : 1.0;
		const crew_reactor = (this.elements.reactor.value == "Yes" && element_str != "Destruction") ? 1.1 : 1.0;
		const gw_fo = this.elements.gw_fo.value == "Yes";
		const gw_pity = this.elements.gw_pity.value == "Yes";
		const gw_atk = this.elements.gw_atk.value == "Yes";
		const yupei = this.elements.wonder_yupei.value == "Yes";
		const w6d = this.elements.wonder_6d.value == "Yes";
		const wm2 = this.elements.wonder_m2.value == "Yes";
		const use_buff = this.elements.buff_enable.value == "Enabled";
		const round_up = this.elements.round_up.value == "Yes";
		switch(this.elements.summon_supp.value)
		{
			case "Robur 0★":
			{
				mods.dmg_supp += 25000;
				break;
			}
			case "Belial":
			{
				mods.dmg_supp += 30000;
				break;
			}
			case "Robur 3★":
			{
				mods.dmg_supp += 50000;
				break;
			}
		}
		switch(this.elements.summon_cap_up.value)
		{
			case "0★":
			{
				mods.dmg_cap += 0.05;
				break;
			}
			case "3★":
			{
				mods.dmg_cap += 0.10;
				break;
			}
			case "4★":
			{
				mods.dmg_cap += 0.15;
				break;
			}
		}
		
		// assassin + CA combo
		if(is_assassin && damage_type == DamageCalculator.c_dmg_type.CA)
		{
			mods.dmg_cap += 0.3;
		}
		
		// others
		let crit_modifier = 1.0;
		switch(this.elements.crit_wpn.value)
		{
			case "Mjolnir": crit_modifier += 7.0; break;
			case "Gae Bulg": crit_modifier += 2.0; break;
			case "Crab Grab": crit_modifier += 1.3; break;
		}
		crit_modifier += mods.crit_dmg;
		
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
		
		let bullet = Math.min(
			99,
			this.parse(this.elements.bullet.value)
		) / 100 + 1.0;
		
		let wide_open = Math.max(
			0,
			this.parse(this.elements.wide_open.value)
		) / 100;
		this.set_text_cell(this.elements.info_wide_open, 100 * wide_open, 2, true);
		this.color_cell(this.elements.info_wide_open);
		wide_open += 1.0;
		
		let elemental_atk = (
			element_str == "Destruction" ?
			(
				advantage
			) :
			(
				mods.ele_atk +
				(yupei ? 0.1 : 0) +
				advantage +
				(wm2 ? 0.03 : 0)
			)
		);
		this.set_text_cell(this.elements.info_ele, 100 * elemental_atk, 2, true);
		this.color_cell(this.elements.info_ele);
		
		let amplification = (
			mods.dmg_amp +
			Math.max(0, this.parse(this.elements.wonder_amp.value) / 100) +
			Math.max(0, this.parse(this.elements.summon_amp.value) / 100) +
			(yupei ? 0.05 : 0)
		);
		this.set_text_cell(this.elements.info_amp, 100 * amplification, 2, true);
		this.color_cell(this.elements.info_amp);
		
		if(damage_type != DamageCalculator.c_dmg_type.AUTO)
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
		
		// adjust raw atk calcul
		let flurry_sum_mul = 1.0;
		if(this.elements.flurry.value in DamageCalculator.c_flurry)
		{
			atk *= DamageCalculator.c_flurry[this.elements.flurry.value];
			flurry_sum_mul = 1.0 / DamageCalculator.c_flurry[this.elements.flurry.value];
		}
		
		let adjusted_raw_atk = this.adjust_raw_atk(atk, bullet, crew_ship, crew_reactor);
		this.set_text_cell(this.elements.info_atk, adjusted_raw_atk);
		
		// effective defense
		let effective_defense = Math.max(0, 
			(1 - def_down) * def * (1 - mods.def_ignore)
		);
		this.set_text_cell(this.elements.info_def, effective_defense);
		this.color_cell(this.elements.info_def);
		
		// combine modifiers
		let modifiers = ( // pre-calculated here so it can be reused in bonus dmg part
			(1.0 + mods.might) *
			(1.0 + mods.might_magna) *
			(1.0 + mods.might_odious) *
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
			( // auto wide open
				damage_type == DamageCalculator.c_dmg_type.AUTO ?
				wide_open :
				1.0
			) *
			( // found on some obscure JP blog that it multiplies
				gw_atk ?
				1.25 :
				1.0
			) *
			(
				gw_pity ?
				1.30 :
				1.0
			) *
			(
				use_buff ?
				this.calculate_buff_mod(mods) :
				1.0
			) /
			effective_defense
		);
		
		// raw damage
		let raw_damage = this.calcul_raw_damage(adjusted_raw_atk, base_multiplier, damage_type, skill_multiplier, yupei, modifiers);
		this.set_text_cell(this.elements.info_raw_dmg, raw_damage);
		
		// soft caps
		const soft_cap_str = this.elements.soft_cap_type.value;
		let [soft_caps, capped_dmg] = this.generate_soft_cap(
			"soft",
			DamageCalculator.c_soft_caps[this.elements.soft_cap_type.value],
			DamageCalculator.c_soft_cap_count,
			raw_damage,
			effective_cap * wide_open,
			mods.dmg_cap_pen
		);
		let over_soft = raw_damage - capped_dmg;
		this.set_text_cell(this.elements.info_over_soft, over_soft);

		// apply wide open (non AUTO)
		if(damage_type != DamageCalculator.c_dmg_type.AUTO)
		{
			capped_dmg *= wide_open;
		}
		// apply supplemental
		capped_dmg += mods.dmg_supp;
		this.set_text_cell(this.elements.info_supplemental, mods.dmg_supp);

		// skill soft caps
		let skill_caps = [];
		if(damage_type == DamageCalculator.c_dmg_type.SKILL)
		{
			const threshold = "" + (100 + (skill_multiplier * 100) - (skill_multiplier * 100) % 100);
			if(threshold in DamageCalculator.c_skill_caps)
			{
				[skill_caps, capped_dmg] = this.generate_soft_cap(
					"skill",
					DamageCalculator.c_skill_caps[threshold],
					DamageCalculator.c_skill_cap_count,
					capped_dmg,
					1.0,
					1.0
				);
				this.skill_cap_grid.style.display = "grid";
			}
			else this.skill_cap_grid.style.display = "none";
		}
		else this.skill_cap_grid.style.display = "none";
		
		// hard caps
		let [hard_caps, final_damage] = this.generate_soft_cap(
			"hard",
			DamageCalculator.c_hard_caps[hard_cap_str],
			DamageCalculator.c_hard_cap_count,
			capped_dmg,
			mods.dmg_cap_spe * (
				damage_type == DamageCalculator.c_dmg_type.AUTO ?
				wide_open :
				1.0
			),
			1.0
		);
		
		// results
		let over_hard = capped_dmg - final_damage;
		this.set_text_cell(this.elements.info_over_hard, over_hard);
		this.set_text_cell(this.elements.info_final, final_damage);
		this.set_text_cell(this.elements.info_flurry, final_damage * flurry_sum_mul);
		
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
		
		// bonus damage section
		const echo = this.parse(
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
				// Note:
				// for auto with a non 100% echo, we redo most of the calcul from scratch
				// otherwise, we reuse the raw_damage value
				const dmg = (
					echo != 1.0 && damage_type == DamageCalculator.c_dmg_type.AUTO ?
					this.calcul_raw_damage(
						this.adjust_raw_atk(atk * echo, bullet, crew_ship, crew_reactor),
						base_multiplier, damage_type, skill_multiplier, yupei, modifiers
					) :
					raw_damage
				) * (1 + (j / 100) + (i / 1000));
				// apply caps
				let dmg_sum = this.apply_simple_soft_caps(dmg, soft_caps);
				// apply wide open
				dmg_sum *= wide_open;
				// add supp (others)
				if(damage_type != DamageCalculator.c_dmg_type.AUTO)
				{
					dmg_sum += mods.dmg_supp;
				}
				// apply echo (non AUTO)
				if(echo != 1.0 && damage_type != DamageCalculator.c_dmg_type.AUTO)
				{
					dmg_sum *= echo;
				}
				// add supp (auto)
				if(damage_type == DamageCalculator.c_dmg_type.AUTO)
				{
					dmg_sum += mods.dmg_supp;
				}
				// extra caps
				if(skill_caps.length > 0)
					dmg_sum = this.apply_simple_soft_caps(dmg_sum, skill_caps);
				dmg_sum = this.apply_simple_soft_caps(dmg_sum, hard_caps);
				// round up
				if(round_up)
					dmg_sum += 1;
				dmg_sum = Math.ceil(dmg_sum);
				this.set_text_cell(this.elements["variation_" + j + "_" + i], dmg_sum);
			}
		}
	}
	
	calculate_buff_mod(mods)
	{
		let val = 1.0;
		for(const [unused, key] of Object.values(DamageCalculator.c_special_mod_list))
		{
			val *= (1.0 + mods[key]);
		}
		return val;
	}
	
	adjust_raw_atk(atk, bullet, crew_ship, crew_reactor)
	{
		return Math.ceil(
			(
				(atk > 51290 && atk < 74400) ?
				(
					(Math.floor(Math.floor(Math.ceil(atk * bullet / 10) * crew_ship) * crew_reactor) + 2)
				) :
				(
					Math.ceil(Math.ceil(Math.ceil(atk * bullet / 10) * crew_ship) * crew_reactor)
				)
			) * 10
		);
	}
	
	calcul_raw_damage(adjusted_raw_atk, base_multiplier, damage_type, skill_multiplier, yupei, modifiers)
	{
		return Math.ceil(
			adjusted_raw_atk *
			(
				base_multiplier + (
					damage_type == DamageCalculator.c_dmg_type.SKILL ?
					(
						skill_multiplier + (
							yupei ? 0.05 : 0
						)
					) :
					0
				)
			) * 
			modifiers
		);
	}
	
	generate_soft_cap(key, base_caps, count, raw_damage, effective_cap, dmg_cap_pen)
	{
		let caps = [];
		for(let i = 0; i < count; ++i)
		{
			const [val, dampening] = base_caps[i];
			caps.push([
				val * effective_cap,
				Math.min(1.0, dampening * dmg_cap_pen),
				0
			]);
			this.set_text_cell(this.elements[key + "_cap_base_" + i], val);
			this.set_text_cell(this.elements[key + "_cap_" + i], caps[i][0]);
			this.set_text_cell(this.elements[key + "_dampening_base_" + i], (dampening * 100), 5, true);
			this.set_text_cell(this.elements[key + "_dampening_" + i], (caps[i][1] * 100), 5, true);
		}
		let capped_dmg_sum = 0;
		for(let i = 0; i < count; ++i)
		{
			const [val, dampening] = base_caps[i];
			if(i == count -1)
			{
				caps[i][2] = Math.max(
					0,
					raw_damage - caps[i][0]
				) * caps[i][1];
			}
			else
			{
				caps[i][2] = Math.min(
					Math.max(
						0,
						raw_damage - caps[i][0]
					),
					caps[i + 1][0] - val
				) * caps[i][1];
			}
			this.set_text_cell(this.elements[key + "_damage_" + i], caps[i][2]);
			
			capped_dmg_sum += caps[i][2];
		}
		return [
			caps,
			capped_dmg_sum
		];
	}
	
	apply_simple_soft_caps(dmg, caps)
	{
		let dmg_sum = 0;
		for(let n = 0; n < caps.length; ++n)
		{
			if(n == caps.length - 1)
			{
				dmg_sum += (
					Math.max(
						dmg - caps[n][0],
						0
					) * caps[n][1]
				);
			}
			else
			{
				dmg_sum += (
					Math.min(
						caps[n + 1][0] - caps[n][0],
						Math.max(
							dmg - caps[n][0],
							0
						)
					) * caps[n][1]
				);
			}
		}
		return dmg_sum;
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