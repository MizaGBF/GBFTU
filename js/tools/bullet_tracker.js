class BulletTracker extends ToolBase
{
	static c_name = Object.freeze("Bullet Tracker");
	static c_key = Object.freeze("bullet-tracker");
	static c_storage_key = Object.freeze("gbftu-bullet-tracker");
	static c_bullets = Object.freeze({
		// iron
		"10101":[{}, {"34":2,"15":2}, {}],
		"10102":[{"10101":1}, {"34":5,"15":5}, {}],
		"10103":[{"10102":2}, {"34":12,"15":8,"5":5}, {}],
		"10104":[{"10103":3}, {"34":25,"15":20,"69":20}, {}],
		"10105":[{"10103":2,"10104":3}, {"34":40,"15":3}, {}],
		// rapid
		"10201":[{}, {"34":2,"69":2,"71":3}, {}],
		"10202":[{"10201":1}, {"34":4,"69":4,"71":7}, {}],
		"10203":[{"10202":2}, {"34":20,"69":20,"71":20}, {}],
		"10204":[{"10203":2}, {"34":30,"69":30,"71":25}, {}],
		// status 1
		"10301":[{"10101":5}, {"1011":10,"1313":7,"69":5}, {}],
		"10401":[{"10101":5}, {"1021":10,"1323":7,"69":5}, {}],
		"10501":[{"10101":5}, {"1041":10,"1343":7,"69":5}, {}],
		"10601":[{"10101":5}, {"1031":10,"1333":7,"69":5}, {}],
		"10701":[{"10202":3}, {"1353":20,"28":10,"69":10}, {}],
		"10801":[{"10105":1,"10204":1}, {"79":2,"120":5}, {}],
		"10901":[{"10105":1,"10204":1}, {"107":2,"120":5}, {}],
		// status 2
		"11001":[{"10102":1}, {"111":10,"101":30}, {}],
		"11101":[{"10102":1}, {"112":10,"102":30}, {}],
		"11201":[{"10102":1}, {"115":10,"105":30}, {}],
		"11301":[{"10102":1}, {"112":10,"102":30}, {}],
		// FMJ
		"20101":[{}, {"34":3,"52":3,"9":7,"1032":2}, {}],
		"20102":[{"20101":1}, {"34":7,"9":10,"1032":5}, {}],
		"20103":[{"20102":2}, {"34":12,"71":10,"5":12}, {}],
		"20104":[{"20103":5}, {"34":25,"71":20,"52":25}, {}],
		"20105":[{"20104":5}, {"34":30,"71":25,"52":30}, {}],
		// exploder
		"20201":[{"20101":3}, {"70":4,"4":7,"15":4}, {}],
		"20202":[{"20201":1}, {"70":8,"4":10,"15":8}, {}],
		"20203":[{"20202":2}, {"70":8,"4":15,"15":15}, {}],
		// piercing
		"20301":[{"20102":3}, {"34":5,"9":5,"14":10}, {}],
		"20302":[{"20301":1}, {"34":8,"9":8,"14":14}, {}],
		"20303":[{"20302":2}, {"34":18,"9":24,"14":20}, {}],
		// silver
		"20401":[{"20102":3}, {"1202":8,"1333":20,"29":5}, {}],
		"20402":[{"20401":7}, {"1202":20,"1333":30,"29":10}, {}],
		"20403":[{"20402":10}, {"1202":30,"1333":40,"29":20}, {}],
		// gold
		"20501":[{"20401":10,"20105":2}, {"137":1}, {}],
		"20502":[{"20501":2}, {"125":5,"137":5,"145":5}, {}],
		// expert
		"20601":[{"20105":3}, {"538":150,"203":10}, {}],
		"20701":[{"20105":3}, {"555":150,"203":10}, {}],
		"20801":[{"20105":3}, {"570":150,"203":10}, {}],
		"20901":[{"20105":3}, {"572":150,"203":10}, {"20004":1}],
		"21001":[{"20801":3}, {"592":200,"215":3}, {"20004":1}],
		"21101":[{"20601":3}, {"593":200,"215":3}, {"20004":1}],
		// shotshell
		"30101":[{}, {"69":4,"70":5,"15":5}, {}],
		"30102":[{"30101":1}, {"69":7,"70":5,"15":7}, {}],
		"30103":[{"30102":2}, {"69":10,"70":10,"15":10}, {}],
		"30104":[{"30103":5}, {"69":20,"70":30,"15":20}, {}],
		"30105":[{"30104":5}, {"69":30,"70":40,"15":30}, {}],
		// strike shell
		"30201":[{}, {"69":7,"70":15,"15":5}, {}],
		"30202":[{"30201":1}, {"69":10,"70":20,"15":16}, {}],
		// fire cylinder
		"30301":[{}, {"54":2,"70":5,"1313":30}, {}],
		"30302":[{"30301":1}, {"54":5,"70":10,"47":5}, {}],
		// water cylinder
		"30401":[{}, {"54":2,"70":5,"1323":30}, {}],
		"30402":[{"30401":1}, {"54":5,"70":10,"48":5}, {}],
		// earth cylinder
		"30501":[{}, {"54":2,"70":5,"1333":30}, {}],
		"30502":[{"30501":1}, {"54":5,"70":10,"49":5}, {}],
		// wind cylinder
		"30601":[{}, {"54":2,"70":5,"1343":30}, {}],
		"30602":[{"30601":1}, {"54":5,"70":10,"32":5}, {}],
		// light cylinder
		"30701":[{}, {"54":2,"70":5,"1353":30}, {}],
		"30702":[{"30701":1}, {"54":5,"70":10,"50":5}, {}],
		// dark cylinder
		"30801":[{}, {"54":2,"70":5,"1363":30}, {}],
		"30802":[{"30801":1}, {"54":5,"70":10,"51":5}, {}],
		// guard breaker
		"30901":[{"20301":5,"20302":5}, {"71":10,"69":20}, {}],
		"30902":[{"30901":1}, {"71":24,"70":20}, {}],
		// slug shot
		"31001":[{"10103":5,"20103":5}, {"71":20,"69":20}, {}],
		"31002":[{"31001":1}, {"71":70,"70":20}, {}],
		// sticky shell
		"31101":[{"20301":5,"20301":5}, {"71":10,"121":8}, {}],
		"31102":[{"31101":10}, {"71":20,"121":15}, {}],
		// special shell
		"31201":[{"30105":2}, {"148":10,"124":10,"533":5}, {}],
		"31301":[{"30105":2}, {"128":10,"146":10,"533":5}, {}],
		// raid shell
		"31401":[{"30105":1}, {"79":300}, {}],
		"31501":[{"30105":1}, {"534":300}, {}],
		"31601":[{"30105":1}, {"546":300}, {}],
		// expert
		"31701":[{"31401":1,"31501":1,"31601":1}, {"593":100}, {}],
		// ifrit
		"40101":[{}, {"1011":20,"1012":10,"1313":20,"10018":20}, {}],
		"40102":[{"40101":2}, {"1311":24,"1312":12,"1111":16}, {}],
		"40103":[{"40102":5}, {"41":20,"5011":10,"1111":20}, {}],
		// cocytus
		"40201":[{}, {"1021":20,"1022":10,"1323":20,"10005":20}, {}],
		"40202":[{"40201":2}, {"1321":24,"1322":12,"1121":16}, {}],
		"40203":[{"40202":5}, {"42":20,"5021":10,"1121":20}, {}],
		// vohu
		"40301":[{}, {"1031":20,"1032":10,"1333":20,"10011":20}, {}],
		"40302":[{"40301":2}, {"1331":24,"1332":12,"1131":16}, {}],
		"40303":[{"40302":5}, {"43":20,"5031":10,"1131":20}, {}],
		// sagittarius
		"40401":[{}, {"1041":20,"1042":10,"1343":20,"10027":20}, {}],
		"40402":[{"40401":2}, {"1341":24,"1342":12,"1141":16}, {}],
		"40403":[{"40402":5}, {"44":20,"5041":10,"1141":20}, {}],
		// corow
		"40501":[{}, {"1051":20,"1052":10,"1353":20,"10046":20}, {}],
		"40502":[{"40501":2}, {"1351":24,"1352":12,"1151":16}, {}],
		"40503":[{"40502":5}, {"45":20,"5051":10,"1151":20}, {}],
		// diablo
		"40601":[{}, {"1061":20,"1062":10,"1363":20,"10065":20}, {}],
		"40602":[{"40601":2}, {"1361":24,"1362":12,"1161":16}, {}],
		"40603":[{"40602":5}, {"46":20,"5061":10,"1161":20}, {}],
		// agni
		"40701":[{"40102":3}, {"20711":5,"40":7}, {}],
		"40702":[{"40701":1}, {"20711":7,"5011":30,"5051":20}, {}],
		"40703":[{"40702":5}, {"101":20,"5011":20,"111":3}, {}],
		"40704":[{"40703":1}, {"557":100,"549":50,"547":30}, {}],
		// varuna
		"40801":[{"40202":3}, {"20721":5,"40":7}, {}],
		"40802":[{"40801":1}, {"20721":7,"5021":30,"5061":20}, {}],
		"40803":[{"40802":5}, {"102":20,"5021":20,"112":3}, {}],
		"40804":[{"40803":1}, {"558":100,"550":50,"547":30}, {}],
		// titan
		"40901":[{"40302":3}, {"20731":5,"40":7}, {}],
		"40902":[{"40901":1}, {"20731":7,"5031":30,"5061":20}, {}],
		"40903":[{"40902":5}, {"103":20,"5031":20,"113":3}, {}],
		"40904":[{"40903":1}, {"559":100,"551":50,"547":30}, {}],
		// zephyrus
		"41001":[{"40402":3}, {"20741":5,"40":7}, {}],
		"41002":[{"41001":1}, {"20741":7,"5041":30,"5051":20}, {}],
		"41003":[{"41002":5}, {"104":20,"5041":20,"114":3}, {}],
		"41004":[{"41003":1}, {"560":100,"552":50,"547":30}, {}],
		// zeus
		"41101":[{"40502":3}, {"20711":5,"20741":5,"40":7}, {}],
		"41102":[{"41101":1}, {"20711":7,"20741":7,"5051":20}, {}],
		"41103":[{"41102":5}, {"105":20,"5051":20,"115":3}, {}],
		"41104":[{"41103":1}, {"561":100,"553":50,"547":30}, {}],
		// hades
		"41201":[{"40602":3}, {"20721":5,"20731":5,"40":7}, {}],
		"41202":[{"41201":1}, {"20721":7,"20731":7,"5061":20}, {}],
		"41203":[{"41202":5}, {"106":20,"5061":20,"116":3}, {}],
		"41204":[{"41203":1}, {"562":100,"554":50,"547":30}, {}],
		// expert
		"41301":[{}, {"592":100,"547":200,"203":10,"215":1}, {}]
	});
	static c_layout = Object.freeze([
		["10101","10102","10103","10104","10105"],
		["10201","10202","10203","10204"],
		["10301","10401","10501","10601","10701","10801","10901"],
		["11001","11101","11201","11301"],
		["20101","20102","20103","20104","20105"],
		["20201","20202","20203"],
		["20301","20302","20303"],
		["20401","20402","20403"],
		["20501","20502"],
		["20601","20701","20801","20901","21001","21101"],
		["30101","30102","30103","30104","30105"],
		["30201","30202"],
		["30901","30902"],
		["31001","31002"],
		["31101","31102"],
		["31201","31301"],
		["31401","31501","31601"],
		["31701"],
		["30301","30302"],
		["30401","30402"],
		["30501","30502"],
		["30601","30602"],
		["30701","30702"],
		["30801","30802"],
		["40101","40102","40103"],
		["40201","40202","40203"],
		["40301","40302","40303"],
		["40401","40402","40403"],
		["40501","40502","40503"],
		["40601","40602","40603"],
		["40701","40702","40703","40704"],
		["40801","40802","40803","40804"],
		["40901","40902","40903","40904"],
		["41001","41002","41003","41004"],
		["41101","41102","41103","41104"],
		["41201","41202","41203","41204"],
		["41301"]
	]);
	constructor()
	{
		super();
		this.key = BulletTracker.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.data = {};
		this.elements = {};
		this.result_tree = [];
		
		this.add_save_button();
		
		this.tree[0].appendChild(document.createElement("br"));
		this.tree[0].appendChild(document.createTextNode("Left click and Right click to select the bullets that you need."));
		this.tree[0].appendChild(document.createElement("br"));
		this.tree[0].appendChild(document.createTextNode("Hold Shift to change by 10 at once."));
		this.tree[0].appendChild(document.createElement("br"));
		this.tree[0].appendChild(document.createTextNode("The total of what you need for the crafts is at the bottom."));
		this.tree[0].appendChild(document.createElement("br"));
		this.tree[0].appendChild(document.createTextNode("For mobile users:"));
		this.mobile = add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Decrease on touch",
				onclick:() => {
					this.mobile.classList.toggle("audio-button-enabled");
					this.mobile_bottom.classList.toggle("audio-button-enabled");
				}
			}
		);
		this.mobile.style.width = "250px";
		this.mobile_bottom = this.mobile.cloneNode();
		this.mobile_bottom.innerText = this.mobile.innerText;
		this.mobile_bottom.onclick = this.mobile.onclick;
		
		add_to(this.tree[0], "br");
		add_to(this.tree[0], "hr");
		
		let grid = add_to(this.tree[0], "div");
		grid.style.display = "grid";
		grid.style.gridTemplateColumns = "repeat(auto-fit, min(95%, 480px))";
		grid.style.gridAutoColumns = "min(95%, 480px)";
		
		for(const line of BulletTracker.c_layout)
		{
			let cell = add_to(grid, "div");
			cell.style.maxWidth = "min(95%, 480px)";
			for(const bullet of line)
			{
				let block = add_to(
					cell,
					"div",
					{
						cls:["tool-block", "tool-block-hover", "tool-block-active"]
					}
				);
				const img = add_to(
					block,
					"img",
					{
						cls:["tool-icon", "effect-dim"],
						br:true
					}
				);
				img.src = "https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/bullet/s/" + bullet + ".jpg";
				let txt = add_to(
					block,
					"span",
					{
						cls:["tool-block"],
						innertext:"0"
					}
				);
				txt.style.width = "100%";
				txt.style.textAlign = "center";
				// functions
				block.onclick = (event) => {
					let iter = event.shiftKey ? 10 : 1;
					for(let i = 0; i < iter; ++i)
					{
						if(this.mobile.classList.contains("audio-button-enabled"))
							this.sub(bullet)
						else
							this.add(bullet);
					}
					this.update();
					event.preventDefault();
				};
				block.oncontextmenu = (event) => {
					let iter = event.shiftKey ? 10 : 1;
					for(let i = 0; i < iter; ++i)
						this.sub(bullet);
					this.update();
					event.preventDefault();
				};
				this.elements[bullet] = {block:block, img:img, txt:txt};
			}
		}
		this.tree[0].appendChild(document.createElement("hr"));
		this.add_save_button();
		
		this.tree[0].appendChild(document.createElement("br"));
		this.tree[0].appendChild(document.createTextNode("For mobile users:"));
		this.tree[0].appendChild(this.mobile_bottom);
		this.tree[0].appendChild(document.createElement("br"));
		this.tree[0].appendChild(document.createTextNode("Below will appear:"));
		add_to(this.tree[0], "ul").innerHTML = "<li>The list of bullets that you selected (You can click as normal to modify the amount)</li>"
			+ "<li>The bullets needed to craft them (Click on them to add to the list)</li>"
			+ "<li>The list of materials required</li>";
		// result area
		let result = add_to(this.tree[0], "div");
		this.result_tree.push(add_to(result, "hr"));
		this.result_tree.push(add_to(result, "span", {innertext:"Selected Bullets"}));
		this.result_tree.push(add_to(result, "br"));
		this.result_tree.push(add_to(result, "span"));
		this.result_tree.push(add_to(result, "hr"));
		this.result_tree.push(add_to(result, "span", {innertext:"Bullets required in the craft"}));
		this.result_tree.push(add_to(result, "br"));
		this.result_tree.push(add_to(result, "span"));
		this.result_tree.push(add_to(result, "hr"));
		this.result_tree.push(add_to(result, "span", {innertext:"Total Material Cost"}));
		this.result_tree.push(add_to(result, "br"));
		this.result_tree.push(add_to(result, "span"));
		this.result_tree.push(add_to(result, "hr"));
		
		this.add_save_button();
		this.load();
	}
	
	static get_tool_save_info()
	{
		return {
			name: BulletTracker.c_name,
			key: BulletTracker.c_key,
			storage_key: BulletTracker.c_storage_key
		};
	}
	
	add(bullet)
	{
		if(!(bullet in this.data))
			this.data[bullet] = 0;
		++this.data[bullet];
		this.elements[bullet].img.classList.toggle("effect-dim", false);
		this.elements[bullet].txt.innerText = "" + this.data[bullet];
		this.set_save_pending(true);
	}
	
	sub(bullet)
	{
		if(!(bullet in this.data) || this.data[bullet] <= 0)
			return;
		--this.data[bullet];
		this.elements[bullet].txt.innerText = "" + this.data[bullet];
		if(this.data[bullet] == 0)
		{
			this.elements[bullet].img.classList.toggle("effect-dim", true);
			delete this.data[bullet];
		}
		this.set_save_pending(true);
	}
	
	update()
	{
		let dependancies = {};
		let loot = {};
		let evolution = {};
		let has_content = false;
		for(const [bullet, count] of Object.entries(this.data))
		{
			const data = BulletTracker.c_bullets[bullet];
			for(const [id, amount] of Object.entries(data[0]))
			{
				if(!(id in dependancies))
					dependancies[id] = 0;
				dependancies[id] += amount * count;
				has_content = true;
			}
			for(const [id, amount] of Object.entries(data[1]))
			{
				if(!(id in loot))
					loot[id] = 0;
				loot[id] += amount * count;
				has_content = true;
			}
			for(const [id, amount] of Object.entries(data[2]))
			{
				if(!(id in evolution))
					evolution[id] = 0;
				evolution[id] += amount * count;
				has_content = true;
			}
		}
		// render
		for(const elem of this.result_tree)
		{
			elem.style.display = has_content ? "" : "none";
		}
		if(has_content)
		{
			// needed for later
			const fragments = [
				document.createDocumentFragment(),
				document.createDocumentFragment(),
				document.createDocumentFragment()
			];
			const childrens = [
				Array.from(this.result_tree[3].children),
				Array.from(this.result_tree[7].children),
				Array.from(this.result_tree[11].children)
			];
			// hr
			// selected bullets
			for(let t = 0 ; t < 4; ++t)
				this.result_tree[t].style.display = "";
			let i = 0;
			for(const [bullet, count] of Object.entries(this.data))
			{
				if(i >= childrens[0].length) // we must create a new node
				{
					this.add_result(
						fragments[0], "sp/assets/bullet/s/", bullet, count,
						(event) => {
							let iter = event.shiftKey ? 10 : 1;
							for(let i = 0; i < iter; ++i)
							{
								if(this.mobile.classList.contains("audio-button-enabled"))
									this.sub(bullet)
								else
									this.add(bullet);
							}
							this.update();
							event.preventDefault();
						},
						(event) => {
							let iter = event.shiftKey ? 10 : 1;
							for(let i = 0; i < iter; ++i)
								this.sub(bullet);
							this.update();
							event.preventDefault();
						}
					);
				}
				else
				{
					this.modify_result(
						childrens[0][i].children,
						"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/bullet/s/" + bullet + ".jpg",
						count,
						(event) => {
							let iter = event.shiftKey ? 10 : 1;
							for(let i = 0; i < iter; ++i)
							{
								if(this.mobile.classList.contains("audio-button-enabled"))
									this.sub(bullet)
								else
									this.add(bullet);
							}
							this.update();
							event.preventDefault();
						},
						(event) => {
							let iter = event.shiftKey ? 10 : 1;
							for(let i = 0; i < iter; ++i)
								this.sub(bullet);
							this.update();
							event.preventDefault();
						}
					);
				}
				++i;
			}
			// dependant bullets
			let dependant_added = 0;
			for(const [bullet, count] of Object.entries(dependancies))
			{
				const final_count = count - (bullet in this.data ? this.data[bullet] : 0);
				if(final_count > 0)
				{
					if(dependant_added >= childrens[1].length) // we must create a new node
					{
						this.add_result(
							fragments[1], "sp/assets/bullet/s/", bullet, final_count,
							(event) => {
								let iter = Math.min(
									count - (bullet in this.data ? this.data[bullet] : 0),
									event.shiftKey ? 10 : 1
								);
								for(let i = 0; i < iter; ++i)
									this.add(bullet);
								this.update();
								event.preventDefault();
							},
							null
						);
					}
					else
					{
						this.modify_result(
							childrens[1][dependant_added].children,
							"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_low/sp/assets/bullet/s/" + bullet + ".jpg",
							final_count,
							(event) => {
								let iter = Math.min(
									count - (bullet in this.data ? this.data[bullet] : 0),
									event.shiftKey ? 10 : 1
								);
								for(let i = 0; i < iter; ++i)
									this.add(bullet);
								this.update();
								event.preventDefault();
							},
							null
						);
					}
					++dependant_added;
				}
			}
			if(dependant_added == 0)
			{
				for(let t = 4 ; t < 8; ++t)
					this.result_tree[t].style.display = "none";
			}
			// materials
			i = 0;
			for(const [entries, path] of [
				[loot, "sp/assets/item/article/s/"],
				[evolution, "sp/assets/item/evolution/s/"]
			])
			{
				for(const [id, count] of Object.entries(entries))
				{
					if(i >= childrens[2].length) // we must create a new node
					{
						this.add_result(fragments[2], path, id, count, null, null);
					}
					else
					{
						this.modify_result(
							childrens[2][i].children,
							"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_low/" + path + id + ".jpg",
							count,
							null,
							null
						);
					}
					++i;
				}
			}
			this.result_tree[12].style.display = "";
			// apply changes for each category
			for(const [i, j, datalen, childrenlen] of [
				[0, 3, Object.keys(this.data).length, childrens[0].length],
				[1, 7, dependant_added, childrens[1].length],
				[2, 11, Object.keys(loot).length + Object.keys(evolution).length, childrens[2].length]
			])
			{
				let diff = childrenlen - datalen;
				if(diff < 0)
				{
					// add new nodes if any
					this.result_tree[j].appendChild(fragments[i]);
				}
				else
				{
					// remove extra nodes
					while(diff > 0)
					{
						this.result_tree[j].lastChild.remove();
						--diff;
					}
				}
			}
		}
	}
	
	add_result(fragment, path, id, amount, onclick, oncontext)
	{
		let container = add_to(fragment, "span");
		container.style.display= "inline-block";
		container.style.width = "max-content";
		container.style.marginRight = "5px";
		let img = add_to(container, "img", {cls:["tool-icon"]});
		img.src = "https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_low/" + path + id + ".jpg";
		img.onclick = onclick;
		img.oncontextmenu = oncontext;
		add_to(container, "span", {innertext:" x" + amount});
	}
	
	modify_result(children, url, amount, onclick, oncontext)
	{
		if(url != children[0].src)
		{
			children[0].src = url;
			children[0].onclick = onclick;
			children[0].oncontextmenu = oncontext;
		}
		children[1].innerText = " x" + amount;
	}
	
	load()
	{
		try
		{
			const data = localStorage.getItem(BulletTracker.c_storage_key);
			if(data != null)
			{
				this.data = JSON.parse(data);
				for(const [bullet, amount] of Object.entries(this.data))
				{
					if(!(bullet in BulletTracker.c_bullets) || amount <= 0)
					{
						delete this.data[bullet];
					}
					else
					{
						this.add(bullet);
						this.sub(bullet);
					}
				}
			}
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
			this.data = {};
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
		localStorage.setItem(BulletTracker.c_storage_key, JSON.stringify(this.data));
		push_popup("Your changes are saved.");
		this.set_save_pending(false);
	}
	
	static export_storage_data(obj)
	{
		try
		{
			const data = localStorage.getItem(BulletTracker.c_storage_key);
			if(data != null)
			{
				obj[BulletTracker.c_storage_key] = data;
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
			localStorage.setItem(BulletTracker.c_storage_key, obj[BulletTracker.c_storage_key]);
		}
		catch(err)
		{
		}
	}
}

tool_constructors[BulletTracker.c_key] = BulletTracker;