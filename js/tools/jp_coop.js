class JPCoopHelper extends ToolBase
{
	static c_key = Object.freeze("jp-coop");
	static c_dictionary = Object.freeze({
		sections : [
			{
				title: "Basics",
				pages : [
					{
						list : [
							{en:"Yes", jp:"はい"},
							{en:"No", jp:"いいえ"},
							{en:"Thanks", jp:"有難う"},
							{en:"Sorry", jp:"すいません"},
							{en:"I can try", jp:"やってみる"},
							{en:"2 times", jp:"2回"}
						]
					},
					{
						list : [
							{en:"None/Nothing", jp:"皆無"},
							{en:"Same/Likewise", jp:"同じく"}
						]
					},
					{
						list : [
							{en:"Comma (、)", jp:"、"},
							{en:"Dot (。)", jp:"。"}
						]
					}
				]
			},
			{
				title: "Elements",
				pages : [
					{
						list : [
							{en:"Fire", jp:"火"},
							{en:"Water", jp:"水"},
							{en:"Earth", jp:"土"},
							{en:"Wind", jp:"風"},
							{en:"Light", jp:"光"},
							{en:"Dark", jp:"闇"},
							{en:"Copy all", jp:"火水土風光闇"}
						]
					}
				]
			},
			{
				title: "Room related",
				pages : [
					{
						list : [
							{en:"I'm recruiting pubs", jp:"野良募集します"},
							{en:"I'm opening (the room)", jp:"野良入れます"},
							{en:"Closing, there aren't enough people", jp:"あまりにも人が集まらないので解散とします、お越しくださりありがとうございました"}
						]
					},
					{
						list : [
							{en:"Please wait a moment", jp:"少々お待ちを"},
							{en:"We'll start at <TIME>", jp:"00:00から野良募集"}
						]
					}
				]
			},
			{
				title: "Raid",
				pages : [
					{
						list : [
							{en:"1 Turn", jp:"1ターン"},
							{en:"2 Turns", jp:"2ターン"},
							{en:"3 Turns", jp:"3ターン"}
						]
					},
					{
						list : [
							{en:"MC has died", jp:"主人公落ちました"},
							{en:"<CHARACTER> has died", jp:"<CHARACTER>落ちました"},
							{en:"Sorry, I made a mistake", jp:"すみませんミスりました"}
						]
					},
					{
						list : [
							{en:"Waiting <X%>", jp:"<X>待機"},
							{en:"Can I have a charge bar summon?", jp:"ゲージ石いただけますか？"}
						]
					},
					{
						list : [
							{en:"Can someone do/execute <X%>?", jp:"<X>誰かお願いします"}
						]
					}
				]
			},
			{
				title: "Versusia Genesis",
				pages : [
					{
						list : [
							{en:"Waiting G50", jp:"G50待機"},
							{en:"Waiting G100", jp:"G100待機"}
						]
					},
					{
						list : [
							{en:"Alexiel please", jp:"ゴブロお願いします"},
							{en:"I have 2 Alexiels, let me know if you want them", jp:"ゴブロ後２枚あるので欲しい時言ってください"}
						]
					},
					{
						list : [
							{en:"No FC", jp:"FCない"}
						]
					}
				]
			}
		]
	});
	
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
		for(const section of JPCoopHelper.c_dictionary.sections)
		{
			this.tree[0].appendChild(document.createElement("hr"));
			this.tree[0].appendChild(document.createTextNode(section.title));
			let first = true;
			for(const page of section.pages)
			{
				this.tree[0].appendChild(document.createElement("br"));
				for(const entry of page.list)
				{
					this.add_sentence(entry.en, entry.jp);
				}
			}
		}
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