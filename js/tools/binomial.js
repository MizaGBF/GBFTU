class BinomialCalculator extends ToolBase
{
	static c_key = Object.freeze("binomial");
	
	constructor()
	{
		super();
		this.key = BinomialCalculator.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"],
			innerhtml:"<b>Binomial Calculator</b>",
		}));
		this.inputs = [];
		
		add_to(this.tree[0], "br");
		
		const entries = ["Number of Tries","% of Success","Number of Success"];
		const default_values = ["300", "6", "18"];
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
			label.htmlFor = "binomial-" + i;
			
			let input = add_to(block, "input", {cls:["styled-input"], id:"spark-tracker-" + i});
			input.style.width = "200px";
			input.name = "binomial-" + i;
			input.type = "text";
			input.value = default_values[i];
			input.placeholder = "Number";
			this.inputs.push(input);
		}
		add_to(this.tree[0], "br", {br:true});
		add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Calculate",
				onclick:(() => {
					this.calculate();
				})
			}
		);
		add_to(this.tree[0], "br", {br:true});
		this.result = add_to(
			this.tree[0],
			"span",
			{innertext:"Set your values."}
		);
	}
	
	calculate()
	{
		let n, p, k;
		try
		{
			n = this.validate_tries();
			p = this.validate_chance();
			k = this.validate_target();
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
			return;
		}
		
		const mean = n * p;
		const std_deviation = Math.sqrt(n * p * (1 - p));
		
		let prob_less = 0;
		let prob_equal = 0;
		let prob_le = 0;
		
		for(let i = 0; i < k + 1; ++i)
		{
			let prob = this.mass_function(n, p, i);
			if(i < k)
				prob_less += prob;
			if(i == k)
				prob_equal = prob;
			prob_le += prob;
		}
		let prob_ge = 1.0 - prob_less;
		let prob_greater = 1.0 - prob_le;

		this.result.innerHTML = "<b>Results</b><ul>"
			+ "<li><b>" + k + "</b> successes: <b>" + this.format_percent(prob_equal) + "</b></li>"
			+ "<li><b>Less</b> than " + k + ": <b>" + this.format_percent(prob_less) + "</b></li>"
			+ "<li><b>Equal or Less</b> than " + k + ": <b>" + this.format_percent(prob_le) + "</b></li>"
			+ "<li><b>Greater</b> than " + k + ": <b>" + this.format_percent(prob_greater) + "</b></li>"
			+ "<li><b>Equal or Greater</b> than " + k + ": <b>" + this.format_percent(prob_ge) + "</b></li>"
			+ "<li><b>Average</b> success: <b>" + Math.floor(mean) + "</b></li>"
			+ "<li><b>Standard Deviation</b>: <b>±" + this.format_float(std_deviation) + "</b></li></ul>";
	}
	
	mass_function(n, p, k)
	{
		if(k < 0 || k > n)
			return 0;
		return this.combinations(n, k) * (p ** k) * ((1 - p) ** (n - k))
	}
	
	combinations(n, k) {
		// If k is greater than n, no combinations are possible.
		if(k > n)
		{
			return 0;
		}

		// take advantage of symmetry: C(n, k) === C(n, n - k).
		// this reduces the number of calculations needed if k > n/2.
		if(k > n / 2)
		{
			k = n - k;
		}

		// if k is 0, there is only one way to choose (the empty set).
		if(k === 0)
		{
			return 1;
		}

		// C(n, k) = (n * (n-1) * ... * (n-k+1)) / k!
		// this method avoids calculating large factorials directly, which can lead to overflow.
		let result = 1;
		for(let i = 1; i <= k; i++)
		{
			result *= (n - i + 1) / i;
		}

		//return Math.round(result);
		return result;
	}
	
	validate_tries()
	{
		const str = this.inputs[0].value;
		if(isNaN(str) || isNaN(parseFloat(str)))
		{
			push_popup("Number of Tries must be an integer");
			throw new Error("Number of Tries isn't an integer");
		}
		let i = parseInt(str);
		if(i <= 0)
		{
			push_popup("Number of Tries must be greater than 0");
			throw new Error("Number of Tries is lesser or equal to 0");
		}
		return i;
	}
	
	validate_chance()
	{
		const str = this.inputs[1].value;
		if(isNaN(str) || isNaN(parseFloat(str)))
		{
			push_popup("Chance of Success must be a valid number");
			throw new Error("Chance of Success isn't a float");
		}
		let f = parseFloat(str);
		if(f < 0 || f > 100)
		{
			push_popup("Chance of Success must be between 0 and 1");
			throw new Error("Chance of Success isn't in the 0-1 range");
		}
		return f / 100;
	}
	
	validate_target()
	{
		const str = this.inputs[2].value;
		if(isNaN(str) || isNaN(parseFloat(str)))
		{
			push_popup("Number of Success must be an integer");
			throw new Error("Number of Success isn't an integer");
		}
		let i = parseInt(str);
		if(i <= 0)
		{
			push_popup("Number of Success must be greater than 0");
			throw new Error("Number of Success is lesser or equal to 0");
		}
		return i;
	}
	
	format_float(f)
	{
		return "" + (Math.floor(f * 1000) / 1000);
	}
	
	format_percent(f)
	{
		return "" + (Math.floor(f * 100000) / 1000) + "%";
	}
}

tool_constructors[BinomialCalculator.c_key] = BinomialCalculator;