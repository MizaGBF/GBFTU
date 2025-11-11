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
		label.htmlFor = "defense-input";
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
			"span"
		);
		this.calculate();
	}
	
	calculate()
	{
		try
		{
			let base_f = parseFloat(this.input.value);
			if(isNaN(base_f))
			{
				throw new Error("The input isn't a valid float");
			}
			else if(base_f < -99)
			{
				throw new Error("The input is under the lower limit");
			}
			let f = base_f / 100; // percent conversion
			f = 1 / (1 + f);
			f = (Math.floor(f * 10000) / 10000);
			let text = "";
			if(f > 1)
			{
				text = "<b>Example:</b><br>Base Damage: 100000<br>Final Damage: " + Math.round(100000 * f) + "<br>Damage are increased: x" + f + "<br>";
			}
			else if(f < 1)
			{
				text = "<b>Example:</b><br>Base Damage: 100000<br>Final Damage: " + Math.round(100000 * f) + "<br>Damage are reduced: x" + f + "<br>";
			}
			else
			{
				text = "<b>Example:</b><br>Base Damage: 100000<br>Final Damage: 100000<br>";
			}
			let base_def = Math.floor((base_f * 0.1 + 10) * 10) / 10;
			switch(base_f)
			{
				case 0: // 10 def
				{
					text += "<br>Content with 10 (unmodified) base defense: Estimated Damage, Trial fights, Story fights, UnF Extreme+";
					text += "<br>";
					break;
				}
				case -5: // 9.5 def
				{
					text += "<br>Content with " + base_def + " base defense: Fediel (Impossible)";
					text += "<br>";
					break;
				}
				case -15: // 8.5 def
				{
					text += "<br>Content with " + base_def + " base defense: Six-Dragon Black Advent";
					text += "<br>";
					break;
				}
				case 10: // 11 def
				{
					text += "<br>Content with " + base_def + " base defense: Proto-Bahamut (normal), Ultimate Bahamut HL";
					text += "<br>";
					break;
				}
				case 15:
				{
					text += "<br>Notable effects with such value: Super Ultimate Bahamut's 1 earth tenet";
					text += "<br>";
					break;
				}
				case 20: // 12 def
				{
					text += "<br>Content with " + base_def + " base defense: Omega HL, Qilin & Huanglong HL, Metatron, Avatar, Grand Order HL, Lindwurm";
					text += "<br>";
					break;
				}
				case 30: // 13 def
				{
					text += "<br>Content with " + base_def + " base defense: Primarchs (N & HL), Ultimate Bahamut N, Shiva, Europa, Alexiel, Grimnir";
					text += "<br>";
					break;
				}
				case 50: // 15 def
				{
					text += "<br>Content with " + base_def + " base defense: Malice, Menace, Akasha, Lucilius, Astaroth, Pride of Ascendant";
					text += "<br>";
					break;
				}
				case 80: // 18 def
				{
					text += "<br>Content with " + base_def + " base defense: Rose Queen, Six-Dragons HL, Super Ultimate Bahamut";
					text += "<br>";
					break;
				}
				case 100: // 20 def
				{
					text += "<br>Content with " + base_def + " base defense: Proto Bahamut HL, Lucilius (Hard), Beelzebub";
					text += "<br>";
					break;
				}
				case 120: // 22 def
				{
					text += "<br>Content with " + base_def + " base defense: Celeste HL (Mist form)";
					text += "<br>";
					break;
				}
				case 150: // 25 def
				{
					text += "<br>Content with " + base_def + " base defense: Beelzebub, UnF NM150-200";
					text += "<br>Notable effects with such value: Super Ultimate Bahamut's 10 earth tenets";
					break;
				}
				case 200: // 30 def
				{
					text += "<br>Content with " + base_def + " base defense: Rose Queen (Dark form)";
					text += "<br>";
					break;
				}
				case 1000: // guard
				{
					text += "<br>";
					text += "<br>Notable effects with such value: Guarding, Alexiel (Summon)'s defense buff";
					break;
				}
				default:
				{
					text += "<br><br>";
				}
			}
			this.result.innerHTML = text;
		}
		catch(err)
		{
			console.error("Exception thrown", err.stack);
		}
	}
}

tool_constructors[DefenseCalculator.c_key] = DefenseCalculator;