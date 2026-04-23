class YoutubeSearch extends ToolBase
{
	static c_key = Object.freeze("youtube-search");
	static c_content = Object.freeze([
		{group:true, label:"Regalia"},
		{jp:"シヴァhl", value:"Shiva", asset:"sp/quest/assets/lobby/303151.png"},
		{jp:"エウロペhl", value:"Europa", asset:"sp/quest/assets/lobby/303161.png"},
		{jp:"ブローディアhl", value:"Godsworn Alexiel", asset:"sp/quest/assets/lobby/303171.png"},
		{jp:"グリームニルhl", value:"Grimnir", asset:"sp/quest/assets/lobby/303181.png"},
		{jp:"メタトロンhl", value:"Metatron", asset:"sp/quest/assets/lobby/303191.png"},
		{jp:"アバターhl", value:"Avatar", asset:"sp/quest/assets/lobby/303221.png"},
		{group:true, label:"Ennead"},
		{jp:"アトゥムhl", value:"Atum", asset:"sp/quest/assets/lobby/305321.png"},
		{jp:"テフヌトhl", value:"Tefnut", asset:"sp/quest/assets/lobby/305331.png"},
		{jp:"ベンヌhl", value:"Bennu", asset:"sp/quest/assets/lobby/305341.png"},
		{jp:"ラーhl", value:"Ra", asset:"sp/quest/assets/lobby/305351.png"},
		{jp:"ホルスhl", value:"Horus", asset:"sp/quest/assets/lobby/305361.png"},
		{jp:"オシリスhl", value:"Osiris", asset:"sp/quest/assets/lobby/305371.png"},
		{group:true, label:"Malice / Menace"},
		{jp:"ティアマト・マリス", value:"Tiamat Malice", asset:"sp/quest/assets/lobby/303241.png"},
		{jp:"リヴァイアサン・マリス", value:"Leviathan Malice", asset:"sp/quest/assets/lobby/305151.png"},
		{jp:"フロネシス", value:"Phronesis", asset:"sp/quest/assets/lobby/305251.png"},
		{jp:"シュヴァリエ・マリス", value:"Luminiera Malice", asset:"sp/quest/assets/lobby/305271.png"},
		{jp:"アニマ・アニムス・コア", value:"Anima-Animus Core", asset:"sp/quest/assets/lobby/305291.png"},
		{jp:"レギオン・ヴォイド", value:"Legion Void", asset:"sp/quest/assets/lobby/305481.png"},
		{group:true, label:"Omega Rebirth"},
		{jp:"ティアマト・アウラマグナ", value:"Tiamat Aura Omega", asset:"sp/quest/assets/lobby/305601.png"},
		{jp:"コロッサス・イラマグナ", value:"Colossus Ira Omega", asset:"sp/quest/assets/lobby/305611.png"},
		{jp:"リヴァイアサン・マレマグナ", value:"Leviathan Mare Omega", asset:"sp/quest/assets/lobby/305631.png"},
		{jp:"ユグドラシル・アルボスマグナ", value:"Yggdrasil Arbos Omega", asset:"sp/quest/assets/lobby/305641.png"},
		{jp:"シュヴァリエ・クレドマグナ", value:"Luminiera Credo Omega", asset:"sp/quest/assets/lobby/305591.png"},
		{jp:"セレスト・アーテルマグナ", value:"Celeste Ater Omega", asset:"sp/quest/assets/lobby/305621.png"},
		{group:true, label:"Taboo"},
		{jp:"ベルメルヴォルク", value:"Belmervolk", asset:"sp/quest/assets/lobby/305711.png"},
		{jp:"ニフイヴィンテ", value:"Nihuyvintae", asset:"sp/quest/assets/lobby/305721.png"},
		{jp:"ナロフィルミダス", value:"Narophirmidas", asset:"sp/quest/assets/lobby/305731.png"},
		{jp:"マクタンマカル", value:"Macutanmacar", asset:"sp/quest/assets/lobby/305741.png"},
		{jp:"パパルクルヴァ", value:"Papahlukruva", asset:"sp/quest/assets/lobby/305751.png"},
		{jp:"ザマルヴォッチ", value:"Zamalvoch", asset:"sp/quest/assets/lobby/305761.png"},
		{group:true, label:"Six Dragons"},
		{jp:"ウィルナスhl", value:"Wilnas", asset:"sp/quest/assets/lobby/305191.png"},
		{jp:"ワムデュスhl", value:"Wamdus", asset:"sp/quest/assets/lobby/305201.png"},
		{jp:"ガレヲンhl", value:"Galleon", asset:"sp/quest/assets/lobby/305211.png"},
		{jp:"イーウィヤhl", value:"Ewiyar", asset:"sp/quest/assets/lobby/305221.png"},
		{jp:"ル・オーhl", value:"Lu Woh", asset:"sp/quest/assets/lobby/305231.png"},
		{jp:"フェディエルhl", value:"Fediel", asset:"sp/quest/assets/lobby/305241.png"},
		{group:true, label:"Apocalypse"},
		{jp:"ルシファーhl", value:"Dark Rapture (Hard)", asset:"sp/quest/assets/lobby/303281.png"},
		{jp:"ベルゼバブhl", value:"Beelzebub", asset:"sp/quest/assets/lobby/305181.png"},
		{jp:"ベリアルhl", value:"Belial", asset:"sp/quest/assets/lobby/305281.png"},
		{group:true, label:"Revans"},
		{jp:"ムゲンhl", value:"Mugen", asset:"sp/quest/assets/lobby/305381.png"},
		{jp:"ディアスポラhl", value:"Diaspora (Join)", text:"Join", asset:"sp/quest/assets/lobby/305391.png"},
		{jp:"ディアスポラhl 奥義100", value:"Diaspora (Host)", text:"Host", asset:"sp/quest/assets/lobby/305391.png"},
		{jp:"ジークフリートhl", value:"Siegfried", asset:"sp/quest/assets/lobby/305401.png"},
		{jp:"シエテhl", value:"Seofon", asset:"sp/quest/assets/lobby/305411.png"},
		{jp:"コスモスhl", value:"Cosmos", asset:"sp/quest/assets/lobby/305421.png"},
		{jp:"アガスティアhl", value:"Agastia", asset:"sp/quest/assets/lobby/305431.png"},
		{group:true, label:"Mastery Trials"},
		{jp:"武極の試練", value:"Martial Mastery Trial", asset:"sp/quest/assets/lobby/305661.png"},
		{jp:"魔星の試練", value:"Esoteric Mastery Trial", asset:"sp/quest/assets/lobby/305671.png"},
		{jp:"神匠の試練", value:"Virtuosic Mastery Trial", asset:"sp/quest/assets/lobby/305681.png"},
		{group:true, label:"High Difficulty"},
		{jp:"スパバハ", value:"Super Ultimate Bahamut", asset:"sp/quest/assets/lobby/305311.png"},
		{jp:"スパバハ 10待機", value:"Super Ultimate Bahamut (10% Execute)", text:"Execute", asset:"sp/quest/assets/lobby/305311.png"},
		{jp:"天元", value:"Hexachromatic Hierarch", asset:"sp/quest/assets/lobby/305491.png"},
		{jp:"フリクエ天元", value:"Hexachromatic Hierarch (Free Quest)", text:"Free", asset:"sp/quest/free/assets/stage_thumb/104101.png"},
		{jp:"ルシゼロ", value:"Dark Rapture Zero", asset:"sp/quest/assets/lobby/305581.png"},
		{jp:"フリクエルシゼロ", value:"Dark Rapture Zero (Free Quest)", text:"Free", asset:"sp/quest/free/assets/stage_thumb/104171.png"},
		{group:true, label:"Unlimited"},
		{jp:"ヴェルサシア", value:"Versusia Genesis", asset:"sp/quest/assets/lobby/305701.png"},
		{group:true, label:"Gold Brick Raids"},
		{jp:"つよばは", value:"Proto Bahamut HL", asset:"sp/quest/assets/lobby/301061.png"},
		{jp:"アーカーシャ", value:"Akasha", asset:"sp/quest/assets/lobby/303251.png"},
		{jp:"グランデhl", value:"Grand Order HL", asset:"sp/quest/assets/lobby/305161.png"},
		{jp:"アルバハhl", value:"Ultimate Bahamut HL", asset:"sp/quest/assets/lobby/303141.png"},
		{group:true, label:"Other Raids"},
		{jp:"ルシファー", value:"Lucilius", asset:"sp/quest/assets/lobby/303271.png"},
		{jp:"四大天司", value:"Four Primarchs", asset:"sp/quest/assets/lobby/303291.png"},
		{jp:"リンドヴルム", value:"Lindwurm", asset:"sp/quest/assets/lobby/305171.png"},
		{jp:"ワールドhl", value:"The World", asset:"sp/quest/assets/lobby/305571.png"},
		{group:true, label:"Rise of the Beasts"},
		{jp:"四象降臨 朱雀", value:"Zhuque", asset:"assets/ui/youtube_search/zhuque.jpg"},
		{jp:"四象降臨 アグニス", value:"Agni", asset:"assets/ui/youtube_search/agni.jpg"},
		{jp:"四象降臨 玄武", value:"Xuanwu", asset:"assets/ui/youtube_search/xuanwu.jpg"},
		{jp:"四象降臨 ネプチューン", value:"Neptune", asset:"assets/ui/youtube_search/neptune.jpg"},
		{jp:"四象降臨 白虎", value:"Baihu", asset:"assets/ui/youtube_search/baihu.jpg"},
		{jp:"四象降臨 ティターン", value:"Titan", asset:"assets/ui/youtube_search/titan.jpg"},
		{jp:"四象降臨 青竜", value:"Qinglong", asset:"assets/ui/youtube_search/qinglong.jpg"},
		{jp:"四象降臨 ゼピュロス", value:"Zephyrus", asset:"assets/ui/youtube_search/zephyrus.jpg"},
		{jp:"四象降臨 四象瑞神100", value:"Shenxian", asset:"assets/ui/youtube_search/shenxian.png"},
		{jp:"四象降臨 四象瑞神Lv.100", value:"Shenxian (Lv.100)", asset:"assets/ui/youtube_search/shenxian_100.png"},
		{jp:"四象降臨 四象瑞神Lv.150", value:"Shenxian (Lv.150)", asset:"assets/ui/youtube_search/shenxian_150.png"},
		{group:true, label:"Unite and Fight"},
		{jp:"古戦場 3500万", value:"Extreme+", asset:"assets/ui/youtube_search/ex+.png"},
		{jp:"古戦場 SWARM", value:"Horde", asset:"assets/ui/youtube_search/horde.png"},
		{jp:"古戦場 90hell", value:"Nightmare Lv.90", asset:"sp/event/teamraid081/assets/thumb/teamraid081_hell90.png"},
		{jp:"古戦場 95hell", value:"Nightmare Lv.95", asset:"sp/event/teamraid081/assets/thumb/teamraid081_hell95.png"},
		{jp:"古戦場 100hell", value:"Nightmare Lv.100", asset:"sp/event/teamraid081/assets/thumb/teamraid081_hell100.png"},
		{jp:"古戦場 150hell", value:"Nightmare Lv.150", asset:"sp/event/teamraid081/assets/thumb/teamraid081_hell150.png"},
		{jp:"古戦場 200hell", value:"Nightmare Lv.200", asset:"sp/event/teamraid081/assets/thumb/teamraid081_hell200.png"},
		{jp:"古戦場 250hell", value:"Nightmare Lv.250", asset:"sp/event/teamraid081/assets/thumb/teamraid081_hell250.png"},
		{group:true, label:"Dread Barrage"},
		{jp:"ドレバラ ★1", value:"Dread Barrage ★", asset:"sp/assets/summon/qm/teamforce13_star1.png"},
		{jp:"ドレバラ ★2", value:"Dread Barrage ★★", asset:"sp/assets/summon/qm/teamforce13_star2.png"},
		{jp:"ドレバラ ★3", value:"Dread Barrage ★★★", asset:"sp/assets/summon/qm/teamforce13_star3.png"},
		{jp:"ドレバラ ★4", value:"Dread Barrage ★★★★", asset:"sp/assets/summon/qm/teamforce13_star4.png"},
		{jp:"ドレバラ ★5", value:"Dread Barrage ★★★★★", asset:"sp/assets/summon/qm/teamforce13_star5.png"},
		{jp:"ドレバラ 強敵95", value:"Unparalleled Foe Lv.95", asset:"sp/assets/summon/qm/teamforce13_strong1.png"},
		{jp:"ドレバラ 強敵135", value:"Unparalleled Foe Lv.135", asset:"sp/assets/summon/qm/teamforce13_strong2.png"},
		{jp:"ドレバラ 強敵175", value:"Unparalleled Foe Lv.175", asset:"sp/assets/summon/qm/teamforce13_strong3.png"},
		{jp:"ドレバラ 強敵215", value:"Unparalleled Foe Lv.215", asset:"sp/assets/summon/qm/teamforce13_strong4.png"},
		{group:true, label:"Records of the Ten"},
		{jp:"十天衆戦記 EX", value:"Extreme", asset:"assets/ui/youtube_search/record_ex.png"},
		{jp:"十天衆戦記 HL", value:"Impossible", asset:"assets/ui/youtube_search/record_hl.png"},
		{jp:"十天衆戦記 100hell", value:"Nightmare Lv.100", asset:"sp/event/common/terra/top/assets/quest/terra001_hell100.png"},
		{jp:"十天衆戦記 150hell", value:"Nightmare Lv.150", asset:"sp/event/common/terra/top/assets/quest/terra001_hell150.png"},
		{group:true, label:"Exo Crucibles"},
		{jp:"エクス･イフリート", value:"Exo Ifrit", asset:"assets/ui/youtube_search/exo_ifrit.png"},
		{jp:"エクス･コキュートス", value:"Exo Cocytus", asset:"assets/ui/youtube_search/exo_cocytus.png"},
		{jp:"エクス･ウォフマナフ", value:"Exo Vohu Manah", asset:"assets/ui/youtube_search/exo_vohu_manah.png"},
		{jp:"エクス･サジタリウス", value:"Exo Sagittarius", asset:"assets/ui/youtube_search/exo_sagittarius.png"},
		{jp:"エクス･コロゥ", value:"Exo Corow", asset:"assets/ui/youtube_search/exo_corow.png"},
		{jp:"エクス･ディアボロス", value:"Exo Diablo", asset:"assets/ui/youtube_search/exo_diablo.png"},
		{group:true, label:"Story Event"},
		{jp:"シナリオイベント VH", value:"Very Hard", asset:"sp/assets/summon/qm/treasureraid169_vhard_1.png"},
		{jp:"シナリオイベント EX", value:"Extreme", asset:"sp/assets/summon/qm/treasureraid169_ex_1.png"},
		{jp:"シナリオイベント HL", value:"Impossible", asset:"sp/assets/summon/qm/treasureraid169_high_1.png"},
		{group:true, label:"Other Events"},
		{jp:"ブレイブグラウンド", value:"Proving Grounds", asset:"sp/archive/assets/island_m2/90050.png"},
		{jp:"バブ・イールの塔", value:"Tower of Babyl", asset:"sp/archive/assets/island_m2/75830.png"},
		{jp:"エイプリルフール", value:"April Fool's Day", text:"April Fools", asset:"sp/archive/assets/island_m2/72760.png"},
		{jp:"コラボイベント", value:"Collaboration", text:"Collab.", asset:"sp/archive/assets/island_m2/72770.png"}
	]);
	static c_elements = Object.freeze([
		{jp:"火", value:"Fire"},
		{jp:"水", value:"Water"},
		{jp:"土", value:"Earth"},
		{jp:"風", value:"Wind"},
		{jp:"光", value:"Light"},
		{jp:"闇", value:"Dark"}
	]);
	static c_classes = Object.freeze([
		{group:true, label:"I Origin"},
		{jp:"ファイター・オリジン", value:"Fighter Origin", asset:"sp/assets/leader/m/100501_01.jpg"},
		{jp:"ランサー・オリジン", value:"Lancer Origin", asset:"sp/assets/leader/m/190501_01.jpg"},
		{group:true, label:"IV"},
		{jp:"ベルセルク", value:"Berserker", asset:"sp/assets/leader/m/100301_01.jpg"},
		{jp:"スパルタ", value:"Spartan", asset:"sp/assets/leader/m/110301_01.jpg"},
		{jp:"セージ", value:"Sage", asset:"sp/assets/leader/m/120301_01.jpg"},
		{jp:"ウォーロック", value:"Warlock", asset:"sp/assets/leader/m/130301_01.jpg"},
		{jp:"義賊", value:"Bandit Tycoon", asset:"sp/assets/leader/m/140301_01.jpg"},
		{jp:"カオスルーダー", value:"Chaos Ruler", asset:"sp/assets/leader/m/150301_01.jpg"},
		{jp:"レスラー", value:"Luchador", asset:"sp/assets/leader/m/160301_01.jpg"},
		{jp:"ハウンドドッグ", value:"Nighthound", asset:"sp/assets/leader/m/170301_01.jpg"},
		{jp:"エリュシオン", value:"Elysian", asset:"sp/assets/leader/m/180301_01.jpg"},
		{jp:"アプサラス", value:"Apsaras", asset:"sp/assets/leader/m/190301_01.jpg"},
		{jp:"クリュサオル", value:"Chrysaor", asset:"sp/assets/leader/m/300301_01.jpg"},
		{jp:"ランバージャック", value:"Lumberjack", asset:"sp/assets/leader/m/410301_01.jpg"},
		{jp:"キャバルリー", value:"Cavalier", asset:"sp/assets/leader/m/420301_01.jpg"},
		{jp:"モンク", value:"Monk", asset:"sp/assets/leader/m/430301_01.jpg"},
		{jp:"ロビンフッド", value:"Robin Hood", asset:"sp/assets/leader/m/440301_01.jpg"},
		{jp:"レリックバスター", value:"Relic Buster", asset:"sp/assets/leader/m/450301_01.jpg"},
		{jp:"ヤマト", value:"Yamato", asset:"sp/assets/leader/m/460301_01.jpg"},
		{jp:"シールドスウォーン", value:"Shieldsworn", asset:"sp/assets/leader/m/470301_01.jpg"},
		{group:true, label:"V"},
		{jp:"ヴァイキング", value:"Viking", asset:"sp/assets/leader/m/100401_01.jpg"},
		{jp:"パラディン", value:"Paladin", asset:"sp/assets/leader/m/110401_01.jpg"},
		{jp:"パナケイア", value:"Iatromantis", asset:"sp/assets/leader/m/120401_01.jpg"},
		{jp:"マナダイバー", value:"Manadiver", asset:"sp/assets/leader/m/130401_01.jpg"},
		{jp:"キング", value:"Street King", asset:"sp/assets/leader/m/140401_01.jpg"},
		{jp:"陰陽師", value:"Onmyoji", asset:"sp/assets/leader/m/150401_01.jpg"},
		{jp:"スマヒヒト", value:"Sumaibito", asset:"sp/assets/leader/m/160401_01.jpg"},
		{jp:"ブギーマン", value:"Boogeyman", asset:"sp/assets/leader/m/170401_01.jpg"},
		{jp:"マリアッチ", value:"Mariachi", asset:"sp/assets/leader/m/180401_01.jpg"},
		{group:true, label:"EX II"},
		{jp:"ドクター", value:"Doctor", asset:"sp/assets/leader/m/200301_01.jpg"},
		{jp:"魔法戦士", value:"Runeslayer", asset:"sp/assets/leader/m/210301_01.jpg"},
		{jp:"剣豪", value:"Kengo", asset:"sp/assets/leader/m/220301_01.jpg"},
		{jp:"ザ・グローリー", value:"Glorybringer", asset:"sp/assets/leader/m/230301_01.jpg"},
		{jp:"ソルジャー", value:"Soldier", asset:"sp/assets/leader/m/240301_01.jpg"},
		{jp:"黒猫道士", value:"Nekomancer", asset:"sp/assets/leader/m/250301_01.jpg"},
		{jp:"トーメンター", value:"Tormentor", asset:"sp/assets/leader/m/260301_01.jpg"},
		{jp:"ライジングフォース", value:"Rising Force", asset:"sp/assets/leader/m/270301_01.jpg"},
		{jp:"マスカレード", value:"Masquerade", asset:"sp/assets/leader/m/280301_01.jpg"}
	]);
	static c_output = Object.freeze([
		{label:"Copy the Text", mode:"copy"},
		{group:true, label:"Youtube", icon:"yt_icon.png"},
		{label:"Relevant", mode:"youtube-relevant"},
		{label:"Popular", mode:"youtube-popular"},
		{group:true, label:"Twitter", icon:"x_icon.png"},
		{label:"Relevant", mode:"twitter-relevant"},
		{label:"Popular", mode:"twitter-popular"},
	])
	
	constructor()
	{
		super();
		this.key = YoutubeSearch.c_key;
		this.tree.push(add_to(null, "div", {
			cls:["tab-content", "container"]
		}));
		this.elements = {};
		this.selecteds = {
			element:null,
			raid:null,
			job:null
		};
		this.output = "";
		this.generate_tabs();
		
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
	
	generate_tabs()
	{
		const tabs = add_to(this.tree[0], "div", {
			cls:["tool-tabs"]
		});
		let count = 0;
		for(const tname of ["Main", "Raid select", "Class select"])
		{
			const tab_button = add_to(tabs, "input", {
				cls:["tool-tab-radio"]
			});
			tab_button.type = "radio";
			tab_button.name = "tool-tab-group";
			tab_button.id = "tool-tab-" + count;
			if(count == 0)
				tab_button.checked = true;
			const label = add_to(tabs, "label", {
				cls:["tab-button", "tool-tab-label"]
			});
			label.htmlFor = tab_button.id;
			label.innerText = tname;
			++count;
		}
		//let tab_contents = add_to(this.tree[0], "div");
		for(count = 0; count < 3; ++count)
		{
			const content = add_to(tabs, "div",{
				cls:["tool-tab-content"]
			});
			content.id = "tool-content-" + count;
			add_to(content, "br");
			switch(count)
			{
				case 0: // main part
				{
					add_to(content, "div").innerText = "Element";
					const element_container = add_to(content, "span");
					for(const elem of YoutubeSearch.c_elements)
					{
						this.add_element_button(element_container, elem);
					}
					add_to(content, "div").innerText = "Add...";
					this.add_toggle(content, '"Granblue"');
					this.add_toggle(content, '"Omega/Magna"');
					this.add_toggle(content, '"Full Auto"');
					this.add_toggle(content, '"Solo"');
					this.add_input(content, 'Honor', "eg 400k, 4m");
					this.add_input(content, 'Turn', "eg 1, 2, 3...");
					this.add_controls(content);
					break;
				}
				case 1:
				{
					this.add_button_grid(content, YoutubeSearch.c_content, "raid");
					break;
				}
				case 2:
				{
					this.add_button_grid(content, YoutubeSearch.c_classes, "job");
					break;
				}
			}
		}
	}
	
	add_element_button(node, data)
	{
		let img = add_to(node, "img", {
			cls:["mini-btn", "mini-btn-icon", "tool-img-btn"]
		});
		img.src = "assets/ui/youtube_search/" + data.value.toLowerCase() + ".png";
		img.jp = data.jp;
		img.onclick = () => {
			if(this.selecteds.element == img)
			{
				this.selecteds.element.classList.toggle("tool-img-btn-active", false);
				this.selecteds.element = null;
			}
			else if(this.selecteds.element != null)
			{
				this.selecteds.element.classList.toggle("tool-img-btn-active", false);
				this.selecteds.element = img;
				img.classList.toggle("tool-img-btn-active", true);
			}
			else
			{
				this.selecteds.element = img;
				img.classList.toggle("tool-img-btn-active", true);
			}
			this.update();
		}
	}
	
	add_button_grid(node, list, target)
	{
		const grid = add_to(node, "div", {
			cls:["tool-img-btn-container"]
		});
		let cell = null;
		for(const category of list)
		{
			if((category.group ?? false) == true)
			{
				cell = add_to(grid, "div");
				cell.innerText = category.label;
				add_to(cell, "br");
			}
			else
			{
				if(cell == null)
					cell = add_to(node, "div");
				this.add_generic_button(cell, category, target);
			}
		}
		add_to(cell, "br");
		// go to top button
		add_to(
			node,
			"button",
			{
				cls:["std-button"],
				innertext:"▲",
				onclick:(() => {
					this.tree[0].scrollIntoView();
				})
			}
		).style.width = "40px";
	}
	
	add_generic_button(node, data, target)
	{
		let img;
		if((data.text ?? null) != null)
		{
			img = add_to(node, "div", {
				cls:[
					"mini-btn", "mini-btn-icon",
					"tool-img-background", "tool-big-img-btn", "tool-img-btn"
				]
			});
			if(data.asset && data.asset.startsWith("sp"))
			{
				img.style.backgroundImage = (
					"url('https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_low/"
					+ data.asset
					+ "')"
				);
			}
			else
			{
				img.style.backgroundImage = (
					"url('"
					+ data.asset
					+ "')"
				);
			}
			img.innerText = data.text;
		}
		else
		{
			img = add_to(node, "img", {
				cls:["mini-btn", "mini-btn-icon", "tool-big-img-btn", "tool-img-btn"]
			});
			if(data.asset && data.asset.startsWith("sp"))
			{
				img.src = "https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img_low/" + data.asset;
			}
			else
			{
				img.src = data.asset;
			}
		}
		img.jp = data.jp;
		img.title = data.value;
		img.onclick = () => {
			if(this.selecteds[target] == img)
			{
				this.selecteds[target].classList.toggle("tool-img-btn-active", false);
				this.selecteds[target] = null;
			}
			else if(this.selecteds[target] != null)
			{
				this.selecteds[target].classList.toggle("tool-img-btn-active", false);
				this.selecteds[target] = img;
				img.classList.toggle("tool-img-btn-active", true);
			}
			else
			{
				this.selecteds[target] = img;
				img.classList.toggle("tool-img-btn-active", true);
			}
			this.update();
		}
	}
	
	add_toggle(node, name)
	{
		// note: Reuse audio CSS for convenience
		let container = add_to(node, "div", {
			cls:["audio-inner-container"]
		});
		let btn = add_to(container, "button", {
			cls:["audio-button", "tool-audio-btn-maxwidth"],
			innertext:name
		});
		btn.onclick = () => {
			btn.classList.toggle("audio-button-enabled");
			this.update();
		}
		this.elements[this.format_name(name)] = btn;
	}
	
	add_input(node, name, placeholder)
	{
		// note: Reuse audio CSS for convenience
		let container = add_to(node, "div", {
			cls:["audio-inner-container"]
		});
		let label = add_to(container, "label", {cls:["audio-label"]});
		label.htmlFor = "youtube-search-" + this.format_name(name);
		label.innerText = name;
		let input = add_to(container, "input", {
			cls:["audio-select"],
			id:"youtube-search-" + this.format_name(name)
		});
		input.placeholder = placeholder;
		input.onkeyup = () => {
			this.update();
		};
		this.elements[this.format_name(name)] = input;
	}
	
	add_controls(node)
	{
		// note: Reuse audio CSS for convenience
		this.elements.string_output = add_to(node, "div", {
			cls:["audio-inner-container"]
		});
		let container = add_to(node, "div", {
			cls:["audio-inner-container"]
		});
		for(const elem of YoutubeSearch.c_output)
		{
			if(elem.group ?? false)
			{
				container = add_to(node, "div", {
					cls:["audio-inner-container"]
				});
				if(elem.icon)
				{
					add_to(
						container,
						"img",
						{
							cls:["tab-button-icon"]
						}
					).src = "assets/ui/youtube_search/" + elem.icon;
				}
				container.appendChild(document.createTextNode(elem.label));
				container = add_to(node, "div", {
					cls:["audio-inner-container"]
				});
			}
			else
			{
				add_to(container, "button", {
					cls:["audio-button", "tool-audio-btn-maxwidth"],
					innertext:elem.label,
					onclick:() => {
						this.button_action(elem.mode);
					}
				});
			}
		}
	}
	
	format_name(str)
	{
		return str.toLowerCase().replaceAll(" ", "").replaceAll('"', "").replaceAll("/", "");
	}
	
	update()
	{
		let words = [];
		if(this.elements.granblue.classList.contains("audio-button-enabled"))
			words.push("グラブル");
		if(this.selecteds.raid != null)
			words.push(this.selecteds.raid.jp);
		if(this.selecteds.element != null)
			words.push(this.selecteds.element.jp);
		if(this.selecteds.job != null)
			words.push(this.selecteds.job.jp);
		if(this.elements.omegamagna.classList.contains("audio-button-enabled"))
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
			if(/^[0-9.]+$/.test(honor))
			{
				honor = parseFloat(honor) * multiplier;
				if(!isNaN(honor))
				{
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
						honor = "" + Math.floor(honor);
					}
					words.push(honor);
				}
			}
		}
		let turn = this.elements.turn.value.toLowerCase().trim();
		if(turn != "")
		{
			if(/^[0-9]+$/.test(turn))
			{
				turn = parseInt(turn)
				if(!isNaN(turn))
				{
					words.push("" + turn + "ターン");
				}
			}
		}
		this.output = words.join(" ");
		this.elements.string_output.textContent = this.output;
	}
	
	button_action(mode)
	{
		switch(mode)
		{
			case "copy":
			{
				this.copy_clipboard();
				break;
			}
			case "youtube-relevant":
			case "youtube-popular":
			case "youtube-recent":
			{
				this.open_youtube(mode);
				break;
			}
			case "twitter-relevant":
			case "twitter-popular":
			{
				this.open_twitter(mode);
				break;
			}
		}
	}
	
	copy_clipboard()
	{
		try
		{
			if(this.output == "")
			{
				push_popup("Select a raid or an option first.");
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
	
	open_youtube(mode)
	{
		if(this.output == "")
		{
			push_popup("Select some options first.");
		}
		else
		{
			let extra = "";
			switch(mode)
			{
				case "youtube-relevant":
				{
					extra = "";
					break;
				}
				case "youtube-popular":
				{
					extra = "&sp=CAMSAhAB";
					break;
				}
			}
			const a = document.createElement("a");
			a.href = "https://www.youtube.com/results?search_query=" + this.output + extra;
			a.target = "_blank";
			a.rel = "noopener noreferrer";
			a.click();
		}
	}
	
	open_twitter(mode)
	{
		if(this.output == "")
		{
			push_popup("Select some options first.");
		}
		else
		{
			let extra = "";
			switch(mode)
			{
				case "twitter-relevant":
				{
					extra = "";
					break;
				}
				case "twitter-popular":
				{
					extra = "&f=live";
					break;
				}
			}
			const a = document.createElement("a");
			a.href = "https://x.com/search?q=" + this.output + extra;
			a.target = "_blank";
			a.rel = "noopener noreferrer";
			a.click();
		}
	}
}

tool_constructors[YoutubeSearch.c_key] = YoutubeSearch;