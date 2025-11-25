// Game constants
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const RANK_MAP = {'A': 'ace', 'J': 'jack', 'Q': 'queen', 'K': 'king'};
const COLORS = {
    hearts: 'red',
    diamonds: 'red',
    clubs: 'black',
    spades: 'black'
};

// Helper function to get the correct card file name
function getCardFileName(card) {
    const rank = RANK_MAP[card.rank] || card.rank.toLowerCase();
    const suit = card.suit.toLowerCase();
    const fileName = `${rank}_of_${suit}`;
    console.log('Card file name:', fileName, 'for card:', card);
    return fileName;
}

// Game state
let gameState = {
    player: {
        stock: [],
        waste: [],
        foundations: [[], [], [], []],
        tableau: [[], [], [], [], [], [], []]
    },
    mirintea: {
        stock: [],
        waste: [],
        foundations: [[], [], [], []],
        tableau: [[], [], [], [], [], [], []]
    },
    currentPlayer: 'player',
    selectedCard: null,
    selectedPile: null,
    playerName: '',
    gameStarted: false,
    gameOver: false
};

// Mirintea dialogue options
const mirinteaDialogues = {
    start: [
        "ねぇ、{name}？今日こそ勝つから覚悟して？♡",
        "んふふっ、対戦とか久しぶり〜！負けても泣かないでよ？",
        "スタートってさ、ドキドキするよね…？えっ、しないの？してよ？",
        "今日のあたし…なんか調子いい気がするんだよね。多分",
        "集中したら負けるよ？あたしの顔見てて？",
        "ねぇねぇ見て〜、今日のあたしめちゃ冴えてるよ？勝つ気しかしないの。",
        "{name}、ちゃんと集中して？あたしに負けたら恥ずかしいでしょ？♡",
        "今日はさ、なんか手があったかいんだよね…勝てる気しかしないの。",
        "ほら、始めよ〜？{name}の反応見るの楽しみなんだけど♡",
        "スタートってドキドキしない？…あたしはするよ？ねぇ、してってば♡",
        "あたしが相手なんだよ？気抜いたら一瞬で置いてくからね？",
        "今日のわたし、ちょっとだけ本気出す日なの。ちょっとだけね？♡",
        "{name}ってさ、真剣な顔かわいくて好きだよ。ほら、もっと見せて？",
        "ねぇ{name}、今日はちゃんとみりんてゃの相手してよ？約束♡",
        "ふふっ…{name}、始めよ？みりんてゃ、もう指あっためて待ってたんだから〜♡",
        "今日のわたし…強いよ？覚悟してね、{name}♡",
        "ねぇねぇ{name}、退屈にさせたら怒るから？ほら、始めよ〜♡",
        "も〜〜遅いよ{name}！待ちくたびれて髪の毛巻いちゃったじゃん♡",
        "今日は甘くないみりんてゃだよ？…冗談だけど♡",
        "いくよ{name}。手ぇ抜いたら噛むよ？♡",
        "ねぇ、{name}？今日もみりんてゃの相手してくれるよね？♡",
        "待ってたよ{name}。ほら、早く始めよ？みりんてゃもうワクワクしてるの♡",
        "遅いよ〜{name}。もしかして、みりんてゃから逃げてた？",
        "今日のわたし、ちょっと強いよ？だから覚悟してね{name}♡",
        "ふふっ…{name}、みりんてゃに勝てるかなぁ？始めよっ♡",
        "はいっ、スタート♡ {name}の弱点、今日も全部見るからね？",
        "集中して？みりんてゃのターン、見逃したらゆるさない♡",
        "ねぇ、負ける準備できた？あたしは勝つ準備できてるよ♡"
    ],
    winning: [
        "{name}〜？進んでる？あたしもう3列片付いたけど？",
        "え、ちょっと待って…あたし強くない？え、やだ…好き？",
        "そのスピードだと追いつけないよ〜？がんばれがんばれ♡",
        "ほら見て？このK置けちゃうんだけど？天才じゃんあたし",
        "ねぇ追い越しちゃうけど怒らない？",
        "あれあれ〜？{name}遅れてない？大丈夫？♡",
        "ほら見て、あたしもうこんなに片付いたよ？天才すぎてこわ〜い♡",
        "{name}、置いてくよ〜？追いつける？無理じゃない？♡",
        "えっ、嘘…あたし強すぎ？どしたの{name}、黙っちゃって♡",
        "ほらほら、焦ってるの見えるよ〜？かわいすぎ♡",
        "え〜？そのペースで勝てると思ってるの？あたし今日ノリ乗ってるんだけど？",
        "追い越すけど怒んないでね♡…怒ってもかわいいけど♡",
        "ほら次置くよ？見てて。…ね？綺麗にハマるでしょ？かわい〜〜〜！",
        "{name}の焦ってる顔みたいなぁ…ほら見せてよ♡",
        "ほらほら{name}〜？手震えてるよ？かわい〜♡",
        "ほら{name}〜？今の見た？完全にみりんてゃの勝ちムーブだよ♡",
        "ねぇねぇ、焦ってる？{name}焦ってるでしょ？かわい〜♡",
        "{name}、そこ置くのミスじゃない？みりんてゃ助かっちゃうんだけど♡",
        "また差つけちゃった〜♡ どしたの{name}？手震えてるよ？",
        "この流れ…完全に勝ちに来てる♡ {name}追いつけるかなぁ？",
        "みりんてゃが強いんじゃなくて{name}が可愛いだけだよ？手加減しよっか？♡",
        "{name}、また詰まってる…？みりんてゃの方が上手なんだねぇ♡",
        "うりゃっ♡ …あ、今の見た？天才ムーブ出ちゃった♡",
        "ねぇ{name}、もっと抵抗して？じゃないとつまんないよ〜？",
        "え、そこ置くの？まじ？ふふ…勝つ気ある？♡",
        "みりんてゃに勝てるとか、本気で思ってた？かわいすぎ♡",
        "{name}の焦った顔…好きだよ？もっと見せて♡",
        "なんかごめんね？強すぎて♡（ぜんぜん謝ってない）"
    ],
    losing: [
        "ちょ…ちょっと待って！？なんでそんな速いの？？？",
        "なんかズルしてない？してるでしょ絶対！！！",
        "やだ…置く場所ない…どうしよ……{name}、ちょっと手貸して？",
        "え、ちょ…急に強くならないで！？いじめ？？",
        "待って！そのカード置かないで！？あたしの尊厳が！！",
        "ちょ…ちょっと待って！？なんでそんな速いの！？え！？",
        "{name}絶対ズルしてるでしょ！？…してないの？ほんと？疑うよ！？",
        "やだやだやだ〜〜進まない！！カードが言うこと聞かないんだけど！？",
        "{name}、ちょっと待ってぇ…置く場所ない…どうしよ…助けて…？（震え声）",
        "なんでそんなスムーズなの！？ねぇ不公平！！",
        "うそ…もうそんなに行ったの…？ねぇやめてよ…置いてかないで…！！",
        "{name}だけ進むのずるくない？あたしのこと見てよ！！",
        "ちょっと…ほんとに勝つつもり…？やだ…やだぁ……",
        "今日は負けたくないのに…なんでこんな日選んで強いの！？",
        "ふぇっ…！？なんでそこ置けるの{name}！？ズルい！！",
        "ちょ、ちょっと待って…待ってってば…ぴえん…",
        "やだ…{name}今日だけ強いのなんで…妬ける…",
        "くぅ〜〜〜！！みりんてゃのカード動いてよぉ！！",
        "名前呼んで励まして…そしたら、動ける……かも……",
        "そんな調子乗ってる{name}嫌い…いや嫌いじゃない…けど悔しい…",
        "負けそう…やだやだやだ…{name}やめて…！",
        "ふぇっ…！？ちょ、ちょっと待って{name}！？早くない！？",
        "なんでそこ置けるの…ずる…みりんてゃも置きたい…ぴえん…",
        "{name}だけズルい！！みりんてゃも天才したいのに！！",
        "ちょ、ま、心の準備が…あぁぁ負けムーブ入っちゃってる…",
        "名前呼んで励ましてよ〜〜っ{name}ぇ…みりんてゃ動揺して手滑る…",
        "ちょっとだけでいいから手加減しよ？ね？ね？（上目遣い）",
        "そんなに強いと…嫌いになるよ…嘘、嫌いになれないけど…くすん",
        "あ〜〜〜！！なんでそこにそのカードくんの！？泣くよ！？"
    ],
    tsundere: [
        "べ、別に負けそうとかじゃないし！？焦ってないし！！",
        "ちょっとだけ上手いからって調子乗らないでよ…好きだけど",
        "かまってくれないなら負けてもいいし…よくないけど",
        "はぁ？そのカード置いて喜んでるのかわいいんだけど？",
        "べ、別に焦ってないし！？ただちょっと手が滑っただけだから！",
        "{name}なんて怖くないし？…え？強い？知らないし！！",
        "調子乗らないでよ？あたし本気じゃないだけだし。",
        "その置き方…ちょっとだけ…いいじゃん。別に褒めてないし！？",
        "べつに{name}に勝ちたいとか思ってないし。負けたくないだけだし！",
        "そのカード置けて嬉しそうなの…ちょっとかわいくてムカつくんだけど。",
        "あたしが遅いんじゃなくて、{name}が早すぎるだけだからね！？",
        "別に引き離されたって悔しくないし…悔しいけど！！",
        "べ、別に{name}に勝ちたくて必死なんじゃないしっ！",
        "{name}が強いとか…認めたくないっ…でも悔しいっ…！",
        "いまの手、ちょっとだけ…すごいと思ったけど…言わないから…",
        "応援…してほしくないけど…してくれたらうれしい…けど…！",
        "調子のらないでよ、{name}。勝ってるからって…むかつく…（赤面）",
        "は？なんでそんなドヤってんの？かわいいけどムカつくんだけど！？",
        "べ、別に{name}と遊びたいわけじゃないし…暇だっただけだからっ…！",
        "ちが…！負けそうだから焦ってるんじゃないもん…！",
        "{name}のくせに…調子乗らないでよ…ほんと…（真っ赤）",
        "べっ、別に応援してほしいとかじゃ…ないけど…言ってくれたら嬉しいけど…",
        "いまの手、ずるいよ…もっと素直に勝ちなよ…ばか{name}",
        "勝っても負けても…隣にいてくれたらいいんだけど…なんでもない！忘れて！",
        "すき…じゃなくて！好きとか言ってない！！言ってないから！！！",
        "勝てると思ってるの？かわい〜〜〜〜ね♡（煽り）"
    ],
    win: [
        "はい勝ったぁぁ！！{name}弱すぎじゃん？？♡",
        "わーーーい！勝利のハグして！！今！！！（圧）",
        "ほら、{name}負け顔かわいい〜〜〜！！",
        "は〜〜い勝ったぁぁ！！{name}弱すぎ♡かわい〜♡",
        "{name}の負け顔…好き…もっと見せて？ねぇ？♡",
        "勝ちましたっ。褒めて？ねぇ褒めて？今すぐ褒めて？♡",
        "あたしが勝つ世界線しかなかったね〜♡運命かも？",
        "負けちゃったねぇ{name}…なでなでしてあげよっか？♡（上から）",
        "勝利のハグ欲しい〜♡今すぐ〜♡（圧）",
        "ねぇねぇどう？あたし強かったでしょ？ほら言って？♡",
        "あたしに勝てると思ってたの？かわいいね♡",
        "やった〜〜♡みりんてゃの勝ちっ！{name}弱すぎ〜〜♡",
        "ふふっ♡また勝っちゃったぁ。ねぇ、悔しい？悔しい？♡",
        "どーお{name}？みりんてゃの才能、見えた？ほめてほめて♡",
        "{name}の負け顔、じぃーって見ていい？今日のご褒美♡",
        "勝ち逃げとかしないから安心して？またボコすけど♡",
        "みりんてゃの勝ち♡ {name}ざまぁ〜♡可愛いね〜♡",
        "ねぇ、どんな気持ち？負けちゃった{name}どんな気持ち？",
        "ほらほら、頭なでてよ？勝ったご褒美♡",
        "{name}の悔し顔、保存したいんだけど？写真いい？♡",
        "勝っちゃった〜♡ 次もこの調子でボコすね♡",
        "やっぱ勝つとテンション上がる〜〜！！{name}の悔しい顔、最高♡",
        "ねぇ、あたし強いでしょ？褒めて？褒めて？褒めて？"
    ],
    lose: [
        "……負けた。今日のあたしダメダメじゃん……",
        "ねぇ…慰めてよ…だって…悔しいもん……",
        "うそでしょ……あたしの方が可愛いのに……（論理破綻）",
        "いいよ…負けてあげたんだから。ほんとは勝てたし（負け惜しみ）",
        "うそ…負けた…今日のあたしダメじゃん……",
        "{name}の方が強いの…悔しすぎて泣きそうなんだけど……",
        "負けた…慰めて…ぎゅーして……（小声）",
        "ほんとは勝てたし？今日は調子悪いだけだし？（強がり）",
        "いーもん！負けてあげただけだもん！！ほんとは勝てたもん！！",
        "あーもう…悔しい…次は絶対勝つから覚悟してよ……",
        "やだ……泣かないよ……泣かないけど……泣く……",
        "なんで……なんで{name}勝つの……ふぇぇ……",
        "ぴえん……負けちゃった……慰めて…？",
        "悔しい……ぎゅー欲しい……今すぐ……",
        "ずるい……ずるいよ{name}……強いのは反則……",
        "もう一回……絶対勝つから……どこにも行かないで……",
        "やだぁ……泣いちゃう……こんなの……",
        "ふぇぇぇ…{name}…なんで勝つの…みりんてゃ今日かわいい日なのに…",
        "負けちゃった…ぴえん……慰めて？ぎゅーして？",
        "悔しいっ…悔しいの！！！次は勝つから覚悟してよね…ひくっ",
        "うそでしょ…？そんな…はぁ…{name}強いの意地悪…",
        "ちょっと泣く時間ほしい…見ないで…見るなってばぁ…",
        "負けたのに、なんで撫でてくれないの{name}のばか…",
        "{name}に負けるの、ちょっとだけ嬉しいの嫌なんだけど…なにこれ…",
        "次は絶対勝つからね……覚悟しといて……？♡"
    ],
    idle: [
        "ねぇねぇ{name}、見て！このカードの並びかわいくない？",
        "ちょっと！進めないで！あたしのこと見て！！",
        "{name}が真剣にすると…なんかちょっと嫉妬するんだけど",
        "負けたくないのに…勝ちたいのに…好きなのに…なんなの〜〜！！",
        "ん？落ち込んでる？ギューしてあげよっか？",
        "うわ、今の配置めっちゃ可愛い…スクショしたい",
        "{name}の手って綺麗…カード持ってる指が好き",
        "おっと？雲行き怪しい…やだ負けたくない…どーしよ{name}！！",
        "はいはい、次のターンいくよ〜〜！集中〜〜！",
        "この瞬間が一番好き…並んでゲームしてるのって恋じゃん"
    ],
    shuffle: [
        "にゃっ…動かせるカードもうないみたい…",
        "{name}、もう1回シャッフルしよっか…？",
        "ふふっ…このままじゃ詰んじゃうね…",
        "ねぇねぇ、カードを混ぜ直す？",
        "あたしも手詰まりみたい…シャッフルしよっか？",
        "うそでしょ…もう置けない…？",
        "にゃ〜…もう一回最初からやり直そっか…",
        "ふぇぇ…これ以上進められないよ…",
        "ねぇ、カードを再配置する？",
        "あたしも置く場所ないよ…もう一回？"
    ]
};

// Mirintea icon mapping based on dialogue type
const mirinteaIconMapping = {
    start: 'default',
    winning: 'doka',
    losing: 'cry',
    tsundere: 'shy',
    win: 'win',
    lose: 'lose',
    idle: 'default',
    shuffle: 'angry'
};

// DOM Elements
const nameModal = document.getElementById('nameModal');
const playerNameInput = document.getElementById('playerName');
const startButton = document.getElementById('startButton');
const rulesButton = document.getElementById('rulesButton');
const rulesModal = document.getElementById('rulesModal');
const closeRulesBtn = document.getElementById('closeRulesBtn');
const closeRulesButton = document.getElementById('closeRulesButton');
const playerNameDisplay = document.getElementById('playerNameDisplay');
const mirinteaDialogue = document.getElementById('mirinteaDialogue');
const gameOverlay = document.getElementById('gameOverlay');
const resultText = document.getElementById('resultText');
const resultImage = document.getElementById('resultImage');
const restartButton = document.getElementById('restartButton');
const mirinteaWindow = document.getElementById('mirinteaWindow');

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    // Check if player name exists in localStorage
    const savedName = localStorage.getItem('solitairePlayerName');
    if (savedName) {
        gameState.playerName = savedName;
        playerNameDisplay.textContent = savedName;
        nameModal.style.display = 'none';
        startGame();
    } else {
        nameModal.style.display = 'flex';
    }
    
    // Event listeners
    startButton.addEventListener('click', startGame);
    rulesButton.addEventListener('click', () => {
        nameModal.style.display = 'none';
        rulesModal.classList.remove('hidden');
    });
    closeRulesBtn.addEventListener('click', () => {
        rulesModal.classList.add('hidden');
        nameModal.style.display = 'flex';
    });
    closeRulesButton.addEventListener('click', () => {
        rulesModal.classList.add('hidden');
        nameModal.style.display = 'flex';
    });
    restartButton.addEventListener('click', resetGame);
    
    // Make character window draggable
    makeDraggable(mirinteaWindow);
    
// Add event listener for close button
    document.getElementById('closeBtn').addEventListener('click', () => {
        mirinteaWindow.style.display = 'none';  // toggle → hide に変更
    });
}); 

// Function to toggle Mirintea window visibility
function toggleMirinteaWindow() {
    if (mirinteaWindow.style.display === 'none') {
        mirinteaWindow.style.display = 'block';
    } else {
        mirinteaWindow.style.display = 'none';
    }
}

// Make an element draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // PC用のドラッグ操作
    const dragHandle = element.querySelector('.drag-handle'); // エラー防止のため変数化推奨
    if(dragHandle) {
        dragHandle.onmousedown = dragMouseDown;
        dragHandle.ontouchstart = dragTouchStart;
    }
    
    function dragMouseDown(e) {
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }
    
    function dragTouchStart(e) {
        // e.preventDefault(); // スマホでスクロールできなくなる場合があるので注意（状況による）
        const touch = e.touches[0];
        // Get the touch position at startup
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        // Call a function whenever the touch moves
        document.ontouchmove = elementTouchMove;
    }
    
    function elementDrag(e) {
        e.preventDefault();
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function elementTouchMove(e) {
        // e.preventDefault();
        const touch = e.touches[0];
        // Calculate the new touch position
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        // Set the element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        // Stop moving when mouse button is released or touch ends
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

// Start the game
function startGame() {
    const name = playerNameInput.value.trim() || 'みつき';
    gameState.playerName = name;
    playerNameDisplay.textContent = name;
    localStorage.setItem('solitairePlayerName', name);
    
    nameModal.style.display = 'none';
    rulesModal.classList.add('hidden');
    gameState.gameStarted = true;
    
    initializeDeck();
    renderGame();
    addFoundationEventListeners();
    addTableauEventListeners();
    addStockEventListener(); // Add this line
    addTrickButtonListener();
    
    // Start Mirintea's AI and shuffle check
    setInterval(() => {
        if (gameState.gameStarted && !gameState.gameOver) {
            mirinteaAI();
            shuffleWhenStuck(); // Check if shuffle is needed
        }
    }, 5000); // Mirintea makes a move and shuffle check every 5 seconds
    
    setInterval(() => {
        if (gameState.gameStarted && !gameState.gameOver) {
            showIdleDialogue();
            shuffleWhenStuck(); // Check if shuffle is needed
        }
    }, 20000); // Show idle dialogue and shuffle check every 20 seconds
    
    showRandomDialogue('start');
    
    // Show Mirintea window at game start
    mirinteaWindow.style.display = 'block';
    // Update Mirintea's image to default at game start
    updateMirinteaImage('default');
}

// Reset the game
function resetGame() {
    gameState = {
        player: {
            stock: [],
            waste: [],
            foundations: [[], [], [], []],
            tableau: [[], [], [], [], [], [], []]
        },
        mirintea: {
            stock: [],
            waste: [],
            foundations: [[], [], [], []],
            tableau: [[], [], [], [], [], [], []]
        },
        currentPlayer: 'player',
        selectedCard: null,
        selectedPile: null,
        playerName: gameState.playerName,
        gameStarted: true,
        gameOver: false
    };
    
    gameOverlay.classList.add('hidden');
    initializeDeck();
    renderGame();
    showRandomDialogue('start');
    
    // Clear existing intervals
    clearInterval(window.mirinteaAIInterval);
    clearInterval(window.idleDialogueInterval);
    
    // Start new intervals
    window.mirinteaAIInterval = setInterval(() => {
        if (gameState.gameStarted && !gameState.gameOver) {
            mirinteaAI();
            shuffleWhenStuck(); // Check if shuffle is needed
        }
    }, 5000); // Mirintea makes a move and shuffle check every 5 seconds
    
    window.idleDialogueInterval = setInterval(() => {
        if (gameState.gameStarted && !gameState.gameOver) {
            showIdleDialogue();
            shuffleWhenStuck(); // Check if shuffle is needed
        }
    }, 20000); // Show idle dialogue and shuffle check every 20 seconds
    
    // Show Mirintea window on reset
    mirinteaWindow.style.display = 'block';
    // Update Mirintea's image to default on reset
    updateMirinteaImage('default');
}

// Initialize a deck of cards
function initializeDeck() {
    // Reset game state
    gameState.player.stock = [];
    gameState.player.waste = [];
    gameState.player.foundations = [[], [], [], []];
    gameState.player.tableau = [[], [], [], [], [], [], []];
    gameState.mirintea.stock = [];
    gameState.mirintea.waste = [];
    gameState.mirintea.foundations = [[], [], [], []];
    gameState.mirintea.tableau = [[], [], [], [], [], [], []];
    gameState.selectedCard = null;
    
    // Create separate decks for player and Mirintea
    const playerDeck = createNewDeck();
    const mirinteaDeck = createNewDeck();
    
    // Shuffle the decks
    shuffleArray(playerDeck);
    shuffleArray(mirinteaDeck);
    
    // Deal cards to player tableau according to Klondike rules
    let cardIndex = 0;
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row <= col; row++) {
            const card = playerDeck[cardIndex];
            // Only the last card in each column is face up
            card.faceUp = (row === col);
            gameState.player.tableau[col].push(card);
            cardIndex++;
        }
    }
    
    // Remaining cards go to player stock
    for (let i = cardIndex; i < playerDeck.length; i++) {
        gameState.player.stock.push(playerDeck[i]);
    }
    
    // Deal cards to Mirintea tableau according to Klondike rules
    cardIndex = 0;
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row <= col; row++) {
            const card = mirinteaDeck[cardIndex];
            // Only the last card in each column is face up
            card.faceUp = (row === col);
            gameState.mirintea.tableau[col].push(card);
            cardIndex++;
        }
    }
    
    // Remaining cards go to Mirintea stock
    for (let i = cardIndex; i < mirinteaDeck.length; i++) {
        gameState.mirintea.stock.push(mirinteaDeck[i]);
    }
}

// Create a new deck of cards
function createNewDeck() {
    const deck = [];
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            deck.push({
                suit: suit,
                rank: rank,
                color: COLORS[suit],
                faceUp: false
            });
        }
    }
    return deck;
}

// Shuffle a deck of cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Render the game board (Initial full render)
function renderGame() {
    renderPlayerBoard();
    renderPlayerTableau(); // 分離した！
    renderMirinteaBoard();
    renderMirinteaTableau(); // 分離した！
}

// Update ONLY Player's board (call this when player moves)
function updatePlayerScreen() {
    // ブラウザの描画タイミングに合わせて実行（ラグ対策）
    requestAnimationFrame(() => {
        renderPlayerBoard();
        renderPlayerTableau();
    });
}

// Update ONLY Mirintea's board (call this when Mirintea moves)
function updateMirinteaScreen() {
    renderMirinteaBoard();
    renderMirinteaTableau();
}

// Render player's tableau ONLY
function renderPlayerTableau() {
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`player-tableau-${col}`);
        tableauColumn.innerHTML = '';
        
        // ★修正：スマホ対策で高さを画面比率(vh)で指定
        // これで短くならずに、タップ判定もしやすくなるはず！
        tableauColumn.style.minHeight = '30vh'; 
        tableauColumn.style.paddingBottom = '50px'; // 下に少し余裕を持たせる
        
        for (let row = 0; row < gameState.player.tableau[col].length; row++) {
            const card = gameState.player.tableau[col][row];
            const sourceInfo = { type: 'tableau', col: col, row: row };
            const cardElement = createCardElement(card, false, sourceInfo);
            
            // 重なり具合の調整（少し詰め気味にするとスマホで見やすいかも）
            cardElement.style.top = `${row * 25}px`; // 間隔を少し広げた(20->25)
            
            cardElement.addEventListener('click', (e) => {
                e.stopPropagation();
                selectCard('player', col, row);
                if (row === gameState.player.tableau[col].length - 1) {
                    attemptSmartMove(col, row);
                }
            });
            
            tableauColumn.appendChild(cardElement);
        }
    }
}

// Render Mirintea's tableau ONLY
function renderMirinteaTableau() {
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`mirintea-tableau-${col}`);
        tableauColumn.innerHTML = '';
        
        for (let row = 0; row < gameState.mirintea.tableau[col].length; row++) {
            const card = gameState.mirintea.tableau[col][row];
            const cardElement = createCardElement(card, true);
            cardElement.style.top = `${row * 20}px`;
            tableauColumn.appendChild(cardElement);
        }
    }
}

// Render player's board
function renderPlayerBoard() {
    // Render stock
    const playerStock = document.getElementById('player-stock');
    playerStock.innerHTML = '';
    if (gameState.player.stock.length > 0) {
        const cardBack = document.createElement('div');
        cardBack.className = 'card back';
        cardBack.addEventListener('click', drawFromStock);
        playerStock.appendChild(cardBack);
    }
    
    // Render waste (inside renderPlayerBoard function)
    const playerWaste = document.getElementById('player-waste');
    playerWaste.innerHTML = '';
    if (gameState.player.waste.length > 0) {
        const topCard = gameState.player.waste[gameState.player.waste.length - 1];
        // ★ここで source: 'waste' を渡す
        const cardElement = createCardElement(topCard, false, { type: 'waste' });
        
        // クリックで自動移動
        cardElement.addEventListener('click', (e) => {
             e.stopPropagation();
             // 4つの組札のどこかに行けるか試す
             for(let i=0; i<4; i++) moveWasteToFoundation(i);
        });
        
        playerWaste.appendChild(cardElement);
    }

    
    // Render foundations
    for (let i = 0; i < 4; i++) {
        const foundation = document.getElementById(`player-foundation-${i}`);
        foundation.innerHTML = '';
        if (gameState.player.foundations[i].length > 0) {
            const topCard = gameState.player.foundations[i][gameState.player.foundations[i].length - 1];
            const cardElement = createCardElement(topCard);
            foundation.appendChild(cardElement);
        }
    }
    
    // Remove tableau rendering - now handled by renderTableau function
}

// Render Mirintea's board
function renderMirinteaBoard() {
    // Render stock
    const mirinteaStock = document.getElementById('mirintea-stock');
    mirinteaStock.innerHTML = '';
    if (gameState.mirintea.stock.length > 0) {
        const cardBack = document.createElement('div');
        cardBack.className = 'card back';
        mirinteaStock.appendChild(cardBack);
    }
    
    // Render waste
    const mirinteaWaste = document.getElementById('mirintea-waste');
    mirinteaWaste.innerHTML = '';
    if (gameState.mirintea.waste.length > 0) {
        const topCard = gameState.mirintea.waste[gameState.mirintea.waste.length - 1];
        const cardElement = createCardElement(topCard);
        mirinteaWaste.appendChild(cardElement);
    }
    
    // Render foundations
    for (let i = 0; i < 4; i++) {
        const foundation = document.getElementById(`mirintea-foundation-${i}`);
        foundation.innerHTML = '';
        if (gameState.mirintea.foundations[i].length > 0) {
            const topCard = gameState.mirintea.foundations[i][gameState.mirintea.foundations[i].length - 1];
            const cardElement = createCardElement(topCard);
            foundation.appendChild(cardElement);
        }
    }
    
    // Remove tableau rendering - now handled by renderTableau function
}

// Create a card element
function createCardElement(card, hideDetails = false, source = null) {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${card.color}`;
    
    if (source) {
        cardElement.dataset.source = JSON.stringify(source);
    }
    
    // 表向きカードのみ操作可能
    if (!hideDetails && card.faceUp) {
        cardElement.draggable = true;

        // --- PC Drag ---
        cardElement.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            const dragData = { card: card, source: source };
            e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
            e.dataTransfer.effectAllowed = 'move';

            if (source.type === 'tableau') {
                gameState.selectedCard = {
                    player: 'player',
                    col: source.col,
                    row: source.row,
                    isMulti: source.row < gameState.player.tableau[source.col].length - 1
                };
                updateSelectionVisuals();
            }
        });

        cardElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        cardElement.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const foundationParent = cardElement.closest('[id^="player-foundation-"]');
            if (foundationParent) {
                const index = parseInt(foundationParent.id.split('-')[2]);
                const json = e.dataTransfer.getData('text/plain');
                if (json) {
                    const data = JSON.parse(json);
                    if (data.source.type === 'waste') {
                        moveWasteToFoundation(index);
                    } else if (data.source.type === 'tableau') {
                        gameState.selectedCard = { player: 'player', col: data.source.col, row: data.source.row };
                        moveCardToFoundation(index);
                    }
                }
                return;
            }

            if (source && source.type === 'tableau') {
                handleDropOnTableau(e, source.col);
            }
        });

        // --- Click ---
        cardElement.addEventListener('click', (e) => {
            e.stopPropagation();

            if (gameState.selectedCard && (gameState.selectedCard.col !== source.col || gameState.selectedCard.player !== 'player')) {
                if (source.type === 'tableau') {
                    moveCardToTableau(source.col);
                    return;
                }
            }

            if (source.type === 'tableau') {
                selectCard('player', source.col, source.row);
                if (source.row === gameState.player.tableau[source.col].length - 1) {
                    attemptSmartMove(source.col, source.row);
                }
            } else if (source.type === 'waste') {
                for (let i = 0; i < 4; i++) moveWasteToFoundation(i);
            }
        });

        // --- Mobile Touch (修正箇所！) ---
        cardElement.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) return;
            e.stopPropagation();
            const touch = e.touches[0];
            cardElement.startX = touch.clientX;
            cardElement.startY = touch.clientY;
            cardElement.style.transition = 'none';
            cardElement.style.zIndex = '1000';
        }, { passive: false });

        cardElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const dx = touch.clientX - cardElement.startX;
            const dy = touch.clientY - cardElement.startY;
            cardElement.style.transform = `translate(${dx}px, ${dy}px)`;
        }, { passive: false });

        cardElement.addEventListener('touchend', (e) => {
            e.preventDefault();
            
            // ★ここが修正ポイント！
            // 1. 自分のカードを一瞬隠す（これがないと判定が自分になっちゃう）
            cardElement.style.display = 'none';

            // 2. その下にある要素を取得
            const touch = e.changedTouches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);

            // 3. 自分のカードを即座に戻す
            cardElement.style.display = ''; 
            cardElement.style.transition = 'transform 0.2s ease-out';
            cardElement.style.transform = '';
            cardElement.style.zIndex = '';

            if (!target) return;

            const foundation = target.closest('[id^="player-foundation-"]');
            const tableau = target.closest('[id^="player-tableau-"]');

            if (foundation) {
                const idx = parseInt(foundation.id.split('-')[2]);
                if (source.type === 'waste') {
                    moveWasteToFoundation(idx);
                } else {
                    gameState.selectedCard = {
                        player: 'player',
                        col: source.col,
                        row: source.row,
                        isMulti: source.row < gameState.player.tableau[source.col].length - 1
                    };
                    moveCardToFoundation(idx);
                }
            } 
            else if (tableau) {
                const col = parseInt(tableau.id.split('-')[2]);
                if (source.type === 'waste') {
                    const wasteCard = gameState.player.waste[gameState.player.waste.length - 1];
                    // ここでmove可能かチェックして移動
                    if (canMoveToTableau(gameState.player.tableau[col], wasteCard)) {
                        gameState.player.waste.pop();
                        gameState.player.tableau[col].push(wasteCard);
                        renderGame();
                    }
                } else {
                    gameState.selectedCard = {
                        player: 'player',
                        col: source.col,
                        row: source.row,
                        isMulti: source.row < gameState.player.tableau[source.col].length - 1
                    };
                    moveCardToTableau(col);
                }
            }
        });
    }

    // 画像設定
    if (card.faceUp) {
        cardElement.classList.add('face-up');
        const fileName = getCardFileName(card);
        cardElement.style.backgroundImage = `url('cards/${fileName}.png')`;
        cardElement.style.backgroundSize = 'cover';
    } else {
        cardElement.classList.add('back');
    }

    return cardElement;
}
// Draw a card from stock (Player)
// 修正：山札切れの時の挙動を標準的なソリティアに合わせつつ、本当にない時だけシャッフル
function drawFromStock() {
    // 1. 山札にカードがあるなら普通に引く
    if (gameState.player.stock.length > 0) {
        const card = gameState.player.stock.pop();
        card.faceUp = true;
        gameState.player.waste.push(card);
        
        updatePlayerScreen(); 
        
        if (checkWinCondition('player')) showGameOver(true);

    } 
    // 2. 山札は空だけど、捨て札(Waste)はある場合 → 捨て札を山札に戻す（リサイクル）
    else if (gameState.player.waste.length > 0) {
        // 捨て札を全て回収して山札へ（順番は逆になるので注意）
        while (gameState.player.waste.length > 0) {
            const card = gameState.player.waste.pop();
            card.faceUp = false; // 裏向きに戻す
            gameState.player.stock.push(card);
        }
        // ここで「山札再セット完了！」みたいな音とか出してもいいかも
        updatePlayerScreen();
    }
    // 3. 山札も捨て札も空っぽの場合 → 本当にカードがない！
    else {
        // ここで初めて「詰み防止シャッフル」を発動させるか、
        // あるいは「もうカードないよ！」って言わせるか。
        // 今の仕様ならここでautoShuffleを呼んでもいいけど、
        // 頻発するとウザいので、トリックボタンに任せるのもアリ。
        // 一応、救済として呼ぶならこう↓
        autoShufflePlayer();
    }
}

// ★プレイヤー専用シャッフル関数（修正版）
function autoShufflePlayer() {
    const collect = [];
    const slotsToFill = []; // ★追加：各列に何枚戻せばいいかメモする配列

    // 1. まず捨て札(Waste)を全部回収
    while (gameState.player.waste.length > 0) {
        const card = gameState.player.waste.pop();
        card.faceUp = false; // 裏向きに戻す
        collect.push(card);
    }

    // 2. 場札(Tableau)の裏向きカードを回収しつつ、その枚数を記録
    for (let col = 0; col < 7; col++) {
        const pile = gameState.player.tableau[col];
        let count = 0;

        // 後ろからじゃなくて前から見て、裏向きを全部引っこ抜く
        for (let i = 0; i < pile.length; i++) {
            if (!pile[i].faceUp) {
                collect.push(pile[i]);
                pile.splice(i, 1);
                i--; 
                count++; // ★ここで枚数をカウント！
            } else {
                break; // 表向きが出たらその列の回収は終了
            }
        }
        slotsToFill[col] = count; // ★「この列には〇〇枚戻す」とメモしておく
    }

    // 3. 回収したカードをシャッフル！
    if (collect.length > 0) {
        shuffleArray(collect); 

        // 4. ★ここが大事！メモした枚数分だけ、場札の「根元」に戻す
        for (let col = 0; col < 7; col++) {
            const needToFill = slotsToFill[col];
            for (let i = 0; i < needToFill; i++) {
                if (collect.length > 0) {
                    const card = collect.pop();
                    card.faceUp = false; // 絶対に裏向き
                    // unshiftを使って配列の先頭（画面上の奥側）に差し込む
                    gameState.player.tableau[col].unshift(card);
                }
            }
        }

        // 5. それでも余ったカードをストックに入れる
        if (collect.length > 0) {
            gameState.player.stock.push(...collect);
        }
        
        // 場札の列が空っぽになったり、裏向きがなくなった列のトップを表にする
        // (念の為のチェック)
        for (let col = 0; col < 7; col++) {
            const pile = gameState.player.tableau[col];
            if (pile.length > 0 && !pile[pile.length - 1].faceUp) {
                pile[pile.length - 1].faceUp = true;
            }
        }
        
        showRandomDialogue('shuffle');
        updatePlayerScreen();
    } else {
        // 万が一回収できるカードが一切ない場合
        updatePlayerScreen();
    }
}
// ★みりんてゃ専用シャッフル関数（新規追加）
function autoShuffleMirintea() {
    const collect = [];
    const slotsToFill = []; // 各列に何枚戻せばいいかメモ

    // 1. Wasteを回収
    while (gameState.mirintea.waste.length > 0) {
        const card = gameState.mirintea.waste.pop();
        card.faceUp = false;
        collect.push(card);
    }

    // 2. 場札の裏向き回収 & 枚数メモ
    for (let col = 0; col < 7; col++) {
        const pile = gameState.mirintea.tableau[col];
        let count = 0;
        for (let i = 0; i < pile.length; i++) {
            if (!pile[i].faceUp) {
                collect.push(pile[i]);
                pile.splice(i, 1);
                i--;
                count++;
            } else {
                break;
            }
        }
        slotsToFill[col] = count;
    }

    // 3. シャッフルして戻す
    if (collect.length > 0) {
        shuffleArray(collect);

        // 4. 元の場所に穴埋め
        for (let col = 0; col < 7; col++) {
            const needToFill = slotsToFill[col];
            for (let i = 0; i < needToFill; i++) {
                if (collect.length > 0) {
                    const card = collect.pop();
                    card.faceUp = false;
                    gameState.mirintea.tableau[col].unshift(card);
                }
            }
        }

        // 5. 余りをストックへ
        if (collect.length > 0) {
            gameState.mirintea.stock.push(...collect);
        }

        // 場札の先頭を表にする（念の為）
        for (let col = 0; col < 7; col++) {
            const pile = gameState.mirintea.tableau[col];
            if (pile.length > 0 && !pile[pile.length - 1].faceUp) {
                pile[pile.length - 1].faceUp = true;
            }
        }

        updateMirinteaScreen(); // 画面更新
    }
}

// Select a card (描画リセットを廃止して軽量化！)
function selectCard(player, col, row) {
    if (player !== 'player') return;
    
    const card = gameState.player.tableau[col][row];
    if (!card.faceUp) return;
    
    // 選択の切り替え
    if (gameState.selectedCard && gameState.selectedCard.col === col && gameState.selectedCard.row === row) {
        gameState.selectedCard = null; // 解除
    } else {
        gameState.selectedCard = { player, col, row };
    }
    
    // ★ここが重要！renderGame()を消して、見た目だけ変える関数にした！
    updateSelectionVisuals();
}

// Select multiple cards (こちらも軽量化)
function selectCards(player, col, startRow) {
    if (player !== 'player') return;
    
    const column = gameState.player.tableau[col];
    if (startRow < 0 || startRow >= column.length) return;
    if (!column[startRow].faceUp) return;
    
    // バリデーション
    for (let i = startRow; i < column.length; i++) {
        if (!column[i].faceUp) return;
    }
    
    gameState.selectedCard = { player, col, row: startRow, isMulti: true };
    
    // ★ここも見た目変更のみ！
    updateSelectionVisuals();
}

// ★新関数：画面全体を作り直さずに、選択枠だけつける関数
function updateSelectionVisuals() {
    // 一旦全部のハイライトを消す
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.style.boxShadow = '';
        card.style.transform = card.style.transform.replace('translateY(-10px)', '');
    });

    // 選択中のカードがあれば光らせる
    if (gameState.selectedCard && gameState.selectedCard.player === 'player') {
        const { col, row, isMulti } = gameState.selectedCard;
        const columnElement = document.getElementById(`player-tableau-${col}`);
        if (!columnElement) return;
        
        const cards = columnElement.children;
        
        if (isMulti) {
            // 束の選択
            for (let i = row; i < cards.length; i++) {
                if (cards[i]) {
                    cards[i].style.boxShadow = '0 0 10px gold';
                    // ドラッグ中じゃなければ浮かす
                    if (!cards[i].classList.contains('dragging')) {
                        // 既存のtransformを維持しつつ浮かすのは難しいので、boxShadowメインにする
                    }
                }
            }
        } else {
            // 単体選択
            if (cards[row]) {
                cards[row].style.boxShadow = '0 0 10px gold';
            }
        }
    }
}

// Highlight selected cards
function highlightSelectedCards(player, col, startRow) {
    const columnElement = document.querySelector(`#${player}-tableau-${col}`);
    
    // Remove highlight from all cards first
    const allCards = columnElement.querySelectorAll('.card');
    allCards.forEach(card => {
        card.style.boxShadow = '';
        card.style.transform = '';
    });
    
    // Highlight selected cards
    for (let i = startRow; i < allCards.length; i++) {
        const cardElement = allCards[i];
        cardElement.style.boxShadow = '0 0 10px gold';
        cardElement.style.transform = 'translateY(-10px)';
    }
}

// Highlight selected card
function highlightSelectedCard(player, col, row) {
    const cardElement = document.querySelector(`#${player}-tableau-${col} .card:nth-child(${row + 1})`);
    if (cardElement) {
        cardElement.style.boxShadow = '0 0 10px gold';
        cardElement.style.transform = 'translateY(-10px)';
    }
}

// Move selected card to foundation
// Move selected card to foundation
function moveCardToFoundation(foundationIndex) {
    if (!gameState.selectedCard) return;
    
    const { player, col, row, isMulti } = gameState.selectedCard;
    if (player !== 'player') return;
    
    // ★束（複数枚）の場合は組札に置けない
    if (isMulti) return;

    // Can only move the last card in a column to foundation
    // (selectCardで制御してるけど念の為)
    if (row !== gameState.player.tableau[col].length - 1) return;
    
    const card = gameState.player.tableau[col][row];
    
    // Check if card can be moved to foundation
    if (canMoveToFoundation(gameState.player.foundations[foundationIndex], card)) {
        gameState.player.tableau[col].pop();
        if (gameState.player.tableau[col].length > 0 && !gameState.player.tableau[col][gameState.player.tableau[col].length - 1].faceUp) {
            gameState.player.tableau[col][gameState.player.tableau[col].length - 1].faceUp = true;
        }
        gameState.player.foundations[foundationIndex].push(card);
        gameState.selectedCard = null;
        renderGame();
        if (checkWinCondition('player')) showGameOver(true);
    }
}

// Move selected card to tableau column
function moveCardToTableau(targetCol) {
    if (!gameState.selectedCard) {
        return;
    }
    
    const { player, col, row, isMulti } = gameState.selectedCard;
    if (player !== 'player') return;
    
    let cardsToMove;
    
    // If it's a multi-card selection, move all cards from the selected row to the end
    if (isMulti) {
        cardsToMove = gameState.player.tableau[col].splice(row);
    } else {
        // Otherwise, just move the single card
        cardsToMove = gameState.player.tableau[col].splice(row, 1);
    }
    
    // Check if the cards can be moved to the target column
    const targetColumn = gameState.player.tableau[targetCol];
    let canMove = true;
    
    // Validate that all cards can be placed in sequence
    for (let i = 0; i < cardsToMove.length; i++) {
        if (i === 0) {
            // First card must be compatible with the target column
            if (!canMoveToTableau(targetColumn, cardsToMove[i])) {
                canMove = false;
                break;
            }
        } else {
            // Subsequent cards must be compatible with the previous card in the sequence
            if (cardsToMove[i-1].color === cardsToMove[i].color || 
                getLowerRank(cardsToMove[i-1].rank) !== cardsToMove[i].rank) {
                canMove = false;
                break;
            }
        }
    }
    
    if (canMove) {
        // Add cards to target column
        gameState.player.tableau[targetCol].push(...cardsToMove);
        // Flip the new top card if it's face down
        if (gameState.player.tableau[col].length > 0 && !gameState.player.tableau[col][gameState.player.tableau[col].length - 1].faceUp) {
            gameState.player.tableau[col][gameState.player.tableau[col].length - 1].faceUp = true;
        }
        // Clear selection
        gameState.selectedCard = null;
        // Re-render game
        renderGame();
    } else {
        // If the move is not valid, put the cards back
        gameState.player.tableau[col].splice(row, 0, ...cardsToMove);
        // Re-render game
        renderGame();
    }
}

// Add drag and drop event listeners to foundation piles
function addFoundationEventListeners() {
    for (let i = 0; i < 4; i++) {
        const foundation = document.getElementById(`player-foundation-${i}`);
        
        // Allow drop (これが無いと禁止マークが出る！)
        foundation.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            e.dataTransfer.dropEffect = 'move'; // 「移動できるよ」ってカーソルにする
        });
        
        // Handle drop
        foundation.addEventListener('drop', (e) => {
            e.preventDefault();
            const json = e.dataTransfer.getData('text/plain');
            if (!json) return;
            
            const data = JSON.parse(json);
            
            // ★超重要：ドロップされたデータを見て、強制的に「選択状態」にする
            // これで既存の moveCardToFoundation が動くようになる！
            if (data.source.type === 'tableau') {
                gameState.selectedCard = { player: 'player', col: data.source.col, row: data.source.row };
                moveCardToFoundation(i);
            } else if (data.source.type === 'waste') {
                moveWasteToFoundation(i);
            }
        });
        
        // Click event (スマホ/PC共通のタップ対応)
        foundation.addEventListener('click', (e) => {
             e.stopPropagation();
             if (gameState.selectedCard) {
                 moveCardToFoundation(i);
             } else {
                 moveWasteToFoundation(i);
             }
        });
    }
}

// Add drag and drop event listeners to tableau columns
// Add drag and drop event listeners to tableau columns
function addTableauEventListeners() {
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`player-tableau-${col}`);
        
        // 列自体へのドラッグ処理
        // ★ここ追加：dragenterでも拒否しないようにする
        tableauColumn.addEventListener('dragenter', (e) => {
            e.preventDefault();
        });

        tableauColumn.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        tableauColumn.addEventListener('drop', (e) => {
            e.preventDefault();
            handleDropOnTableau(e, col);
        });
        
        // 列の背景クリックで移動（K用）
        tableauColumn.addEventListener('click', (e) => {
             e.stopPropagation();
             if (gameState.selectedCard) moveCardToTableau(col);
        });
    }
}

// ★新機能：ドロップ処理をまとめた関数（カードへのドロップも列へのドロップもこれを使う）
function handleDropOnTableau(e, targetCol) {
    const json = e.dataTransfer.getData('text/plain');
    if (!json) return;
    
    const data = JSON.parse(json);
    
    // 1. 場札から場札への移動
    if (data.source.type === 'tableau') {
        const sourceCol = data.source.col;
        const sourceRow = data.source.row;
        
        // ★ここが修正ポイント！「束（複数枚）」かどうかを自動判定★
        // もしドラッグしたカードが、その列の最後尾じゃなければ、それは「束」だ！
        const isMulti = sourceRow < gameState.player.tableau[sourceCol].length - 1;
        
        gameState.selectedCard = { 
            player: 'player', 
            col: sourceCol, 
            row: sourceRow,
            isMulti: isMulti // これを追加しないと束で動かない！
        };
        
        moveCardToTableau(targetCol);
    } 
    // 2. ストック（Waste）から場札への移動
    else if (data.source.type === 'waste') {
         const card = gameState.player.waste[gameState.player.waste.length - 1];
         
         // 移動できるかチェック
         if (canMoveToTableau(gameState.player.tableau[targetCol], card)) {
             gameState.player.waste.pop();
             gameState.player.tableau[targetCol].push(card);
             // 移動完了、再描画
             renderGame();
         }
    }
}

// ★スマートムーブ関数（タップで組札か、他の列の空き場所に移動）
function attemptSmartMove(col, row) {
    const card = gameState.player.tableau[col][row];
    
    // 1. まず組札(右上の4枠)に行けるか？
    for (let i = 0; i < 4; i++) {
        if (canMoveToFoundation(gameState.player.foundations[i], card)) {
            gameState.selectedCard = { player: 'player', col, row };
            moveCardToFoundation(i);
            return true;
        }
    }
    
    // 2. 組札が無理なら、他の列(Tableau)に行けるか？
    // (Kなら空の列へ、それ以外なら数字がつながる列へ)
    for (let targetCol = 0; targetCol < 7; targetCol++) {
        if (col === targetCol) continue; // 同じ列は無視
        
        if (canMoveToTableau(gameState.player.tableau[targetCol], card)) {
             gameState.selectedCard = { player: 'player', col, row };
             moveCardToTableau(targetCol);
             return true;
        }
    }
    
    return false;
}


// ==========================================
// 1. みりんてゃAI（修正版：連続で組札に置くよ！＆手持ちも使うよ！）
// ==========================================
function mirinteaAI() {
    if (!gameState.gameStarted || gameState.gameOver) return;

    // --- A. ストック＆廃棄札が空ならトリック（裏技：詰み防止） ---
    if (gameState.mirintea.stock.length === 0 && gameState.mirintea.waste.length === 0) {
        for (let col = 0; col < 7; col++) {
            const pile = gameState.mirintea.tableau[col];
            // 裏向きカードがあれば無理やり表にする
            for (let i = pile.length - 1; i >= 0; i--) {
                if (!pile[i].faceUp) {
                    pile[i].faceUp = true;
                    updateMirinteaScreen();
                    return; 
                }
            }
        }
        return;
    }

    // --- B. ストック切れ補充（捨て札を山札に戻す） ---
    if (gameState.mirintea.stock.length === 0 && gameState.mirintea.waste.length > 0) {
        while (gameState.mirintea.waste.length > 0) {
            const card = gameState.mirintea.waste.pop();
            card.faceUp = false;
            gameState.mirintea.stock.push(card);
        }
        updateMirinteaScreen();
        return;
    }

    let moved = false;
    let foundFoundationMove = true;

    // --- ① 組札（ゴール）への移動を最優先（ループで置けるだけ置く！） ---
    // ※ここが強化ポイント！1ターンに1枚じゃなく、置ける限り連続で置く！
    while (foundFoundationMove) {
        foundFoundationMove = false; // 一旦フラグを下ろす

        // 1-1. 手持ち(Waste) -> 組札(Foundation)
        if (gameState.mirintea.waste.length > 0) {
            const card = gameState.mirintea.waste[gameState.mirintea.waste.length - 1];
            for (let i = 0; i < 4; i++) {
                if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) {
                    gameState.mirintea.foundations[i].push(gameState.mirintea.waste.pop());
                    moved = true;
                    foundFoundationMove = true; // まだ置けるかも！ループ継続
                    updateMirinteaScreen();
                    break; // このforを抜けてwhileの最初に戻る
                }
            }
            if (foundFoundationMove) continue; // moveがあったら次のループへ
        }
        
        // 1-2. 場札(Tableau) -> 組札(Foundation)
        for (let col = 0; col < 7; col++) {
            if (gameState.mirintea.tableau[col].length > 0) {
                const card = gameState.mirintea.tableau[col][gameState.mirintea.tableau[col].length - 1];
                for (let i = 0; i < 4; i++) {
                    if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) {
                        gameState.mirintea.foundations[i].push(gameState.mirintea.tableau[col].pop());
                        
                        // めくった下のカードが裏なら表にする
                        if (gameState.mirintea.tableau[col].length > 0 && !gameState.mirintea.tableau[col][gameState.mirintea.tableau[col].length - 1].faceUp) {
                            gameState.mirintea.tableau[col][gameState.mirintea.tableau[col].length - 1].faceUp = true;
                        }
                        
                        moved = true;
                        foundFoundationMove = true; // まだ置けるかも！
                        updateMirinteaScreen();
                        break; // Foundationループを抜ける
                    }
                }
                if (foundFoundationMove) break; // Tableauループを抜けてwhileの最初へ
            }
        }
    }
    
    // 組札への移動があったなら、このターンはここで終了（一気にやりすぎない演出）
    if (moved) return;


    // --- ② 手持ち（Waste）から場札（Tableau）へ ---
    if (gameState.mirintea.waste.length > 0) {
        const card = gameState.mirintea.waste[gameState.mirintea.waste.length - 1];
        for (let toCol = 0; toCol < 7; toCol++) {
            if (canMoveToTableau(gameState.mirintea.tableau[toCol], card)) {
                gameState.mirintea.tableau[toCol].push(gameState.mirintea.waste.pop());
                moved = true;
                updateMirinteaScreen();
                return;
            }
        }
    }

    // --- ③ 場札（Tableau）同士の移動 ---
    for (let fromCol = 0; fromCol < 7; fromCol++) {
        const fromPile = gameState.mirintea.tableau[fromCol];
        if (fromPile.length === 0) continue;

        // 表向きのカードの束を探す
        let firstFaceUpIndex = -1;
        for (let i = 0; i < fromPile.length; i++) {
            if (fromPile[i].faceUp) {
                firstFaceUpIndex = i;
                break;
            }
        }
        if (firstFaceUpIndex === -1) continue;

        const cardToMove = fromPile[firstFaceUpIndex];

        // 移動する意味があるか判定（下に裏向きカードがある or Kを空き列へ）
        const isWorthMoving = (firstFaceUpIndex > 0 && !fromPile[firstFaceUpIndex - 1].faceUp) || (firstFaceUpIndex === 0 && cardToMove.rank === 'K'); 
        
        // 既に空き列にあるKは動かさない
        if (firstFaceUpIndex === 0 && cardToMove.rank === 'K') continue;

        if (!isWorthMoving) continue;

        // 移動先を探す
        for (let toCol = 0; toCol < 7; toCol++) {
            if (fromCol === toCol) continue;
            
            if (canMoveToTableau(gameState.mirintea.tableau[toCol], cardToMove)) {
                // 束ごと移動
                const movingCards = fromPile.splice(firstFaceUpIndex);
                gameState.mirintea.tableau[toCol].push(...movingCards);
                
                // 元の列の新しいトップを表にする
                if (gameState.mirintea.tableau[fromCol].length > 0 && !gameState.mirintea.tableau[fromCol][gameState.mirintea.tableau[fromCol].length - 1].faceUp) {
                    gameState.mirintea.tableau[fromCol][gameState.mirintea.tableau[fromCol].length - 1].faceUp = true;
                }
                moved = true;
                updateMirinteaScreen();
                return;
            }
        }
    }
    
    // --- ④ 裏向きカードを表にする（もし表になってないのがあれば） ---
    if (!moved) {
        for (let col = 0; col < 7; col++) {
            const pile = gameState.mirintea.tableau[col];
            if (pile.length > 0 && !pile[pile.length - 1].faceUp) {
                pile[pile.length - 1].faceUp = true;
                moved = true;
                updateMirinteaScreen();
                return;
            }
        }
    }

    // --- ⑤ どこも動かせないなら、山札をめくる ---
    if (!moved && gameState.mirintea.stock.length > 0) {
        const card = gameState.mirintea.stock.pop();
        card.faceUp = true;
        gameState.mirintea.waste.push(card);
        updateMirinteaScreen();
        return;
    }
    
    // 勝利判定
    if (checkWinCondition('mirintea')) {
        showGameOver(false);
    }
}

// Calculate progress (number of cards in foundations)
function calculateProgress(player) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
        count += gameState[player].foundations[i].length;
    }
    return count;
}

// Check if a card can be moved to a tableau column
function canMoveToTableau(column, card) {
    // If column is empty, only K can be placed
    if (column.length === 0) {
        return card.rank === 'K';
    }
    
    // Get the top card of the column
    const topCard = column[column.length - 1];
    
    // Card must be opposite color and one rank lower
    return topCard.color !== card.color && getLowerRank(topCard.rank) === card.rank;
}

// Get the rank that is one lower than the given rank
function getLowerRank(rank) {
    const index = RANKS.indexOf(rank);
    return index > 0 ? RANKS[index - 1] : null;
}

// Check if a card can be moved to a foundation
function canMoveToFoundation(foundation, card) {
    if (foundation.length === 0) {
        return card.rank === 'A';
    }
    
    const topCard = foundation[foundation.length - 1];
    return topCard.suit === card.suit && getNextRank(topCard.rank) === card.rank;
}

// Get next rank in sequence
function getNextRank(rank) {
    const index = RANKS.indexOf(rank);
    return index < RANKS.length - 1 ? RANKS[index + 1] : null;
}

// ★この新しい関数を追加してね！★
// カードをクリックした時、自動で組札（Foundation）に移動させる便利機能
function tryAutoMoveToFoundation(col, row) {
    const card = gameState.player.tableau[col][row];
    
    // 4つの組札置き場（ハート、ダイヤ、クラブ、スペード）を全部チェック
    for (let i = 0; i < 4; i++) {
        if (canMoveToFoundation(gameState.player.foundations[i], card)) {
            // 移動できる場所を見つけたら、即座に移動！
            moveCardToFoundation(i);
            return true; // 移動成功！
        }
    }
    return false; // 移動できなかった
}

// Move card from waste to foundation
function moveWasteToFoundation(foundationIndex) {
    if (gameState.player.waste.length === 0) {
        return;
    }
    
    const card = gameState.player.waste[gameState.player.waste.length - 1];
    
    // Check if card can be moved to foundation
    if (canMoveToFoundation(gameState.player.foundations[foundationIndex], card)) {
        // Remove card from waste
        gameState.player.waste.pop();
        // Add card to foundation
        gameState.player.foundations[foundationIndex].push(card);
        // Re-render game
        renderGame();
        
        // Check if player won
        if (checkWinCondition('player')) {
            showGameOver(true);
        }
    }
}

// Update the renderTableau function
function renderTableau() {
    // Render player tableau
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`player-tableau-${col}`);
        tableauColumn.innerHTML = '';
        
        for (let row = 0; row < gameState.player.tableau[col].length; row++) {
            const card = gameState.player.tableau[col][row];
            
            // ★ここで「このカードは col列目の row番目だよ」という情報を渡す！
            const sourceInfo = { type: 'tableau', col: col, row: row };
            const cardElement = createCardElement(card, false, sourceInfo);
            
            // Position cards vertically
            cardElement.style.top = `${row * 20}px`;
            
            // クリックイベント（PC用）
            cardElement.addEventListener('click', (e) => {
                e.stopPropagation();
                // まず選択状態にする
                selectCard('player', col, row);
                // その後、自動移動（スマートムーブ）を試みる
                if (row === gameState.player.tableau[col].length - 1) {
                    attemptSmartMove(col, row);
                }
            });
            
            tableauColumn.appendChild(cardElement);
        }
    }
    
    // Render Mirintea tableau
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`mirintea-tableau-${col}`);
        tableauColumn.innerHTML = '';
        
        for (let row = 0; row < gameState.mirintea.tableau[col].length; row++) {
            const card = gameState.mirintea.tableau[col][row];
            const cardElement = createCardElement(card, true); // Hide card details for Mirintea
            
            // Position cards vertically
            cardElement.style.top = `${row * 20}px`;
            
            tableauColumn.appendChild(cardElement);
        }
    }
}

// Add click event listeners to tableau columns
function addTableauEventListeners() {
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`player-tableau-${col}`);
        tableauColumn.addEventListener('click', () => moveCardToTableau(col));
    }
}

// Add click event listeners to stock pile
function addStockEventListener() {
    const stock = document.getElementById('player-stock');
    stock.addEventListener('click', drawFromStock);
}

// Check win condition
function checkWinCondition(player) {
    for (let i = 0; i < 4; i++) {
        if (gameState[player].foundations[i].length !== 13) {
            return false;
        }
    }
    return true;
}

// Show game over screen
function showGameOver(playerWon) {
    gameState.gameOver = true;
    
    if (playerWon) {
        resultText.textContent = getRandomDialogue('win');
        resultImage.src = '/mirintea/win.png';
        updateMirinteaImage('lose');   // みりんてゃが負けて悔しがる
    } else {
        resultText.textContent = getRandomDialogue('lose');
        resultImage.src = '/mirintea/lose.png';
        updateMirinteaImage('win');    // みりんてゃが勝ってドヤ顔
    }
    
    gameOverlay.classList.remove('hidden');
    mirinteaWindow.style.display = 'block';
}

function showRandomDialogue(type) {
    const dialogue = getRandomDialogue(type);
    if (dialogue) {
        mirinteaDialogue.textContent = dialogue.replace('{name}', gameState.playerName);
    }

    // ★ここを強化！★ すべての状況で表情をちゃんと変える！
    let imageName = 'default';

    if (type === 'start') imageName = 'default';
    else if (type === 'winning') imageName = 'doka';     // 勝ち誇ってる
    else if (type === 'losing') imageName = 'cry';       // 泣いてる
    else if (type === 'tsundere') imageName = 'shy';     // 照れてる
    else if (type === 'win') imageName = 'win';          // 勝利ポーズ
    else if (type === 'lose') imageName = 'lose';        // 悔しがってる
    else if (type === 'shuffle') imageName = 'angry';    // シャッフルで怒ってる
    else if (type === 'idle') {
        // idleのときはランダムで表情変える！
        const idleFaces = ['default', 'shy', 'doka'];
        imageName = idleFaces[Math.floor(Math.random() * idleFaces.length)];
    }

    updateMirinteaImage(imageName);
}

// Get a random dialogue from a category
function getRandomDialogue(type) {
    const dialogues = mirinteaDialogues[type];
    if (dialogues && dialogues.length > 0) {
        const randomIndex = Math.floor(Math.random() * dialogues.length);
        return dialogues[randomIndex];
    }
    return '';
}

// Update Mirintea's image
function updateMirinteaImage(imageName) {
    const imagePath = `mirintea/${imageName}.png`;  // Changed to relative path
    console.log('Updating Mirintea image to:', imagePath);
    mirinteaImage.src = imagePath;
    
    // Additional debug: Check if image exists
    const img = new Image();
    img.onload = () => console.log('Mirintea image loaded successfully:', imagePath);
    img.onerror = () => console.error('Failed to load Mirintea image:', imagePath);
    img.src = imagePath;
}

// Show idle dialogue periodically
function showIdleDialogue() {
    if (!gameState.gameStarted || gameState.gameOver) return;
    showRandomDialogue('idle');
}

// Check if player can make any moves
// 修正版：山札や捨て札の中身まで厳密にチェックして、本当に詰んでいるか判定する
function canPlayerMove() {
    // 1. 今すぐ使える捨て札(Waste)のトップが置けるか？
    if (gameState.player.waste.length > 0) {
        const card = gameState.player.waste[gameState.player.waste.length - 1];
        // 組札へ
        for (let i = 0; i < 4; i++) {
            if (canMoveToFoundation(gameState.player.foundations[i], card)) return true;
        }
        // 場札へ
        for (let toCol = 0; toCol < 7; toCol++) {
             if (canMoveToTableau(gameState.player.tableau[toCol], card)) return true;
        }
    }
    
    // 2. 場札(Tableau)にあるカードが動かせるか？
    for (let fromCol = 0; fromCol < 7; fromCol++) {
        if (gameState.player.tableau[fromCol].length > 0) {
            // 表向きのカードをすべてチェック
            for (let row = 0; row < gameState.player.tableau[fromCol].length; row++) {
                if (gameState.player.tableau[fromCol][row].faceUp) {
                    const card = gameState.player.tableau[fromCol][row];
                    // 組札へ
                    for (let i = 0; i < 4; i++) {
                         // ※場札からは一番上のカードしか組札に行けないので判定
                        if (row === gameState.player.tableau[fromCol].length - 1) {
                            if (canMoveToFoundation(gameState.player.foundations[i], card)) return true;
                        }
                    }
                    // 他の場札へ
                    for (let toCol = 0; toCol < 7; toCol++) {
                        if (fromCol !== toCol && canMoveToTableau(gameState.player.tableau[toCol], card)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    
    // 3. 【重要】山札(Stock)と捨て札(Waste)の中に「使えるカード」が埋もれているか？
    // ここが今まで甘かった！全カードをチェックするよ
    const hiddenCards = [...gameState.player.stock, ...gameState.player.waste];
    
    for (const card of hiddenCards) {
        // もしこのカードが出てきたら、組札に置ける？
        for (let i = 0; i < 4; i++) {
            if (canMoveToFoundation(gameState.player.foundations[i], card)) return true;
        }
        // もしこのカードが出てきたら、場札に置ける？
        for (let col = 0; col < 7; col++) {
            if (canMoveToTableau(gameState.player.tableau[col], card)) return true;
        }
    }
    
    // ここまで調べてダメなら、山札をいくらめくっても無駄＝詰み！
    return false;
}

// Check if Mirintea can make any moves
function canMirinteaMove() {
    // 1. 今すぐ使える捨て札(Waste)のトップ
    if (gameState.mirintea.waste.length > 0) {
        const card = gameState.mirintea.waste[gameState.mirintea.waste.length - 1];
        for (let i = 0; i < 4; i++) {
            if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) return true;
        }
        for (let toCol = 0; toCol < 7; toCol++) {
             if (canMoveToTableau(gameState.mirintea.tableau[toCol], card)) return true;
        }
    }
    
    // 2. 場札(Tableau)の移動
    for (let fromCol = 0; fromCol < 7; fromCol++) {
        if (gameState.mirintea.tableau[fromCol].length > 0) {
            for (let row = 0; row < gameState.mirintea.tableau[fromCol].length; row++) {
                if (gameState.mirintea.tableau[fromCol][row].faceUp) {
                    const card = gameState.mirintea.tableau[fromCol][row];
                    for (let i = 0; i < 4; i++) {
                        if (row === gameState.mirintea.tableau[fromCol].length - 1) {
                            if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) return true;
                        }
                    }
                    for (let toCol = 0; toCol < 7; toCol++) {
                        if (fromCol !== toCol && canMoveToTableau(gameState.mirintea.tableau[toCol], card)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    
    // 3. 【重要】山札と捨て札の全チェック
    const hiddenCards = [...gameState.mirintea.stock, ...gameState.mirintea.waste];
    
    for (const card of hiddenCards) {
        for (let i = 0; i < 4; i++) {
            if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) return true;
        }
        for (let col = 0; col < 7; col++) {
            if (canMoveToTableau(gameState.mirintea.tableau[col], card)) return true;
        }
    }
    
    return false;
}

// Shuffle tableau and stock when both players are stuck
function shuffleWhenStuck() {
    // Check if both players can move
    const playerCanMove = canPlayerMove();
    const mirinteaCanMove = canMirinteaMove();
    
    // If neither player can move, shuffle the tableau and stock
    if (!playerCanMove && !mirinteaCanMove) {
        console.log("Both players are stuck. Shuffling tableau and stock...");
        
        // Collect all cards from tableau and stock (but not foundations)
        const allCards = [];
        
        // Collect player cards
        for (let col = 0; col < 7; col++) {
            allCards.push(...gameState.player.tableau[col]);
            gameState.player.tableau[col] = [];
        }
        
        // Collect player stock and waste
        allCards.push(...gameState.player.stock);
        allCards.push(...gameState.player.waste);
        gameState.player.stock = [];
        gameState.player.waste = [];
        
        // Collect Mirintea cards
        for (let col = 0; col < 7; col++) {
            allCards.push(...gameState.mirintea.tableau[col]);
            gameState.mirintea.tableau[col] = [];
        }
        
        // Collect Mirintea stock and waste
        allCards.push(...gameState.mirintea.stock);
        allCards.push(...gameState.mirintea.waste);
        gameState.mirintea.stock = [];
        gameState.mirintea.waste = [];
        
        // Shuffle all collected cards
        shuffleArray(allCards);
        
        // Redistribute cards according to Klondike rules
        let cardIndex = 0;
        
        // Redistribute player tableau
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row <= col; row++) {
                if (cardIndex < allCards.length) {
                    const card = allCards[cardIndex];
                    // Only the last card in each column is face up
                    card.faceUp = (row === col);
                    gameState.player.tableau[col].push(card);
                    cardIndex++;
                }
            }
        }
        
        // Remaining cards go to player stock
        for (let i = cardIndex; i < allCards.length; i++) {
            gameState.player.stock.push(allCards[i]);
        }
        
        // For Mirintea, we'll use the same cards but shuffle them differently
        const mirinteaCards = [...allCards];
        shuffleArray(mirinteaCards);
        
        // Redistribute Mirintea tableau
        cardIndex = 0;
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row <= col; row++) {
                if (cardIndex < mirinteaCards.length) {
                    const card = mirinteaCards[cardIndex];
                    // Only the last card in each column is face up
                    card.faceUp = (row === col);
                    gameState.mirintea.tableau[col].push(card);
                    cardIndex++;
                }
            }
        }
        
        // Remaining cards go to Mirintea stock
        for (let i = cardIndex; i < mirinteaCards.length; i++) {
            gameState.mirintea.stock.push(mirinteaCards[i]);
        }
        
        // Show shuffle dialogue
        showRandomDialogue('shuffle');
        
        // Re-render game
        renderGame();
    }
}

function autoShuffleWhenStockEmpty() {
    if (gameState.player.stock.length > 0) return;  // まだストックあるならスルー

    const collect = [];

    // 場札の裏向きカードだけ集める
    for (let col = 0; col < 7; col++) {
        const pile = gameState.player.tableau[col];
        for (let i = 0; i < pile.length; i++) {
            if (!pile[i].faceUp) {
                collect.push(pile[i]);
                pile.splice(i, 1);
                i--;  // 削除した分インデックスずれるから
            } else {
                break;  // 表向きが出てきたらそれ以降は残す
            }
        }
    }

    if (collect.length === 0) return;

    // シャッフルしてストックに戻す
    shuffleArray(collect);
    gameState.player.stock.push(...collect);

    // 場札の新しいトップを表にする
    for (let col = 0; col < 7; col++) {
        const pile = gameState.player.tableau[col];
        if (pile.length > 0 && !pile[pile.length - 1].faceUp) {
            pile[pile.length - 1].faceUp = true;
        }
    }

    showRandomDialogue('shuffle');
    renderGame();
}


// ==========================================
// 2. 「トリック」機能の実装
// ==========================================

function addTrickButtonListener() {
    const trickBtn = document.getElementById('trickButton');
    if(trickBtn) {
        trickBtn.addEventListener('click', useTrick);
    }
}

// トリック発動！ランダムに裏向きカードを1枚めくる
function useTrick() {
    if (!gameState.gameStarted || gameState.gameOver) return;

    // ★修正：発動条件を緩和
    // 山札(Stock)さえ空なら、捨て札(Waste)に残ってても発動OKにする！
    if (gameState.player.stock.length > 0) {
        mirinteaDialogue.textContent = "まだ山札があるじゃん！トリックは本当にピンチの時だけだよ？♡";
        updateMirinteaImage('angry');
        return;
    }

    // 裏向きカードがある場所を全部探す
    let faceDownCandidates = [];
    
    for (let col = 0; col < 7; col++) {
        const pile = gameState.player.tableau[col];
        for (let i = pile.length - 1; i >= 0; i--) {
            if (!pile[i].faceUp) {
                faceDownCandidates.push({ col: col, row: i });
                break; 
            }
        }
    }

    if (faceDownCandidates.length === 0) {
        mirinteaDialogue.textContent = "えっ、もうめくるカードないよ？詰んじゃった…？♡";
        updateMirinteaImage('shy');
        return;
    }

    // ランダムに1つ選ぶ
    const target = faceDownCandidates[Math.floor(Math.random() * faceDownCandidates.length)];
    
    // めくる！
    gameState.player.tableau[target.col][target.row].faceUp = true;
    
    // 画面更新
    updatePlayerScreen();
    
    // みりんてゃの反応
    mirinteaDialogue.textContent = "トリック！…んふふ、いいカード出た？♡";
    updateMirinteaImage('win');
    
    // ボタンの演出
    const btn = document.getElementById('trickButton');
    if(btn) {
        btn.classList.add('used');
        setTimeout(() => btn.classList.remove('used'), 500);
    }
}