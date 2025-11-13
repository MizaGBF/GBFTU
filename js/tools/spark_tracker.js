class SparkTracker extends ToolBase
{
	static c_key = Object.freeze("spark-tracker");
	static c_storage_key = Object.freeze("gbftu-spark-tracker");
	
	constructor()
	{
		super();
		this.key = SparkTracker.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.last_run = null;
		this.inputs = [];
		
		const entries = ["crystal","singledraw","tendraw","shrimp"];
		for(let i = 0; i < entries.length; ++i)
		{
			let block = add_to(this.tree[0], "div", {cls:["tool-block"]});
			add_to(block, "img", {cls:["tab-button-icon"]}).src = "assets/ui/spark_tracker/" + entries[i] + ".png";
			let input = add_to(block, "input", {cls:["styled-input"], id:"spark-tracker-" + i});
			input.style.width = "200px";
			input.type = "text";
			input.value = "0";
			input.placeholder = "Number";
			input.onkeyup = (() => {
				this.set_save_pending(true);
				this.calculate();
			});
			this.inputs.push(input);
		}
		add_to(this.tree[0], "br", {br:true});
		this.result = add_to(
			this.tree[0],
			"span",
			{innertext:"Set your values."}
		);
		add_to(this.tree[0], "br", {br:true});
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
	}
	
	static get_tool_save_info()
	{
		return {
			name: "Spark Tracker",
			key: SparkTracker.c_key,
			storage_key: SparkTracker.c_storage_key
		};
	}
	
	calculate(timestamp = null)
	{
		try
		{
			let roll = this.parse(this.inputs[0].value) / 300
				+ this.parse(this.inputs[1].value)
				+ this.parse(this.inputs[2].value) * 10
				+ this.parse(this.inputs[3].value);
			
			let now = (timestamp == null) ? new Date() : new Date(timestamp);
			let t_min = new Date(now.valueOf());
			let t_max = new Date(now.valueOf());
			let r_min = roll % 300;
			let r_max = r_min;
			
			const month_min = [90, 90, 140, 100, 80, 80, 110, 190, 100, 90, 90, 130];
			const month_max = [80, 70, 110, 80, 60, 70, 70, 150, 80, 50, 70, 110];
			const month_day = [31.0, 28.25, 31.0, 30.0, 31.0, 30.0, 31.0, 31.0, 30.0, 31.0, 30.0, 31.0];
			const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			
			let expected = [month_max[now.getMonth()], month_min[now.getMonth()]];
			
			while(r_min < 300 || r_max < 300)
			{
				let m;
				if(r_min < 300)
				{
					m = t_min.getMonth();
					r_min += month_min[m] / month_day[m];
					t_min.setDate(t_min.getDate() + 1);
				}
				if(r_max < 300)
				{
					m = t_max.getMonth();
					r_max += month_max[m] / month_day[m];
					t_max.setDate(t_max.getDate() + 1);
				}
			}
			
			this.result.innerHTML = now.toISOString().split("T")[0] + ": You own " + (Math.floor(roll * 100) / 100) + " rolls.<br>"
				+ "Next spark between " + t_min.toISOString().split("T")[0] + " and " + t_max.toISOString().split("T")[0] + ".<br>"
				+ "Expecting between " + expected[0] + " and " + expected[1] + " rolls in " + monthNames[now.getMonth()] + ".";
			this.last_run = [
				this.inputs[0].value,
				this.inputs[1].value,
				this.inputs[2].value,
				this.inputs[3].value,
				now.getTime()
			]
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
			this.last_run = null;
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
			const data = localStorage.getItem(SparkTracker.c_storage_key);
			if(data != null)
			{
				this.last_run = JSON.parse(data);
				this.inputs[0].value = this.last_run[0];
				this.inputs[1].value = this.last_run[1];
				this.inputs[2].value = this.last_run[2];
				this.inputs[3].value = this.last_run[3];
				this.calculate(this.last_run[4]);
			}
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
			this.last_run = null;
		}
		this.set_save_pending(false);
	}
	
	reload()
	{
		this.load();
	}
	
	save()
	{
		if(this.last_run == null)
		{
			push_popup("Set your progress before saving.");
		}
		else
		{
			localStorage.setItem(SparkTracker.c_storage_key, JSON.stringify(this.last_run));
			push_popup("Your changes are saved.");
			this.set_save_pending(false);
		}
	}
	
	static export_storage_data(obj)
	{
		try
		{
			const data = localStorage.getItem(SparkTracker.c_storage_key);
			if(data != null)
			{
				obj[SparkTracker.c_storage_key] = data;
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
			localStorage.setItem(SparkTracker.c_storage_key, obj[SparkTracker.c_storage_key]);
		}
		catch(err)
		{
		}
	}
}

tool_constructors[SparkTracker.c_key] = SparkTracker;