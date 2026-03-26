class ScreenTester extends ToolBase
{
	static c_key = Object.freeze("screen-tester");
	
	constructor()
	{
		super();
		this.key = ScreenTester.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.start_button = null;
		this.output_area = null;
		
		// createjs
		this.canvas = null;
		this.m_stage = null;
		this.frame_data = null;
		
		load_script(
			"js/vendors/createjs-min.js",
			() => {
				this.init();
			}
		);
	}
	
	init()
	{
		this.start_button = add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:"Start Test",
				onclick:(() => {
					this.start();
				}),
				br:true
			}
		)
		this.start_button.style.margin = "auto";
		this.start_button.style.display = "block";
		this.start_button.style.width = "150px";

		this.output_area = add_to(
			this.tree[0],
			"div",
			{
				br:true
			}
		);
		this.output_area.style.margin = "auto";
		this.output_area.style.display = "block";
		this.output_area.style.width = "400px";
		
		const explanations = add_to(
			this.tree[0],
			"div"
		);
		explanations.innerHTML = '<details>\
			<summary class="detail sub-detail">&nbsp;&nbsp;&nbsp;&nbsp;Explanations</summary>\
			<h3>Credits</h3>\
			<p>This tool is based on <a href="https://eriri.net/gbf-delay/">Eriri\'s GBF Delay tool</a></p>\
			<h3>Explanations</h3>\
			<p>You might experience delays when playing Granblue Fantasy due to a slight bug in the library used by the game for the rendering.<br/>This might significantly impact your speed.<br/>To avoid this issue, make sure your refresh rate, in your display settings, is set to a multiple of 30 (30, 60, 90, 120, etc...).<br/>This affects all versions of the game regardless.<br/>Below are the explanations of the result.</p>\
			<h3>Refresh Rate</h3>\
			<p>This is the browser\'s refresh rate at the time of measurement (the number of screen updates per second).<br/>Generally, the browser automatically adjusts this to match your display\'s refresh rate.</p>\
			<h3>Rendering Speed</h3>\
			<p>This is the estimated refresh rate of the actual game.<br/>Since Granblue Fantasy fundamentally operates at a base of 30 FPS, any value of 30 Hz or higher indicates that there is no delay.<br/>This is measured by replicating the game screen environment using the same library used by the game itself.</p>\
			<h3>Delay per second</h3>\
			<p>This is the literal delay measured per second.<br/>A negative value indicates that the rendering speed is actually faster than the base speed.</p>\
			<h3>Delay per minute</h3>\
			<p>The same as above, but calculated over the course of one minute.</p>\
			<h3>How to resolve Delays</h3>\
			<p>If you are experiencing delays, setting your display\'s refresh rate to a multiple of 30 may improve performance.<br/>(Examples: Change 144Hz → 120Hz, or 75Hz → 60Hz)<br/>If the measured refresh rate does not match your display\'s hardware settings, your browser may be struggling and dropping frames. In this case, close other tabs or anything that might slow down your browser.</p>\
			<h3>Technical explanations</h3>\
			<p>Below are the explanations of this bug.<br/>You might want to check <a href="https://eriri.net/gbf-delay/about.html">Eriri\'s page</a> for more details (in Japanese).</p>\
			<h3>Fundamentals</h3>\
			<p>GBF relies on your monitor/browser refresh rate via the requestAnimationFrame API.<br/>The rendering delay is rooted in the CreateJS library (Note: Cygames use a custom version from DeNA).<br/>GBF is configured with an interval of 33 milliseconds (roughly 30.303030303030305 FPS).</p>\
			<h3>Causes</h3>\
			<p>Screen drawing requests are sent every 1000 ms divided by your Browser FPS.<br/>The game draws the next frame only if 1000 ms divided by the Target FPS have passed since the last render.<br/>In DeNA\'s implementation, there is a small "margin of error" of 1 millisecond. If the timing is even 1 millisecond faster than the target, the frame will still be rendered.<br/>This mismatch between the browser\'s refresh requests and the game\'s internal target accumulates over time, resulting in visible delay or "stutter".</p>\
		</details>';
		
		
		// createjs stuff
		this.canvas = add_to(this.tree[0], "canvas");
		this.canvas.style.height = "1px"; 
		this.m_stage = new createjs.Stage(this.canvas);
		createjs.Ticker.setInterval(33);
		createjs.Ticker.addEventListener("tick", () => {});
	}
	
	start()
	{
		this.start_button.disabled = true;
		this.start_button.innerHTML = '<svg style="display:block;margin:auto;" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_0XTQ{transform-origin:center;animation:spinner_y6GP .75s linear infinite}@keyframes spinner_y6GP{100%{transform:rotate(360deg)}}</style><path class="spinner_0XTQ" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z" fill="#62c1e5"/></svg>'
		this.frame_data = {
			frameCount : 0,
			gbfFramerateAve : 0,
			startTime : createjs.Ticker.getTime(),
			lastTime : 0
		};
		window.requestAnimationFrame(
			() => {
				this.onFrame(5000)
			}
		);
	}
	
	onFrame(duration)
	{
		this.frame_data.frameCount++;
		this.frame_data.gbfFramerateAve += createjs.Ticker.getMeasuredFPS();
		const time = createjs.Ticker.getTime() - this.frame_data.startTime;

		if(time - this.frame_data.lastTime >= 500)
		{
			this.frame_data.lastTime = time;
		}

		if(time >= duration)
		{
			this.end(
				this.frame_data.frameCount / duration * 1000,
				this.frame_data.gbfFramerateAve / this.frame_data.frameCount
			);
		}
		else
		{
			window.requestAnimationFrame(
				() => {
					this.onFrame(duration)
				}
			);
		}
	}
	
	end(browserFramerate, gbfFramerate)
	{
		let label, span;
		// reset button
		this.start_button.textContent = "Start Test";
		this.start_button.disabled = false;

		if(browserFramerate <= 0)
		{
			[label, span] = this.create_section(resType);
			label.textContent = "Error:";
			span.textContent = "An error occured, try again.";
			return;
		}
		
		// calculate numbers
		const delayPerS = (1000 / gbfFramerate) * (createjs.Ticker.getFPS() - gbfFramerate);
		const delayPerM = delayPerS * 60 / 1000;
		const resType = delayPerS < 1000/60 ? "#00ffff" : "#ff0000";
		const resText = (
			delayPerS < 1000/60
			? (
				delayPerS <= 0
				? "You have no delays."
				: "You have almost no delays."
			)
			: "You might experience delays."
		);
		
		// display
		this.output_area.innerHTML = "";
		
		[label, span] = this.create_section(resType);
		label.textContent = "Result:";
		span.textContent = resText;
		
		[label, span] = this.create_section(resType);
		label.textContent = "Refresh Rate";
		span.textContent = this.format_num(browserFramerate, 2) + " Hz";
		
		[label, span] = this.create_section(resType);
		label.textContent = "Rendering speed";
		span.textContent = this.format_num(gbfFramerate, 2) + " Hz";
		
		[label, span] = this.create_section(resType);
		label.textContent = "Delay per second";
		span.textContent = this.format_num(delayPerS, 0, 2) + " ms";
		
		[label, span] = this.create_section(resType);
		label.textContent = "Delay per minute";
		span.textContent = this.format_num(delayPerM, 0, 2) + " s";
	}
	
	create_section(color)
	{
		let label = add_to(this.output_area, "label");
		label.style.marginRight = "10px";
		let span = add_to(this.output_area, "span", {br:true});
		span.style.color = color;
		return [label, span];
	}
	
	format_num(num, decimal = 0)
	{
		return ~~(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
	}
}

tool_constructors[ScreenTester.c_key] = ScreenTester;