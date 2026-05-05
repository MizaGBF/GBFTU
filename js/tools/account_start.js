class AccountStart extends ToolBase
{
	static c_name = Object.freeze("Account Start");
	static c_key = Object.freeze("account-start");
	
	// source: https://docs.google.com/spreadsheets/d/1yhs0fitj60tS_tEvy2zKEhXr8NV4qjNcAouuA13Tz8c/preview
	static c_points = [
		{date:new Date("2014-03-10"), id:0},
		{date:new Date("2014-09-03"), id:1539030},
		{date:new Date("2015-05-19"), id:3959020},
		{date:new Date("2015-11-16"), id:6499925},
		{date:new Date("2016-01-01"), id:7500000},
		{date:new Date("2016-02-15"), id:9130310},
		{date:new Date("2016-03-30"), id:10336570},
		{date:new Date("2016-04-16"), id:10762030},
		{date:new Date("2016-04-19"), id:10837060},
		{date:new Date("2016-08-06"), id:12453695},
		{date:new Date("2016-08-22"), id:12671036},
		{date:new Date("2016-09-11"), id:13152390},
		{date:new Date("2016-10-15"), id:13491320},
		{date:new Date("2017-02-21"), id:15356190},
		{date:new Date("2017-06-08"), id:17525270},
		{date:new Date("2017-08-01"), id:18207190},
		{date:new Date("2017-09-24"), id:19197490},
		{date:new Date("2017-10-21"), id:19438820},
		{date:new Date("2017-12-30"), id:20481752},
		{date:new Date("2018-01-16"), id:20872710},
		{date:new Date("2018-03-09"), id:21341630},
		{date:new Date("2018-04-04"), id:22466435},
		{date:new Date("2018-06-16"), id:23096720},
		{date:new Date("2018-07-01"), id:23214000},
		{date:new Date("2018-07-13"), id:23310050},
		{date:new Date("2018-09-04"), id:24388535},
		{date:new Date("2018-12-25"), id:25216650},
		{date:new Date("2019-01-13"), id:25629610},
		{date:new Date("2019-02-12"), id:25864250},
		{date:new Date("2019-03-14"), id:26572130},
		{date:new Date("2019-03-26"), id:27226220},
		{date:new Date("2019-08-09"), id:29145210},
		{date:new Date("2019-10-06"), id:29680440},
		{date:new Date("2019-12-16"), id:30216980},
		{date:new Date("2020-01-05"), id:30753190},
		{date:new Date("2020-01-29"), id:30974830},
		{date:new Date("2020-02-14"), id:31056740},
		{date:new Date("2020-03-06"), id:31241060},
		{date:new Date("2020-04-15"), id:32050910},
		{date:new Date("2020-09-23"), id:33092570},
		{date:new Date("2020-12-22"), id:33856570},
		{date:new Date("2021-02-19"), id:34456420},
		{date:new Date("2021-08-05"), id:35471140},
		{date:new Date("2021-08-18"), id:35561920},
		{date:new Date("2021-09-07"), id:35663185},
		{date:new Date("2022-03-20"), id:36341060},
		{date:new Date("2022-06-09"), id:36658135},
		{date:new Date("2023-02-28"), id:37393240},
		{date:new Date("2024-01-01"), id:38150000},
		{date:new Date("2024-02-01"), id:38265190},
		{date:new Date("2024-02-29"), id:38389710},
		{date:new Date("2024-03-31"), id:38550650},
		{date:new Date("2024-06-01"), id:38658100},
		{date:new Date("2024-07-02"), id:38701540},
		{date:new Date("2024-07-31"), id:38740780},
		{date:new Date("2024-08-31"), id:38804040},
		{date:new Date("2024-10-01"), id:38841540},
		{date:new Date("2024-11-01"), id:38877690},
		{date:new Date("2024-12-01"), id:38918470},
		{date:new Date("2025-01-01"), id:38984180},
		{date:new Date("2025-01-31"), id:39036611},
		{date:new Date("2025-02-28"), id:39082303},
		{date:new Date("2025-04-01"), id:39159640},
		{date:new Date("2025-05-01"), id:39192656},
		{date:new Date("2025-06-01"), id:39223044},
		{date:new Date("2025-07-01"), id:39250299},
		{date:new Date("2025-08-01"), id:39279525},
		{date:new Date("2025-09-01"), id:39343619},
		{date:new Date("2025-10-01"), id:39374249},
		{date:new Date("2025-11-01"), id:39410605},
		{date:new Date("2025-12-01"), id:39454082},
		{date:new Date("2026-01-01"), id:39521864},
		{date:new Date("2026-02-01"), id:39580546},
		{date:new Date("2026-03-01"), id:39618564},
		{date:new Date("2026-03-10"), id:39633732},
		{date:new Date("2026-04-01"), id:39768698},
		{date:new Date("2026-05-01"), id:39819330},
	];
	static c_last_update = "2026-05-05";
	
	constructor()
	{
		super();
		this.key = AccountStart.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		add_to(
			this.tree[0],
			"span",
			{innertext:"Account ID"}
		);
		const input = add_to(
			this.tree[0],
			"input",
			{cls:["styled-input"]}
		);
		input.style.width = "400px";
		input.type = "text";
		input.placeholder = "Account ID";
		input.oninput = () => {
			const input_value = input.value;
			if(
				/^\d+$/.test(input_value.trim().toString())
				&& parseInt(input_value) >= 0
			)
			{
				const result = this.estimate(parseInt(input_value));
				this.result.innerText = "Account estimated to have been created around " + this.date2str(result.estimate) + "\n" + result.confidence;
			}
		}
		add_to(this.tree[0], "br");
		this.result = add_to(
			this.tree[0],
			"span",
			{innertext:"Input an account ID to get an estimation of its creation date."}
		);
		add_to(this.tree[0], "br");
		add_to(this.tree[0], "br");
		add_to(
			this.tree[0],
			"span"
		).innerHTML = "Based on <a href=\"https://docs.google.com/spreadsheets/d/1yhs0fitj60tS_tEvy2zKEhXr8NV4qjNcAouuA13Tz8c/preview\">my census</a> - Tool last updated: <b>" + AccountStart.c_last_update + "</b><br/>(Note: The precision is higher for recent years)";
	}
	
	date2str(d)
	{
		return d.getFullYear() + "/" + JSON.stringify(d.getMonth() + 1).padStart(2, "0") + "/" + JSON.stringify(d.getDate()).padStart(2, "0");
	}
	
	estimate(target_id)
	{
		const points = AccountStart.c_points;
		let lower = null;
		let upper = null;

		for(let i = 0; i < points.length; i++)
		{
			if(points[i].id === target_id)
			{
				return { 
					estimate:points[i].date, 
					confidence:"(The account was created on that day)"
				};
			}
			if(points[i].id < target_id)
			{
				lower = points[i];
			}
			else
			{
				upper = points[i];
				break;
			}
		}
		if(!lower || !upper)
		{
			return this.extrapolate(target_id, lower, upper);
		}
		const id_range = upper.id - lower.id;
		const time_range = upper.date.getTime() - lower.date.getTime();
		const progress = (target_id - lower.id) / id_range;
		const estimated_timestamp = lower.date.getTime() + (time_range * progress);
		return {
			estimate: new Date(estimated_timestamp),
			confidence:"(With certainty between " + this.date2str(lower.date) + " and " + this.date2str(upper.date) + ")"
		};
	}
	
	extrapolate(target_id, lower, upper)
	{
		const points = AccountStart.c_points;
		const ref1 = lower ? points[points.length - 2] : points[0];
		const ref2 = lower ? points[points.length - 1] : points[1];
		
		const delta = ref2.id - ref1.id;
		const time_delta = ref2.date.getTime() - ref1.date.getTime();
		const rate = time_delta / delta;

		const diff = target_id - ref2.id;
		const estimated_timestamp = ref2.date.getTime() + (diff * rate);

		return {
			estimate: new Date(estimated_timestamp),
			confidence: "(Extrapolated)",
		};
	}
}

tool_constructors[AccountStart.c_key] = AccountStart;