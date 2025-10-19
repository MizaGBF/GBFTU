class KirinCalculator extends ToolBase
{
	static c_key = Object.freeze("kirin-calc");
	static c_storage_key = Object.freeze("gbftu-kirin-calc");
	static c_assets = Object.freeze([
		"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/item/article/s/206.jpg",
		"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/item/article/s/207.jpg",
		"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/item/article/s/528.jpg",
		"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/item/article/s/529.jpg",
		
		"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/item/article/s/208.jpg",
		"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/item/article/s/209.jpg",
		"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/item/article/s/530.jpg",
		"https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/item/article/s/531.jpg"
	]);
	
	constructor()
	{
		super();
		this.key = KirinCalculator.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.inputs = [];
		this.results = [];
		
		for(let j = 0; j < 2; ++j)
		{
			const t = j;
			for(let i = 0; i < 4; ++i)
			{
				let block = add_to(this.tree[0], "div", {cls:["tool-block"]});
				add_to(block, "img", {cls:["tab-button-icon"]}).src = KirinCalculator.c_assets[i + j * 4];
				let input = add_to(block, "input", {cls:["styled-input"], id:"kirin-calc-" + i});
				input.style.width = "200px";
				input.type = "text";
				input.value = "0";
				input.placeholder = "Number";
				input.onkeyup = (() => {
					this.calculate(t);
				});
				this.inputs.push(input);
			}
			add_to(this.tree[0], "br", {br:true});
			let result = add_to(
				this.tree[0],
				"span"
			);
			result.appendChild(document.createTextNode("You own a total of "));
			this.results.push(add_to(
				result,
				"div",
				{
					cls:["tool-block"]
				}
			));
			this.results[j].innerText = "0";
			result.appendChild(document.createTextNode(" " + (j ? "Qilin" : "Huanglong") + " Omega Animas"));
			if(j == 0)
				add_to(this.tree[0], "br");
		}
		add_to(this.tree[0], "br", {br:true});
		add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Save",
				onclick:(() => {
					this.save();
				})
			}
		);
		this.load();
	}
	
	calculate(i)
	{
		try
		{
			this.results[i].innerText = ""
			+ (
				Math.floor(
					(Math.floor(this.parse(this.inputs[0 + i * 4].value) / 5)
					+ this.parse(this.inputs[1 + i * 4].value)
					+ this.parse(this.inputs[2 + i * 4].value)
				) / 10)
				+ this.parse(this.inputs[3 + i * 4].value)
			);
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
		}
	}
	
	parse(str)
	{
		if(isNaN(str) || isNaN(parseFloat(str)))
			throw new Error(str + " isn't an integer");
		let i = parseInt(str);
		if(i < 0)
			throw new Error(str + " is negative");
		return i;
	}
	
	load()
	{
		try
		{
			const data = localStorage.getItem(KirinCalculator.c_storage_key);
			if(data != null)
			{
				let d = JSON.parse(data);
				for(let i = 0; i < d.length; ++i)
					this.inputs[i].value = d[i];
				this.calculate(0);
				this.calculate(1);
			}
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
			this.last_run = null;
		}
	}
	
	reload()
	{
		this.load();
	}
	
	save()
	{
		localStorage.setItem(KirinCalculator.c_storage_key, JSON.stringify([
			this.inputs[0].value,
			this.inputs[1].value,
			this.inputs[2].value,
			this.inputs[3].value,
			this.inputs[4].value,
			this.inputs[5].value,
			this.inputs[6].value,
			this.inputs[7].value
		]));
		push_popup("Your progress is saved.");
	}
	
	static export_storage_data(obj)
	{
		try
		{
			const data = localStorage.getItem(KirinCalculator.c_storage_key);
			if(data != null)
			{
				obj[KirinCalculator.c_storage_key] = data;
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
			localStorage.setItem(KirinCalculator.c_storage_key, obj[KirinCalculator.c_storage_key]);
		}
		catch(err)
		{
		}
	}
}

tool_constructors[KirinCalculator.c_key] = KirinCalculator;