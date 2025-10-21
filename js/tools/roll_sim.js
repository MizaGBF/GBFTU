class RollSimulator extends ToolBase
{
	static c_key = Object.freeze("roll-sim");
	
	constructor()
	{
		super();
		this.key = RollSimulator.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"],
			innerhtml:"<b>Gacha Simulator</b>",
		}));
		this.inputs = [];
		
		add_to(this.tree[0], "br");
		
		const entries = ["Number of Draws","SSR Rate (%)","Rate Up (%)"];
		const default_values = ["300", "6", "0.3"];
		for(let i = 0; i < entries.length; ++i)
		{
			let block = add_to(
				this.tree[0],
				"div",
				{
					cls:["tool-block"]
				}
			);
			let label = add_to(
				block,
				"label",
				{
					cls:["tool-label"],
					innertext:entries[i]
				}
			);
			label.htmlFor = "gacha-sim-" + i;
			
			let input = add_to(block, "input", {cls:["styled-input"], id:"spark-tracker-" + i});
			input.style.width = "200px";
			input.name = "gacha-sim-" + i;
			input.type = "text";
			input.value = default_values[i];
			input.placeholder = "Number";
			this.inputs.push(input);
		}
		add_to(this.tree[0], "br", {br:true});
		this.draw_button = add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Draw",
				onclick:(() => {
					this.simulate();
				})
			}
		);
		add_to(this.tree[0], "br", {br:true});
		this.result = add_to(
			this.tree[0],
			"span"
		);
		this.grid = null;
	}
	
	simulate()
	{
		let obj = {};
		try
		{
			obj.rates = [0, 0, 0, 100];
			obj.count = this.validate_tries();
			if(obj.count > 1000)
			{
				push_popup("The limit is 1000 draws");
				throw new Error("Over limited draw count");
			}
			obj.rates[1] = this.validate_chance(this.inputs[1].value, "SSR Rate (%)");
			obj.rates[0] = this.validate_chance(this.inputs[2].value, "Rate Up (%)");
			obj.rates[2] = obj.rates[1] + 15;
			if(obj.rates[0] > obj.rates[1])
			{
				push_popup("Rate Up (%) must be lesser or equal to SSR Rate (%)");
				throw new Error("Rate Up (%) is greater than SSR Rate (%)");
			}
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
			return;
		}
		this.inputs[0].disabled = true;
		this.inputs[1].disabled = true;
		this.inputs[2].disabled = true;
		this.draw_button.disabled = true;
		obj.done = 0;
		obj.ss_flag = false;
		obj.results = [0, 0, 0, 0];
		obj.delay = Math.min(200, 8000 / obj.count);
		
		this.result.innerHTML = "";
		this.grid = add_to(this.result, "div");
		this.grid.style.display = "grid";
		this.grid.style.gridTemplateColumns = "repeat(auto-fit, 400px)";
		this.grid.style.gridAutoColumns = "400px";
		this.step(obj);
	}
	
	step(obj)
	{
		// start of new ten series
		if(obj.done % 10 == 0)
		{
			let row = add_to(this.grid, "div");
			row.style.maxWidth = "400px";
			obj.ssr_flag = false;
		}
		// roll dice
		let dice;
		do
		{
			dice = Math.random() * 100;
			// while we don't have a SR or SSR in the ten series
		}while(obj.done % 10 == 9 && !obj.ssr_flag && dice >= obj.rates[2]);
		// check which roll we got
		for(let i = 0; i < obj.rates.length; ++i)
		{
			if(dice < obj.rates[i] || i == 3)
			{
				let img = add_to(this.grid.lastChild, "img");
				switch(i)
				{
					case 0:
					{
						obj.ssr_flag = true;
						img.src = "assets/ui/roll_sim/ssr_rateup.gif";
						++obj.results[0];
						break;
					}
					case 1:
					{
						obj.ssr_flag = true;
						img.src = "assets/ui/roll_sim/ssr.png";
						++obj.results[1];
						break;
					}
					case 2:
					{
						obj.ssr_flag = true;
						img.src = "assets/ui/roll_sim/sr.png";
						++obj.results[2];
						break;
					}
					default:
					{
						img.src = "assets/ui/roll_sim/r.png";
						++obj.results[3];
						break;
					}
				}
				img.style.animation = "pop-in 0.1s";
				break;
			}
		}
		++obj.done;
		// next
		if(obj.done < obj.count)
		{
			setTimeout(() => {
				this.step(obj)
			}, obj.delay);
		}
		else
		{
			// game is over
			this.result.innerHTML += "<b>Results</b><ul>"
				+ "<li><b>" + obj.count + "</b> draws</li>"
				+ "<li></b><img src=\"assets/ui/roll_sim/ssr.png\"> <b>" + (obj.results[0] + obj.results[1]) + "</b> SSR (" + this.format_percent((obj.results[0] + obj.results[1]) / obj.count) + "), <b>" + obj.results[0] + "</b> rate ups (" + this.format_percent(obj.results[0] / obj.count) + ")</li>"
				+ "<li></b><img src=\"assets/ui/roll_sim/sr.png\"> <b>" + obj.results[2] + "</b> SR (" + this.format_percent(obj.results[2] / obj.count) + ")</li>"
				+ "<li></b><img src=\"assets/ui/roll_sim/r.png\"> <b>" + obj.results[3] + "</b> R (" + this.format_percent(obj.results[3] / obj.count) + ")</li></ul>"
			
			this.inputs[0].disabled = false;
			this.inputs[1].disabled = false;
			this.inputs[2].disabled = false;
			this.draw_button.disabled = false;
		}
	}
	
	validate_tries()
	{
		const str = this.inputs[0].value;
		if(isNaN(str) || isNaN(parseFloat(str)))
		{
			push_popup("Number of Draws must be an integer");
			throw new Error("Number of Draws isn't an integer");
		}
		let i = parseInt(str);
		if(i <= 0)
		{
			push_popup("Number of Draws must be greater than 0");
			throw new Error("Number of Draws is lesser or equal to 0");
		}
		return i;
	}
	
	validate_chance(str, name)
	{
		if(isNaN(str) || isNaN(parseFloat(str)))
		{
			push_popup(name + " must be a valid number");
			throw new Error(name + " isn't a float");
		}
		let f = parseFloat(str);
		if(f < 0 || f > 100)
		{
			push_popup(name + " must be between 0 and 1");
			throw new Error(name + " isn't in the 0-1 range");
		}
		return f;
	}
	
	format_percent(f)
	{
		return "" + (Math.floor(f * 100000) / 1000) + "%";
	}
}

tool_constructors[RollSimulator.c_key] = RollSimulator;