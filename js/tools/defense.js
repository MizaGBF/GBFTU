class DefenseCalculator extends ToolBase
{
	static c_key = Object.freeze("defense");
	
	constructor()
	{
		super();
		this.key = DefenseCalculator.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		let block = add_to(this.tree[0], "div", {cls:["tool-block"]});
		let label = add_to(
			block,
			"label",
			{
				innertext:"Defense Buff (%)"
			}
		);
		label.for = "defense-input";
		this.input = add_to(block, "input", {cls:["styled-input"], id:"defense-input"});
		this.input.style.width = "200px";
		this.input.type = "text";
		this.input.value = "0";
		this.input.placeholder = "Number";
		this.input.onkeyup = (() => {
			this.calculate();
		});
		add_to(this.tree[0], "br", {br:true});
		this.result = add_to(
			this.tree[0],
			"span",
			{
				innerhtml:"<b>Example:</b><br>Base Damage: 100000<br>Final Damage: 100000"
			}
		);
	}
	
	calculate()
	{
		try
		{
			let f = parseFloat(this.input.value);
			if(isNaN(f))
			{
				throw new Error("The input isn't a valid float");
			}
			else if(f < -99)
			{
				throw new Error("The input is under the lower limit");
			}
			f /= 100; // percent conversion
			f = 1 / (1 + f);
			f = (Math.floor(f * 10000) / 10000);
			if(f > 1)
			{
				this.result.innerHTML = "<b>Example:</b><br>Base Damage: 100000<br>Final Damage: " + Math.round(100000 * f) + "<br>Damage are increased: x" + f;
			}
			else if(f < 1)
			{
				this.result.innerHTML = "<b>Example:</b><br>Base Damage: 100000<br>Final Damage: " + Math.round(100000 * f) + "<br>Damage are reduced: x" + f;
			}
			else
			{
				this.result.innerHTML = "<b>Example:</b><br>Base Damage: 100000<br>Final Damage: 100000";
			}
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
		}
	}
}

tool_constructors[DefenseCalculator.c_key] = DefenseCalculator;