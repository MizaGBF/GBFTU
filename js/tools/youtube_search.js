class YoutubeSearch extends ToolBase
{
	static c_key = Object.freeze("youtube-search");
	static c_content = Object.freeze([
		{jp:"", value:"Any", selected:true},
		{group:true, label:"Regalia"},
		{jp:"シヴァhl", value:"Shiva"},
		{jp:"エウロペhl", value:"Europa"},
		{jp:"ブローディアhl", value:"Godsworn Alexiel"},
		{jp:"グリームニルhl", value:"Grimnir"},
		{jp:"メタトロンhl", value:"Metatron"},
		{jp:"アバターhl", value:"Avatar"},
		{group:true, label:"Ennead"},
		{jp:"アトゥムhl", value:"Atum"},
		{jp:"テフヌトhl", value:"Tefnut"},
		{jp:"ベンヌhl", value:"Bennu"},
		{jp:"ラーhl", value:"Ra"},
		{jp:"ホルスhl", value:"Horus"},
		{jp:"オシリスhl", value:"Osiris"},
		{group:true, label:"Malice / Menace"},
		{jp:"ティアマト・マリス", value:"Tiamat Malice"},
		{jp:"リヴァイアサン・マリス", value:"Leviathan Malice"},
		{jp:"フロネシス", value:"Phronesis"},
		{jp:"シュヴァリエ・マリス", value:"Luminiera Malice"},
		{jp:"アニマ・アニムス・コア", value:"Anima-Animus Core"},
		{jp:"レギオン・ヴォイド", value:"Legion Void"},
		{group:true, label:"Omega Rebirth"},
		{jp:"ティアマト・アウラマグナ", value:"Tiamat Aura Omega"},
		{jp:"コロッサス・イラマグナ", value:"Colossus Ira Omega"},
		{jp:"リヴァイアサン・マレマグナ", value:"Leviathan Mare Omega"},
		{jp:"ユグドラシル・アルボスマグナ", value:"Yggdrasil Arbos Omega"},
		{jp:"シュヴァリエ・クレドマグナ", value:"Luminiera Credo Omega"},
		{jp:"セレスト・アーテルマグナ", value:"Celeste Ater Omega"},
		{group:true, label:"Six Dragons"},
		{jp:"ウィルナスhl", value:"Wilnas"},
		{jp:"ワムデュスhl", value:"Wamdus"},
		{jp:"ガレヲンhl", value:"Galleon"},
		{jp:"イーウィヤhl", value:"Ewiyar"},
		{jp:"ル・オーhl", value:"Lu Woh"},
		{jp:"フェディエルhl", value:"Fediel"},
		{group:true, label:"Apocalypse"},
		{jp:"ルシファーhl", value:"Dark Rapture (Hard)"},
		{jp:"ベルゼバブhl", value:"Beelzebub"},
		{jp:"ベリアルhl", value:"Belial"},
		{group:true, label:"Revans"},
		{jp:"ムゲンhl", value:"Mugen"},
		{jp:"ディアスポラhl", value:"Diaspora (Join)"},
		{jp:"ディアスポラhl 奥義100", value:"Diaspora (Host)"},
		{jp:"ジークフリートhl", value:"Siegfried"},
		{jp:"シエテhl", value:"Seofon"},
		{jp:"コスモスhl", value:"Cosmos"},
		{jp:"アガスティアhl", value:"Agastia"},
		{group:true, label:"Mastery Trials"},
		{jp:"武極の試練", value:"Martial Mastery Trial"},
		{jp:"魔星の試練", value:"Esoteric Mastery Trial"},
		{jp:"神匠の試練", value:"Virtuosic Mastery Trial"},
		{group:true, label:"High Difficulty"},
		{jp:"スパバハ", value:"Super Ultimate Bahamut"},
		{jp:"スパバハ 10待機", value:"Super Ultimate Bahamut (10% Execute)"},
		{jp:"天元", value:"Hexachromatic Hierarch"},
		{jp:"フリクエ天元", value:"Hexachromatic Hierarch (Free Quest)"},
		{jp:"ルシゼロ", value:"Dark Rapture Zero"},
		{jp:"フリクエルシゼロ", value:"Dark Rapture Zero (Free Quest)"},
		{jp:"ヴェルサシア", value:"Versusia Genesis"},
		{group:true, label:"Gold Brick Raids"},
		{jp:"つよばは", value:"Proto Bahamut HL"},
		{jp:"アーカーシャ", value:"Akasha"},
		{jp:"グランデhl", value:"Grand Order HL"},
		{jp:"アルバハhl", value:"Ultimate Bahamut HL"},
		{group:true, label:"Other Raids"},
		{jp:"ルシファー", value:"Lucilius"},
		{jp:"四大天司", value:"Four Primarchs"},
		{jp:"リンドヴルム", value:"Lindwurm"},
		{jp:"ワールドhl", value:"The World"},
		{group:true, label:"Unite and Fight"},
		{jp:"古戦場 3500万", value:"Extreme+"},
		{jp:"古戦場 SWARM", value:"Swarm"},
		{jp:"古戦場 90hell", value:"Nightmare Lv.90"},
		{jp:"古戦場 95hell", value:"Nightmare Lv.95"},
		{jp:"古戦場 100hell", value:"Nightmare Lv.100"},
		{jp:"古戦場 150hell", value:"Nightmare Lv.150"},
		{jp:"古戦場 200hell", value:"Nightmare Lv.200"},
		{jp:"古戦場 250hell", value:"Nightmare Lv.250"}
	]);
	static c_elements = Object.freeze([
		{jp:"", value:"Any", selected:true},
		{jp:"火", value:"Fire"},
		{jp:"水", value:"Water"},
		{jp:"土", value:"Earth"},
		{jp:"風", value:"Wind"},
		{jp:"光", value:"Light"},
		{jp:"闇", value:"Dark"}
	]);
	static c_classes = Object.freeze([
		{jp:"", value:"Any", selected:true},
		{group:true, label:"I"},
		{jp:"ファイター・オリジン", value:"Fighter Origin"},
		{group:true, label:"IV"},
		{jp:"ベルセルク", value:"Berserker"},
		{jp:"スパルタ", value:"Spartan"},
		{jp:"セージ", value:"Sage"},
		{jp:"ウォーロック", value:"Warlock"},
		{jp:"義賊", value:"Bandit Tycoon"},
		{jp:"カオスルーダー", value:"Chaos Ruler"},
		{jp:"レスラー", value:"Luchador"},
		{jp:"ハウンドドッグ", value:"Nighthound"},
		{jp:"エリュシオン", value:"Elysian"},
		{jp:"アプサラス", value:"Apsaras"},
		{jp:"クリュサオル", value:"Chrysaor"},
		{jp:"ランバージャック", value:"Lumberjack"},
		{jp:"キャバルリー", value:"Cavalier"},
		{jp:"モンク", value:"Monk"},
		{jp:"ロビンフッド", value:"Robin Hood"},
		{jp:"レリックバスター", value:"Relic Buster"},
		{jp:"ヤマト", value:"Yamato"},
		{jp:"シールドスウォーン", value:"Shieldsworn"},
		{jp:"モンク", value:"Monk"},
		{jp:"クリュサオル", value:"Chrysaor"},
		{group:true, label:"V"},
		{jp:"ヴァイキング", value:"Viking"},
		{jp:"パラディン", value:"Paladin"},
		{jp:"パナケイア", value:"Iatromantis"},
		{jp:"マナダイバー", value:"Manadiver"},
		{jp:"キング", value:"Street King"},
		{jp:"陰陽師", value:"Onmyoji"},
		{jp:"スマヒヒト", value:"Sumaibito"},
		{jp:"ブギーマン", value:"Boogeyman"},
		{jp:"マリアッチ", value:"Mariachi"},
		{group:true, label:"EX II"},
		{jp:"ドクター", value:"Doctor"},
		{jp:"魔法戦士", value:"Runeslayer"},
		{jp:"剣豪", value:"Kengo"},
		{jp:"ザ・グローリー", value:"Glorybringer"},
		{jp:"ソルジャー", value:"Soldier"},
		{jp:"黒猫道士", value:"Nekomancer"},
		{jp:"トーメンター", value:"Tormentor"},
		{jp:"ライジングフォース", value:"Rising Force"},
		{jp:"マスカレード", value:"Masquerade"}
	]);
	
	constructor()
	{
		super();
		this.key = YoutubeSearch.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.elements = {};
		this.output = "";
		this.add_select(
			"Content",
			YoutubeSearch.c_content
		);
		this.add_select(
			"Element",
			YoutubeSearch.c_elements
		);
		this.add_select(
			"Class",
			YoutubeSearch.c_classes
		);
		this.add_toggle('"Granblue"');
		this.add_toggle('"Omega"');
		this.add_toggle('"Full Auto"');
		this.add_toggle('"Solo"');
		this.add_input('Honor');
		this.add_controls();
		add_to(this.tree[0], "br");
		add_to(
			this.tree[0],
			"span",
			{
				cls:["small-text"],
				innerhtml:'Based on: <a href="https://gbf.wiki/Template:YoutubeTitleGenerator" target="_blank" rel="noopener noreferrer">Original</a> / <a href="https://gbf.wiki/Widget:YoutubeTitleGenerator" target="_blank" rel="noopener noreferrer">Source</a>'
			}
		);
	}
	
	add_select(name, list)
	{
		// note: Reuse audio CSS for convenience
		let container = add_to(this.tree[0], "div", {
			cls:["audio-inner-container"]
		});
		let label = add_to(container, "label", {cls:["audio-label"]});
		label.htmlFor = "youtube-search-" + this.format_name(name);
		label.innerText = name;
		let sel = add_to(container, "select", {
			cls:["audio-select"],
			id:"youtube-search-" + this.format_name(name)
		});
		let ref = sel;
		for(const category of list)
		{
			if((category.group ?? false) == true)
			{
				ref = add_to(sel, "optgroup");
				ref.label = category.label;
			}
			else
			{
				let option = add_to(ref, "option");
				option.value = category.jp;
				option.innerText = category.value;
				option.selected = ((category.selected ?? false) == true);
				option.disabled = ((category.disabled ?? false) == true);
			}
		}
		sel.onchange = () => {
			this.update();
		};
		this.elements[this.format_name(name)] = sel;
	}
	
	add_toggle(name)
	{
		// note: Reuse audio CSS for convenience
		let container = add_to(this.tree[0], "div", {
			cls:["audio-inner-container"]
		});
		let btn = add_to(container, "button", {
			cls:["audio-button"],
			innertext:name
		});
		btn.onclick = () => {
			btn.classList.toggle("audio-button-enabled");
			this.update();
		}
		this.elements[this.format_name(name)] = btn;
	}
	
	add_input(name)
	{
		// note: Reuse audio CSS for convenience
		let container = add_to(this.tree[0], "div", {
			cls:["audio-inner-container"]
		});
		let label = add_to(container, "label", {cls:["audio-label"]});
		label.htmlFor = "youtube-search-" + this.format_name(name);
		label.innerText = name;
		let input = add_to(container, "input", {
			cls:["audio-select"],
			id:"youtube-search-" + this.format_name(name)
		});
		input.placeholder = "eg 400k, 4m";
		input.onkeyup = () => {
			this.update();
		};
		this.elements[this.format_name(name)] = input;
	}
	
	add_controls()
	{
		// note: Reuse audio CSS for convenience
		this.elements.string_output = add_to(this.tree[0], "div", {
			cls:["audio-inner-container"]
		});
		let container = add_to(this.tree[0], "div", {
			cls:["audio-inner-container"]
		});
		add_to(container, "button", {
			cls:["audio-button"],
			innertext:"Copy",
			onclick:() => {
				this.copy_clipboard();
			}
		});
		add_to(container, "button", {
			cls:["audio-button"],
			innertext:"Search",
			onclick:() => {
				this.open_youtube();
			}
		});
	}
	
	format_name(str)
	{
		return str.toLowerCase().replaceAll(" ", "").replaceAll('"', "");
	}
	
	update()
	{
		let words = [];
		if(this.elements.granblue.classList.contains("audio-button-enabled"))
			words.push("グラブル");
		if(this.elements.content.value != "")
			words.push(this.elements.content.value);
		if(this.elements.element.value != "")
			words.push(this.elements.element.value);
		if(this.elements.class.value != "")
			words.push(this.elements.class.value);
		if(this.elements.omega.classList.contains("audio-button-enabled"))
			words.push("マグナ");
		if(this.elements.fullauto.classList.contains("audio-button-enabled"))
			words.push("フルオート");
		if(this.elements.solo.classList.contains("audio-button-enabled"))
			words.push("ソロ");
		let honor = this.elements.honor.value.toLowerCase().trim();
		if(honor != "")
		{
			let multiplier = 1;
			if(honor.endsWith("k"))
			{
				multiplier = 1000;
				honor = honor.slice(0, honor.length - 1);
			}
			else if(honor.endsWith("m"))
			{
				multiplier = 1000000;
				honor = honor.slice(0, honor.length - 1);
			}
			else if(honor.endsWith("b"))
			{
				multiplier = 1000000000;
				honor = honor.slice(0, honor.length - 1);
			}
			else if(honor.endsWith("t"))
			{
				multiplier = 1000000000000;
				honor = honor.slice(0, honor.length - 1);
			}
			if(/^\d+$/.test(honor))
			{
				honor = parseInt(honor) * multiplier;
				if(honor >= 1000000000000)
				{
					honor = "" + Math.floor(honor / 1000000000000) + "兆";
				}
				else if(honor >= 100000000)
				{
					honor = "" + Math.floor(honor / 100000000) + "億";
				}
				else if(honor >= 10000)
				{
					honor = "" + Math.floor(honor / 10000) + "万";
				}
				else
				{
					honor = "" + honor;
				}
				words.push(honor);
			}
		}
		this.output = words.join(" ");
		this.elements.string_output.textContent = this.output;
	}
	
	copy_clipboard()
	{
		try
		{
			if(this.output == "")
			{
				push_popup("Select some options first.");
			}
			else
			{
				navigator.clipboard.writeText(this.output);
				push_popup("Copied.");
			}
		}
		catch(err)
		{
			push_popup("The clipboard is unaccessible.");
		}
	}
	
	open_youtube()
	{
		if(this.output == "")
		{
			push_popup("Select some options first.");
		}
		else
		{
			const a = document.createElement("a");
			a.href = "https://www.youtube.com/results?search_query=" + this.output;
			a.target = "_blank";
			a.rel = "noopener noreferrer";
			a.click();
		}
	}
}

tool_constructors[YoutubeSearch.c_key] = YoutubeSearch;