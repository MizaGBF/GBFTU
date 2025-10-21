class AdvyrntureOptimizer extends ToolBase
{
	static c_key = Object.freeze("advyrnture");
	static c_storage_key = Object.freeze("gbftu-advyrnture");
	static c_levels = Object.freeze([
		{combat:4,perception:2,endurance:3,affinity:5,luck:5},
		{combat:4,perception:3,endurance:4,affinity:6,luck:6},
		{combat:5,perception:3,endurance:4,affinity:7,luck:6},
		{combat:5,perception:3,endurance:5,affinity:7,luck:6},
		{combat:7,perception:5,endurance:7,affinity:9,luck:7},
		{combat:7,perception:5,endurance:7,affinity:10,luck:7},
		{combat:7,perception:6,endurance:8,affinity:10,luck:7},
		{combat:8,perception:6,endurance:8,affinity:11,luck:8},
		{combat:8,perception:6,endurance:9,affinity:11,luck:8},
		{combat:10,perception:8,endurance:11,affinity:13,luck:9},
		{combat:10,perception:8,endurance:11,affinity:14,luck:9},
		{combat:10,perception:9,endurance:12,affinity:14,luck:9},
		{combat:11,perception:9,endurance:12,affinity:14,luck:10},
		{combat:11,perception:9,endurance:13,affinity:15,luck:10},
		{combat:13,perception:11,endurance:15,affinity:17,luck:11},
		{combat:13,perception:11,endurance:15,affinity:17,luck:12},
		{combat:13,perception:12,endurance:16,affinity:17,luck:12},
		{combat:14,perception:12,endurance:16,affinity:18,luck:12},
		{combat:14,perception:12,endurance:17,affinity:18,luck:12},
		{combat:16,perception:14,endurance:19,affinity:20,luck:13},
		{combat:16,perception:14,endurance:19,affinity:21,luck:13},
		{combat:17,perception:14,endurance:20,affinity:21,luck:14},
		{combat:17,perception:15,endurance:20,affinity:22,luck:14},
		{combat:17,perception:15,endurance:21,affinity:22,luck:14},
		{combat:19,perception:17,endurance:23,affinity:24,luck:15},
		{combat:19,perception:17,endurance:23,affinity:26,luck:15},
		{combat:21,perception:17,endurance:25,affinity:26,luck:16},
		{combat:21,perception:19,endurance:25,affinity:28,luck:16},
		{combat:21,perception:19,endurance:26,affinity:28,luck:16},
		{combat:24,perception:22,endurance:29,affinity:31,luck:17},
		{combat:24,perception:24,endurance:29,affinity:31,luck:17},
		{combat:26,perception:24,endurance:31,affinity:33,luck:17},
		{combat:28,perception:24,endurance:31,affinity:35,luck:17},
		{combat:30,perception:24,endurance:34,affinity:35,luck:18},
		{combat:33,perception:27,endurance:37,affinity:38,luck:19},
		{combat:33,perception:27,endurance:37,affinity:40,luck:20},
		{combat:35,perception:27,endurance:39,affinity:40,luck:20},
		{combat:35,perception:29,endurance:39,affinity:42,luck:20},
		{combat:37,perception:29,endurance:41,affinity:42,luck:20},
		{combat:40,perception:32,endurance:43,affinity:45,luck:21},
		{combat:40,perception:34,endurance:43,affinity:45,luck:21},
		{combat:42,perception:36,endurance:45,affinity:45,luck:21},
		{combat:42,perception:38,endurance:45,affinity:47,luck:21},
		{combat:44,perception:38,endurance:45,affinity:47,luck:21},
		{combat:47,perception:41,endurance:48,affinity:50,luck:22},
		{combat:47,perception:43,endurance:48,affinity:52,luck:22},
		{combat:49,perception:45,endurance:50,affinity:52,luck:22},
		{combat:49,perception:47,endurance:50,affinity:52,luck:23}
	]);
	static c_buddies = Object.freeze({
		"1": {
			name: "Joy",
			stat: "perception"
		},
		"2": {
			name: "Kyuta",
			stat: "endurance"
		},
		"3": {
			name: "Young Cat",
			stat: "affinity"
		},
		"4": {
			name: "Ursula",
			stat: "combat"
		}
	});
	static c_zones = Object.freeze([
		{name:"Western Phantagrande Skydom",id:"1",combat:4,perception:2,endurance:3,affinity:5,luck:5,unlock:0},
		{name:"Eastern Phantagrande Skydom",id:"2",combat:5,perception:8,endurance:10,affinity:5,luck:2,unlock:5},
		{name:"Alohas Super Resort",id:"7",combat:11,perception:10,endurance:23,affinity:26,luck:10,unlock:15},
		{name:"Micenos Island",id:"9",combat:28,perception:26,endurance:15,affinity:16,luck:12,unlock:20},
		{name:"Jewel Resort Casino Liner",id:"5",combat:18,perception:16,endurance:29,affinity:42,luck:50,unlock:25},
		{name:"Nalhegrande Skydom",id:"3",combat:42,perception:36,endurance:35,affinity:37,luck:16,unlock:30},
		{name:"Feendrache",id:"8",combat:54,perception:37,endurance:57,affinity:48,luck:18,unlock:35},
		{name:"Stardust Town",id:"10",combat:32,perception:47,endurance:36,affinity:58,luck:37,unlock:35},
		{name:"Great Oarlyegrande Skydom",id:"4",combat:62,perception:42,endurance:68,affinity:55,luck:32,unlock:40},
		{name:"Pandemonium",id:"6",combat:89,perception:61,endurance:60,affinity:55,luck:42,unlock:45}
	]);
	static c_helms = Object.freeze({
		"0":{name:"",combat:0,perception:0,endurance:0,affinity:0,luck:0,skill:[0]},
		"1":{name:"Straw Hat",combat:0,perception:0,endurance:0,affinity:3,luck:3,skill:[3]},
		"3":{name:"Knight's Armet",combat:0,perception:6,endurance:10,affinity:0,luck:0,skill:[1,"Feendrache","endurance",10]},
		"5":{name:"Albacore Hood",combat:0,perception:0,endurance:0,affinity:1,luck:0,skill:[2,"Western Phantagrande Skydom"]},
		"6":{name:"Luminiera Helm",combat:2,perception:0,endurance:0,affinity:0,luck:0,skill:[1,"Western Phantagrande Skydom","endurance",2]},
		"7":{name:"Agastia Gorget",combat:3,perception:0,endurance:1,affinity:0,luck:0,skill:[1,"Eastern Phantagrande Skydom","endurance",3]},
		"8":{name:"Orchid's Hat",combat:0,perception:0,endurance:0,affinity:1,luck:1,skill:[2,"Eastern Phantagrande Skydom"]},
		"10":{name:"Reinhardtzar's Eye Patch",combat:8,perception:0,endurance:4,affinity:0,luck:0,skill:[1,"Nalhegrande Skydom","combat",10]},
		"12":{name:"Headdress of Affection",combat:0,perception:3,endurance:0,affinity:5,luck:0,skill:[2,"Nalhegrande Skydom"]},
		"13":{name:"Blue Scarf",combat:0,perception:0,endurance:13,affinity:6,luck:0,skill:[1,"Great Oarlyegrande Skydom","endurance",12]},
		"14":{name:"Ripe Apple",combat:0,perception:0,endurance:7,affinity:7,luck:0,skill:[6]},
		"15":{name:"Bunny-Ear Headband",combat:0,perception:0,endurance:0,affinity:3,luck:7,skill:[1,"Jewel Resort Casino Liner","luck",10]},
		"16":{name:"Curly Demon Horns",combat:0,perception:13,endurance:0,affinity:13,luck:0,skill:[1,"Pandemonium","luck",20]},
		"17":{name:"Swimming Goggles",combat:0,perception:3,endurance:4,affinity:0,luck:0,skill:[1,"Alohas Super Resort","endurance",4]},
		"19":{name:"MEOW-TRON Mask",combat:6,perception:0,endurance:0,affinity:5,luck:0,skill:[1,"Micenos Island","combat",6]},
		"20":{name:"Cute Ribbon",combat:0,perception:8,endurance:0,affinity:0,luck:9,skill:[1,"Stardust Town","perception",12]},
		"21":{name:"Alohas Lei",combat:0,perception:0,endurance:0,affinity:3,luck:0,skill:[4,"Joy"]},
		"22":{name:"Bobo Mask",combat:4,perception:0,endurance:0,affinity:4,luck:0,skill:[5,"Kyuta"]},
		"23":{name:"Cat-Ear Silk Hat",combat:0,perception:4,endurance:4,affinity:0,luck:0,skill:[5,"Young Cat"]},
		"24":{name:"Very Ordinary Sunglasses",combat:0,perception:3,endurance:0,affinity:0,luck:0,skill:[4,"Ursula"]}
	});
	static c_arms = Object.freeze({
		"0":{name:"",combat:0,perception:0,endurance:0,affinity:0,luck:0,skill:[0]},
		"102":{name:"Torch",combat:1,perception:0,endurance:0,affinity:0,luck:1,skill:[2,"Eastern Phantagrande Skydom"]},
		"105":{name:"Albacore Blade",combat:1,perception:0,endurance:1,affinity:0,luck:0,skill:[2,"Western Phantagrande Skydom"]},
		"106":{name:"Luminiera Shield",combat:0,perception:0,endurance:2,affinity:0,luck:0,skill:[1,"Western Phantagrande Skydom","combat",2]},
		"107":{name:"Agastia Simulacrum",combat:3,perception:0,endurance:0,affinity:1,luck:0,skill:[1,"Eastern Phantagrande Skydom","perception",3]},
		"108":{name:"Fun Adventure Map",combat:0,perception:6,endurance:3,affinity:0,luck:0,skill:[6]},
		"110":{name:"Merkmal Fig Branch",combat:0,perception:4,endurance:0,affinity:4,luck:0,skill:[2,"Nalhegrande Skydom"]},
		"111":{name:"Meditative Sutra",combat:0,perception:7,endurance:0,affinity:0,luck:4,skill:[1,"Nalhegrande Skydom","perception",7]},
		"112":{name:"Giant Bone",combat:8,perception:0,endurance:0,affinity:7,luck:0,skill:[3]},
		"113":{name:"Istavion Sword",combat:10,perception:9,endurance:0,affinity:0,luck:0,skill:[1,"Great Oarlyegrande Skydom","combat",12]},
		"115":{name:"Empress's Whip",combat:2,perception:0,endurance:0,affinity:0,luck:8,skill:[1,"Jewel Resort Casino Liner","luck",10]},
		"116":{name:"Demon King's Spear",combat:13,perception:0,endurance:13,affinity:0,luck:0,skill:[1,"Pandemonium","combat",25]},
		"117":{name:"Alohas Uli Uli",combat:0,perception:0,endurance:0,affinity:5,luck:4,skill:[1,"Alohas Super Resort","endurance",4]},
		"118":{name:"Feendrache Pennant",combat:11,perception:0,endurance:0,affinity:5,luck:0,skill:[1,"Feendrache","combat",10]},
		"119":{name:"Cat's Tail",combat:0,perception:6,endurance:0,affinity:0,luck:4,skill:[1,"Micenos Island","perception",6]},
		"120":{name:"Stick Horse",combat:0,perception:0,endurance:0,affinity:7,luck:9,skill:[1,"Stardust Town","affinity",10]},
		"121":{name:"Joy's Rolling Pin",combat:4,perception:0,endurance:4,affinity:0,luck:0,skill:[5,"Joy"]},
		"122":{name:"Fresh Cucumber",combat:0,perception:0,endurance:0,affinity:0,luck:3,skill:[4,"Kyuta"]},
		"123":{name:"Cat Teaser",combat:0,perception:0,endurance:0,affinity:3,luck:0,skill:[4,"Young Cat"]},
		"124":{name:"Beach Ball",combat:4,perception:0,endurance:0,affinity:0,luck:4,skill:[5,"Ursula"]}
	});
	/********************************************
	Equipment skills format (Might need refactor in the future):
	- 0 : None
	- 1 : Stat Boost. Params: Zone name, boosted stat, value
	- 2 : Max drop boost. Params: Zone name
	- 3 : Huge Success boost when stat requirements are met
	- 4 : Buddy Exp boost. Params: Buddy name
	- 5 : Buddy Exp boost and Huge Success boost. Params: Buddy name
	- 6 : Chance to negate stall
	********************************************/
	
	constructor()
	{
		super();
		this.key = AdvyrntureOptimizer.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.data = {lvl:1,buddy:{},helm:{},arm:{}};
		this.elements = {};
		this.tree[0].appendChild(document.createTextNode("Set your level, buddies and equipments and this tool will suggest configurations for each zone."));
		this.tree[0].appendChild(document.createElement("br"));
		this.tree[0].appendChild(document.createTextNode("The top 10 results are sorted by requirements met and skill bonuses (drop boosts, huge success boosts, etc...)."));
		this.tree[0].appendChild(document.createElement("br"));
		this.save_buttons.push(add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Save",
				onclick:(() => {
					this.save();
				}),
				br:true
			}
		));
		add_to(
			this.tree[0],
			"label",
			{
				innertext:"Level"
			}
		).htmlFor = "advyrnture-lvl";
		this.level = add_to(
			this.tree[0],
			"select",
			{
				cls:["styled-input"],
				id:"advyrnture-lvl"
			}
		);
		this.level.style.width = "100px";
		this.level.onchange = () => {
			this.data.lvl = parseInt(this.level.value)+1;
			for(const zone of AdvyrntureOptimizer.c_zones)
			{
				this.elements["zone-" + zone.id].img.classList.toggle("effect-dim", zone.unlock > this.data.lvl);
			}
			this.set_save_pending(true);
			this.update();
		};
		for(let i = 0; i < AdvyrntureOptimizer.c_levels.length; ++i)
		{
			let opt = add_to(this.level, "option");
			opt.value = i;
			opt.textContent = "" + (i + 1);
		}
		add_to(this.tree[0],"br");
		add_to(this.tree[0],"hr");
		// buddies
		this.tree[0].appendChild(document.createTextNode("Buddies"));
		add_to(this.tree[0],"br");
		let grid = add_to(this.tree[0], "div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "repeat(auto-fit, min(95%, 140px))";
		grid.style.gridAutoColumns = "min(95%, 140px)";
		for(const buddy of Object.keys(AdvyrntureOptimizer.c_buddies))
		{
			let block = add_to(
				grid,
				"div",
				{
					cls:["tool-block", "tool-block-hover", "tool-block-active"],
					onclick:() => {
						this.toggle_buddy(buddy);
					}
				}
			);
			const img = add_to(
				block,
				"img",
				{
					cls:["effect-dim"],
					br:true
				}
			);
			img.style.minWidth = "140px";
			img.style.maxWidth = "140px";
			img.style.height = "80px";
			img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/" + buddy + ".jpg";
			let txt = add_to(
				block,
				"span",
				{
					cls:["tool-block"],
					innertext:"Locked"
				}
			);
			txt.style.width = "100%";
			txt.style.textAlign = "center";
			this.elements["buddy-" + buddy] = {block:block, img:img, txt:txt};
		}
		add_to(this.tree[0],"hr");
		// helmets
		this.tree[0].appendChild(document.createTextNode("Helmets"));
		add_to(this.tree[0],"br");
		grid = add_to(this.tree[0], "div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "repeat(auto-fit, min(95%, 140px))";
		grid.style.gridAutoColumns = "min(95%, 140px)";
		for(const helm of Object.keys(AdvyrntureOptimizer.c_helms))
		{
			if(helm == "0")
				continue;
			let block = add_to(
				grid,
				"div",
				{
					cls:["tool-block", "tool-block-hover", "tool-block-active"],
					onclick:() => {
						this.toggle_equipment(helm, 0);
					}
				}
			);
			const img = add_to(
				block,
				"img",
				{
					cls:["effect-dim"]
				}
			);
			img.style.minWidth = "140px";
			img.style.maxWidth = "140px";
			img.style.height = "80px";
			img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/" + helm + ".jpg";
			this.elements["helm-" + helm] = {block:block, img:img};
		}
		add_to(this.tree[0],"hr");
		// arms
		this.tree[0].appendChild(document.createTextNode("Arms"));
		add_to(this.tree[0],"br");
		grid = add_to(this.tree[0], "div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "repeat(auto-fit, min(95%, 140px))";
		grid.style.gridAutoColumns = "min(95%, 140px)";
		for(const arm of Object.keys(AdvyrntureOptimizer.c_arms))
		{
			if(arm == "0")
				continue;
			let block = add_to(
				grid,
				"div",
				{
					cls:["tool-block", "tool-block-hover", "tool-block-active"],
					onclick:() => {
						this.toggle_equipment(arm, 1);
					}
				}
			);
			const img = add_to(
				block,
				"img",
				{
					cls:["effect-dim"]
				}
			);
			img.style.minWidth = "140px";
			img.style.maxWidth = "140px";
			img.style.height = "80px";
			img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/" + arm + ".jpg";
			this.elements["arm-" + arm] = {block:block, img:img};
		}
		// save
		add_to(this.tree[0],"hr");
		this.save_buttons.push(add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Save",
				onclick:(() => {
					this.save();
				}),
				br:true
			}
		));
		// zones
		for(const zone of AdvyrntureOptimizer.c_zones)
		{
			add_to(this.tree[0],"hr");
			let details = add_to(this.tree[0],"details");
			let summary = add_to(details,"summary");
			const img = add_to(summary, "img");
			img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_mid/sp/vyrnsampo/assets/area/thumb/" + zone.id + ".png";
			img.classList.toggle("effect-dim", zone.unlock);
			const block = add_to(details, "div");
			this.elements["zone-" + zone.id] = {block:block, img:img};
			
		}
		// save
		add_to(this.tree[0],"hr");
		this.save_buttons.push(add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Save",
				onclick:(() => {
					this.save();
				}),
				br:true
			}
		));
		this.load();
		this.update();
	}
	
	static get_tool_save_info()
	{
		return {
			name: "Advyrnture",
			key: AdvyrntureOptimizer.c_key,
			storage_key: AdvyrntureOptimizer.c_storage_key
		};
	}
	
	toggle_buddy(id)
	{
		if(!(id in this.data.buddy))
			this.data.buddy[id] = 0;
		switch(this.data.buddy[id])
		{
			case 0: this.data.buddy[id] = 3; break;
			case 3: this.data.buddy[id] = 6; break;
			case 6: this.data.buddy[id] = 10; break;
			default: this.data.buddy[id] = 0; break;
		}
		if(this.data.buddy[id])
		{
			this.elements["buddy-"+id].img.classList.toggle("effect-dim", false);
			this.elements["buddy-"+id].txt.innerText = "+" + this.data.buddy[id];
		}
		else
		{
			this.elements["buddy-"+id].img.classList.toggle("effect-dim", true);
			this.elements["buddy-"+id].txt.innerText = "Locked";
		}
		this.set_save_pending(true);
		this.update();
	}
	
	toggle_equipment(id, type)
	{
		const key = type == 0 ? "helm" : "arm";
		if(!(id in this.data[key]))
			this.data[key][id] = false;
		this.data[key][id] = !this.data[key][id];
		this.elements[key+"-"+id].img.classList.toggle("effect-dim", !this.data[key][id]);
		this.set_save_pending(true);
		this.update();
	}
	
	update()
	{
		const lvl = this.data.lvl - 1;
		const kbud = Object.keys(AdvyrntureOptimizer.c_buddies);
		// build equipments combos
		const equipments = {};
		for(const [hid, helm] of Object.entries(AdvyrntureOptimizer.c_helms))
		{
			if(hid != "0" && (this.data.helm[hid] ?? false) == false)
				continue;
			for(const [aid, arm] of Object.entries(AdvyrntureOptimizer.c_arms))
			{
				if(aid != "0" && (this.data.arm[aid] ?? false) == false)
					continue;
				for(let a = 0; a < kbud.length - 1; ++a)
				{
					for(let b = a + 1; b < kbud.length; ++b)
					{
						const stats = { ...AdvyrntureOptimizer.c_levels[lvl]};
						// buddies
						stats[AdvyrntureOptimizer.c_buddies[kbud[a]].stat] += this.data.buddy[kbud[a]] ?? 0;
						stats[AdvyrntureOptimizer.c_buddies[kbud[b]].stat] += this.data.buddy[kbud[b]] ?? 0;
						const buddies = [];
						if(this.data.buddy[kbud[a]] ?? 0)
							buddies.push(kbud[a]);
						if(this.data.buddy[kbud[b]] ?? 0)
							buddies.push(kbud[b]);
						while(buddies.length < 2)
							buddies.push(null);
						// equipment
						for(const s of ["combat","perception","endurance","affinity","luck"])
						{
							stats[s] += helm[s];
							stats[s] += arm[s];
						}
						// store
						const key = ""+aid+"-"+hid+"-"+buddies[0]+"-"+buddies[1];
						equipments[key] = {hid:hid, aid:aid, bud:buddies, stats:stats};
					}
				}
			}
		}
		// check for each zones
		const results = {};
		for(const zone of AdvyrntureOptimizer.c_zones)
		{
			results[zone.id] = [];
			if(lvl + 1 < zone.unlock)
				continue;
			for(const equipment of Object.values(equipments))
			{
				const stats = { ...equipment.stats};
				const boosts = {maxdrop:0,success:0,req:0,stall:0,exp:0};
				const buddy_names = [
					(equipment.bud[0] == null) ? null : AdvyrntureOptimizer.c_buddies[equipment.bud[0]].name,
					(equipment.bud[1] == null) ? null : AdvyrntureOptimizer.c_buddies[equipment.bud[1]].name
				];
				for(const equip of [AdvyrntureOptimizer.c_helms[equipment.hid], AdvyrntureOptimizer.c_arms[equipment.aid]])
				{
					switch(equip.skill[0])
					{
						case 1:
						{
							if(zone.name == equip.skill[1])
							{
								stats[equip.skill[2]] += equip.skill[3];
							}
							break;
						}
						case 2:
						{
							if(zone.name == equip.skill[1])
							{
								boosts.maxdrop += 1;
							}
							break;
						}
						case 3:
						{
							boosts.req += 1;
							break;
						}
						case 4:
						{
							if(buddy_names.includes(equip.skill[1]))
							{
								boosts.exp += 1;
							}
							break;
						}
						case 5:
						{
							if(buddy_names.includes(equip.skill[1]))
							{
								boosts.exp += 1;
								boosts.success += 1;
							}
							break;
						}
						case 6:
						{
							boosts.stall += 1;
							break;
						}
					}
				}
				// give slight priority to not max-level buddies
				for(let i = 0; i < 2; ++i)
				{
					if(equipment.bud[i] != null && this.data.buddy[equipment.bud[i]] < 10)
						++boosts.exp;
				}
				// buddy skills
				if(equipment.bud[0] != null && equipment.bud[1] != null)
				{
					// micenos island
					if(zone.id == "9" && equipment.bud[0] == "1" && equipment.bud[1] == "3")
					{
						boosts.success += 1;
						boosts.stall += 2;
					}
					// western skydom
					else if(zone.id == "1" && equipment.bud[0] == "2" && equipment.bud[1] == "4")
					{
						boosts.maxdrop += 1;
					}
				}
				let stat_met = 0;
				for(const s of ["combat","perception","endurance","affinity","luck"])
				{
					if(stats[s] >= zone[s])
						++stat_met;
				}
				results[zone.id].push({stat_met:stat_met, equipment:equipment, boosts:boosts, stats:stats});
			}
			results[zone.id].sort(this.result_sort);
		}
		for(const zone of AdvyrntureOptimizer.c_zones)
		{
			const block = this.elements["zone-"+zone.id].block;
			const zone_results = results[zone.id];
			const children = Array.from(block.children);
			const frag = document.createDocumentFragment();
			for(let i = 0; i < 10; ++i)
			{
				if(i < zone_results.length) // result exists
				{
					const ref = zone_results[i];
					if(i >= children.length) // we must create a new node
					{
						const div = add_to(frag, "div", {cls:["tool-block"]});
						div.style.marginBottom = "2px";
						div.style.marginLeft = "2px";
						div.style.marginRight = "2px";
						div.style.marginTop = "2px";
						let img = add_to(div, "img");
						if(ref.equipment.hid == "0")
							img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/empty_1.jpg";
						else
							img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/" + ref.equipment.hid + ".jpg";
						img.style.width = "60px";
						img = add_to(div, "img");
						if(ref.equipment.aid == "0")
							img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/empty_2.jpg";
						else
							img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/" + ref.equipment.aid + ".jpg";
						img.style.width = "60px";
						add_to(div, "br");
						img = add_to(div, "img");
						if(ref.equipment.bud[0] == null)
							img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/empty.jpg";
						else
							img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/" + ref.equipment.bud[0] + ".jpg";
						img.style.width = "120px";
						add_to(div, "br");
						img = add_to(div, "img");
						if(ref.equipment.bud[1] == null)
							img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/empty.jpg";
						else
							img.src = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/" + ref.equipment.bud[1] + ".jpg";
						img.style.width = "120px";
						add_to(div, "br");
						let txt = add_to(
							div,
							"span",
							{
								cls:["tool-block"],
								innertext:"" + ref.stat_met + " / 5"
							}
						);
						txt.style.width = "120px";
						txt.style.textAlign = "center";
					}
					else // there is an existing node
					{
						const nodes = children[i].children;
						// children list: img img br img br img br span
						let new_url; // only update src if needed
						if(ref.equipment.hid == "0")
							new_url = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/empty_1.jpg";
						else
							new_url = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/" + ref.equipment.hid + ".jpg";
						if(nodes[0].src != new_url)
							nodes[0].src = new_url;
						if(ref.equipment.aid == "0")
							new_url = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/empty_2.jpg";
						else
							new_url = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/item/cosmetic/s/" + ref.equipment.aid + ".jpg";
						if(nodes[1].src != new_url)
							nodes[1].src = new_url;
						if(ref.equipment.bud[0] == null)
							new_url = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/empty.jpg";
						else
							new_url = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/" + ref.equipment.bud[0] + ".jpg";
						if(nodes[3].src != new_url)
							nodes[3].src = new_url;
						if(ref.equipment.bud[1] == null)
							new_url = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/empty.jpg";
						else
							new_url = "https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_low/sp/vyrnsampo/assets/character/thumb/" + ref.equipment.bud[1] + ".jpg";
						if(nodes[5].src != new_url)
							nodes[5].src = new_url;
						nodes[7].innerText = "" + ref.stat_met + " / 5";
					}
				}
			}
			update_next_frame(() => {
				let diff = children.length - Math.min(10, zone_results.length);
				if(diff < 0)
				{
					// add new nodes if any
					block.appendChild(frag);
				}
				else
				{
					// remove extra nodes
					while(diff > 0)
					{
						block.lastChild.remove();
						--diff;
					}
				}
			});
		}
	}
	
	result_sort(a, b)
	{
		let diff = b.stat_met - a.stat_met;
		if(diff != 0)
			return diff;
		diff = b.boosts.success + b.boosts.req - (a.boosts.success + a.boosts.req);
		if(diff != 0)
			return diff;
		const list = (a.stat_met == 5) ? ["maxdrop", "exp"] : ["stall", "exp", "maxdrop"];
		for(const attr of list)
		{
			diff = b.boosts[attr] - a.boosts[attr];
			if(diff != 0)
				return diff;
		}
		return 0;
	}
	
	load()
	{
		try
		{
			const data = localStorage.getItem(AdvyrntureOptimizer.c_storage_key);
			if(data != null)
			{
				this.data = JSON.parse(data);
				this.level.value = "" + (this.data.lvl-1);
				for(const zone of AdvyrntureOptimizer.c_zones)
				{
					this.elements["zone-" + zone.id].img.classList.toggle("effect-dim", zone.unlock > this.data.lvl);
				}
				for(const [buddy, bonus] of Object.entries(this.data.buddy))
				{
					if(bonus)
					{
						this.elements["buddy-"+buddy].img.classList.toggle("effect-dim", false);
						this.elements["buddy-"+buddy].txt.innerText = "+" + bonus;
					}
					else
					{
						this.elements["buddy-"+id].img.classList.toggle("effect-dim", true);
						this.elements["buddy-"+id].txt.innerText = "Locked";
					}
				}
				for(const key of ["helm", "arm"])
				{
					for(const [id, has] of Object.entries(this.data[key]))
					{
						this.elements[key+"-"+id].img.classList.toggle("effect-dim", !has);
					}
				}
			}
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
			this.data = {lvl:1,buddy:{},helm:{},arm:{}};
		}
		this.set_save_pending(false);
	}
	
	reload()
	{
		this.load();
	}
	
	save()
	{
		localStorage.setItem(AdvyrntureOptimizer.c_storage_key, JSON.stringify(this.data));
		push_popup("Your progress is saved.");
		this.set_save_pending(false);
	}
	
	static export_storage_data(obj)
	{
		try
		{
			const data = localStorage.getItem(AdvyrntureOptimizer.c_storage_key);
			if(data != null)
			{
				obj[AdvyrntureOptimizer.c_storage_key] = data;
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
			localStorage.setItem(AdvyrntureOptimizer.c_storage_key, obj[AdvyrntureOptimizer.c_storage_key]);
		}
		catch(err)
		{
		}
	}
}

tool_constructors[AdvyrntureOptimizer.c_key] = AdvyrntureOptimizer;