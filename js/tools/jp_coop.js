class JPCoopHelper extends ToolBase
{
	static c_key = Object.freeze("jp-coop");
	
	constructor()
	{
		super();
		this.key = JPCoopHelper.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		
		this.tree[0].appendChild(document.createTextNode("Click on a word or sentence to get a japanese equivalent."));
		this.tree[0].appendChild(document.createElement("br"));
		this.tree[0].appendChild(document.createTextNode("Buttons with <PLACEHOLDERS> mean you must modify something."));
		this.tree[0].appendChild(document.createElement("hr"));
		this.tree[0].appendChild(document.createTextNode("Basis"));
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("Yes", "はい");
		this.add_sentence("No", "いいえ");
		this.add_sentence("Thanks", "有難う");
		this.add_sentence("I can try", "やってみる");
		this.add_sentence("2 times", "2回");
		this.tree[0].appendChild(document.createElement("hr"));
		this.tree[0].appendChild(document.createTextNode("Elements"));
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("Fire", "火");
		this.add_sentence("Water", "水");
		this.add_sentence("Earth", "土");
		this.add_sentence("Wind", "風");
		this.add_sentence("Light", "光");
		this.add_sentence("Dark", "闇");
		this.add_sentence("Copy all", "火水土風光闇");
		this.tree[0].appendChild(document.createElement("hr"));
		this.tree[0].appendChild(document.createTextNode("Room related"));
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("I'm recruiting pubs", "野良募集します");
		this.add_sentence("I'm opening (the room)", "野良入れます");
		this.add_sentence("Closing, there aren't enough people", "あまりにも人が集まらないので解散とします、お越しくださりありがとうございました");
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("We'll start at <TIME>", "00:00から野良募集");
		this.tree[0].appendChild(document.createElement("hr"));
		this.tree[0].appendChild(document.createTextNode("Raid"));
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("1 Turn", "1ターン");
		this.add_sentence("2 Turn", "2ターン");
		this.add_sentence("3 Turn", "3ターン");
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("MC has died", "主人公落ちました");
		this.add_sentence("<CHARACTER> has died", "<CHARACTER>落ちました");
		this.add_sentence("Sorry, I made a mistake", "すみませんミスりました");
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("Waiting <X%>", "<X>待機");
		this.add_sentence("Can I have a charge bar summon?", "ゲージ石いただけますか？");
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("Can someone do/execute <X%>?", "<X>誰かお願いします");
		this.tree[0].appendChild(document.createElement("hr"));
		this.tree[0].appendChild(document.createTextNode("Versusia Genesis"));
		this.tree[0].appendChild(document.createElement("br"));
		this.add_sentence("Waiting G50", "G50待機");
		this.add_sentence("Waiting G100", "G100待機");
		this.add_sentence("Alexiel please", "ゴブロお願いします");
		this.add_sentence("No FC", "FCない");
	}
	
	add_sentence(en, jp)
	{
		let btn = add_to(
			this.tree[0],
			"button",
			{
				cls:["std-button"],
				innertext:en,
				onclick:() => {
					this.copy(jp);
				}
			}
		);
		btn.style.width = "auto";
		btn.style.minWidth = "100px";
		btn.style.marginBottom = "2px";
		btn.style.marginLeft = "2px";
		btn.style.marginRight = "2px";
		btn.style.marginTop = "2px";
	}
	
	copy(str)
	{
		navigator.clipboard.writeText(str).then(
			() => {
				push_popup("Copied!")
			},
			() => {
				push_popup("Failed to copy, there is a lack of permissions")
			},
		);
	}
}

tool_constructors[JPCoopHelper.c_key] = JPCoopHelper;