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
const closeBtn = document.getElementById('closeBtn');
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
    closeBtn.addEventListener('click', () => {
        mirinteaWindow.style.display = 'none';
    });
    
    // Make character window draggable
    makeDraggable(mirinteaWindow);
});

// Make an element draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.querySelector('.drag-handle').onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves
        document.onmousemove = elementDrag;
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
    
    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
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
    
    // Create a full deck of 52 cards
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
    
    // Shuffle the deck
    shuffleArray(deck);
    
    // Deal cards to player tableau according to Klondike rules
    let cardIndex = 0;
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row <= col; row++) {
            const card = deck[cardIndex];
            // Only the last card in each column is face up
            card.faceUp = (row === col);
            gameState.player.tableau[col].push(card);
            cardIndex++;
        }
    }
    
    // Remaining cards go to player stock
    for (let i = cardIndex; i < deck.length; i++) {
        gameState.player.stock.push(deck[i]);
    }
    
    // For Mirintea, we'll use the same deck but shuffle it differently
    const mirinteaDeck = [...deck];
    shuffleArray(mirinteaDeck);
    
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

// Shuffle a deck of cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Render the game board
function renderGame() {
    renderPlayerBoard();
    renderMirinteaBoard();
    renderTableau(); // Add this line
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
    
    // Render waste
    const playerWaste = document.getElementById('player-waste');
    playerWaste.innerHTML = '';
    if (gameState.player.waste.length > 0) {
        const topCard = gameState.player.waste[gameState.player.waste.length - 1];
        const cardElement = createCardElement(topCard);
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
function createCardElement(card, hideDetails = false) {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${card.color}`;
    
    // Debug: Log the card information
    console.log('Creating card element:', card);
    
    // Make card draggable
    cardElement.draggable = true;
    
    // Add drag start event
    cardElement.addEventListener('dragstart', (e) => {
        console.log('Drag start:', card);
        e.dataTransfer.setData('text/plain', JSON.stringify(card));
    });
    
    // Add touch events for mobile devices
    cardElement.addEventListener('touchstart', (e) => {
        console.log('Touch start:', card);
        // Prevent scrolling when touching cards
        e.preventDefault();
        
        // Store card data for touch move
        cardElement.cardData = card;
    });
    
    cardElement.addEventListener('touchend', (e) => {
        console.log('Touch end:', card);
        // Find the drop target
        const touch = e.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // Check if the element is a foundation or tableau column
        if (element && element.id) {
            if (element.id.startsWith('player-foundation-')) {
                const foundationIndex = parseInt(element.id.split('-')[2]);
                moveCardToFoundation(foundationIndex);
            } else if (element.id.startsWith('player-tableau-')) {
                const colIndex = parseInt(element.id.split('-')[2]);
                moveCardToTableau(colIndex);
            }
        }
    });
    
    if (hideDetails) {
        // For opponent cards, show back or face down
        if (card.faceUp) {
            cardElement.classList.add('face-up');
            // Use card image
            const fileName = getCardFileName(card);
            const imagePath = `cards/${fileName}.png`;  // Changed to relative path
            cardElement.style.backgroundImage = `url('${imagePath}')`;
            cardElement.style.backgroundSize = 'cover';
            // Debug: Log the image path
            console.log('Card image path (opponent):', imagePath);
            // Additional debug: Check if image exists
            const img = new Image();
            img.onload = () => console.log('Image loaded successfully:', imagePath);
            img.onerror = () => console.error('Failed to load image:', imagePath);
            img.src = imagePath;
        } else {
            cardElement.classList.add('back');
        }
    } else {
        // For player cards
        if (card.faceUp) {
            cardElement.classList.add('face-up');
            // Use card image
            const fileName = getCardFileName(card);
            const imagePath = `cards/${fileName}.png`;  // Changed to relative path
            cardElement.style.backgroundImage = `url('${imagePath}')`;
            cardElement.style.backgroundSize = 'cover';
            // Debug: Log the image path
            console.log('Card image path (player):', imagePath);
            // Additional debug: Check if image exists
            const img = new Image();
            img.onload = () => console.log('Image loaded successfully:', imagePath);
            img.onerror = () => console.error('Failed to load image:', imagePath);
            img.src = imagePath;
        } else {
            cardElement.classList.add('back');
        }
    }
    
    return cardElement;
}

// Draw a card from stock
function drawFromStock() {
    console.log('Drawing from stock');
    if (gameState.player.stock.length > 0) {
        const card = gameState.player.stock.pop();
        console.log('Drew card:', card);
        card.faceUp = true;
        gameState.player.waste.push(card);
        renderGame();
        
        // Check if player won
        if (checkWinCondition('player')) {
            showGameOver(true);
        }
    } else if (gameState.player.waste.length > 0) {
        // Reset stock from waste
        console.log('Resetting stock from waste');
        while (gameState.player.waste.length > 0) {
            const card = gameState.player.waste.pop();
            card.faceUp = false;
            gameState.player.stock.push(card);
        }
        renderGame();
    }
}

// Select a card
function selectCard(player, col, row) {
    console.log('Selecting card:', player, col, row);
    if (player !== 'player') return;
    
    const card = gameState.player.tableau[col][row];
    console.log('Selected card:', card);
    if (!card.faceUp) return;
    
    gameState.selectedCard = { player, col, row };
    console.log('Set selected card:', gameState.selectedCard);
    
    // Highlight selected card
    renderGame();
    highlightSelectedCard(player, col, row);
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
function moveCardToFoundation(foundationIndex) {
    console.log('Moving card to foundation:', foundationIndex);
    if (!gameState.selectedCard) {
        console.log('No card selected');
        return;
    }
    
    const { player, col, row } = gameState.selectedCard;
    if (player !== 'player') return;
    
    // Can only move the last card in a column to foundation
    if (row !== gameState.player.tableau[col].length - 1) {
        console.log('Can only move the last card in a column to foundation');
        return;
    }
    
    const card = gameState.player.tableau[col][row];
    console.log('Moving card:', card);
    
    // Check if card can be moved to foundation
    if (canMoveToFoundation(gameState.player.foundations[foundationIndex], card)) {
        console.log('Card can be moved to foundation');
        // Remove card from tableau
        gameState.player.tableau[col].pop();
        // Flip the new top card if it's face down
        if (gameState.player.tableau[col].length > 0 && !gameState.player.tableau[col][gameState.player.tableau[col].length - 1].faceUp) {
            gameState.player.tableau[col][gameState.player.tableau[col].length - 1].faceUp = true;
        }
        // Add card to foundation
        gameState.player.foundations[foundationIndex].push(card);
        // Clear selection
        gameState.selectedCard = null;
        // Re-render game
        renderGame();
        
        // Check if player won
        if (checkWinCondition('player')) {
            showGameOver(true);
        }
    } else {
        console.log('Card cannot be moved to foundation');
    }
}

// Move selected card to tableau column
function moveCardToTableau(targetCol) {
    console.log('Moving card to tableau column:', targetCol);
    if (!gameState.selectedCard) {
        console.log('No card selected');
        return;
    }
    
    const { player, col, row } = gameState.selectedCard;
    if (player !== 'player') return;
    
    // Get the selected card
    const card = gameState.player.tableau[col][row];
    console.log('Moving card:', card);
    
    // Check if card can be moved to tableau column
    const targetColumn = gameState.player.tableau[targetCol];
    if (canMoveToTableau(targetColumn, card)) {
        console.log('Card can be moved to tableau column');
        // Remove cards from current position
        const cardsToMove = gameState.player.tableau[col].splice(row);
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
        console.log('Card cannot be moved to tableau column');
    }
}

// Add drag and drop event listeners to foundation piles
function addFoundationEventListeners() {
    for (let i = 0; i < 4; i++) {
        const foundation = document.getElementById(`player-foundation-${i}`);
        // Allow drop
        foundation.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        // Handle drop
        foundation.addEventListener('drop', (e) => {
            e.preventDefault();
            const cardData = e.dataTransfer.getData('text/plain');
            const card = JSON.parse(cardData);
            console.log('Dropped card on foundation:', card);
            
            // Move card to foundation
            moveCardToFoundation(i);
        });
        
        // Click event (for non-drag devices)
        foundation.addEventListener('click', () => {
            // If a card is selected, move it to foundation
            if (gameState.selectedCard) {
                moveCardToFoundation(i);
            } else {
                // Otherwise, try to move from waste
                moveWasteToFoundation(i);
            }
        });
        
        // Touch event (for mobile devices)
        foundation.addEventListener('touchend', (e) => {
            e.preventDefault();
            // If a card is selected, move it to foundation
            if (gameState.selectedCard) {
                moveCardToFoundation(i);
            } else {
                // Otherwise, try to move from waste
                moveWasteToFoundation(i);
            }
        });
    }
}

// Add drag and drop event listeners to tableau columns
function addTableauEventListeners() {
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`player-tableau-${col}`);
        
        // Allow drop
        tableauColumn.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        // Handle drop
        tableauColumn.addEventListener('drop', (e) => {
            e.preventDefault();
            const cardData = e.dataTransfer.getData('text/plain');
            const card = JSON.parse(cardData);
            console.log('Dropped card on tableau:', card);
            
            // Move card to tableau column
            moveCardToTableau(col);
        });
        
        // Click event (for non-drag devices)
        tableauColumn.addEventListener('click', () => moveCardToTableau(col));
        
        // Touch event (for mobile devices)
        tableauColumn.addEventListener('touchend', (e) => {
            e.preventDefault();
            moveCardToTableau(col);
        });
    }
}

// Mirintea's AI logic
function mirinteaAI() {
    if (!gameState.gameStarted || gameState.gameOver) return;
    
    // Simple AI: 50% chance to draw from stock, 50% to make a move
    if (Math.random() < 0.5 && gameState.mirintea.stock.length > 0) {
        // Draw from stock
        const card = gameState.mirintea.stock.pop();
        card.faceUp = true;
        gameState.mirintea.waste.push(card);
        
        // Check if Mirintea won
        if (checkWinCondition('mirintea')) {
            showGameOver(false);
            return;
        }
        
        renderGame();
        showRandomDialogue('idle');
        return;
    }
    
    // Try to make a move
    let moved = false;
    
    // Try to move cards from waste to foundations
    if (gameState.mirintea.waste.length > 0) {
        const card = gameState.mirintea.waste[gameState.mirintea.waste.length - 1];
        for (let i = 0; i < 4; i++) {
            if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) {
                const movedCard = gameState.mirintea.waste.pop();
                gameState.mirintea.foundations[i].push(movedCard);
                moved = true;
                break;
            }
        }
    }
    
    // Try to move cards from tableau to foundations
    if (!moved) {
        for (let col = 0; col < 7; col++) {
            if (gameState.mirintea.tableau[col].length > 0) {
                const card = gameState.mirintea.tableau[col][gameState.mirintea.tableau[col].length - 1];
                for (let i = 0; i < 4; i++) {
                    if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) {
                        const movedCard = gameState.mirintea.tableau[col].pop();
                        gameState.mirintea.foundations[i].push(movedCard);
                        // Flip the new top card if it's face down
                        if (gameState.mirintea.tableau[col].length > 0 && !gameState.mirintea.tableau[col][gameState.mirintea.tableau[col].length - 1].faceUp) {
                            gameState.mirintea.tableau[col][gameState.mirintea.tableau[col].length - 1].faceUp = true;
                        }
                        moved = true;
                        break;
                    }
                }
                if (moved) break;
            }
        }
    }
    
    // Try to move cards between tableau columns
    if (!moved) {
        for (let fromCol = 0; fromCol < 7; fromCol++) {
            if (gameState.mirintea.tableau[fromCol].length > 0) {
                const card = gameState.mirintea.tableau[fromCol][gameState.mirintea.tableau[fromCol].length - 1];
                for (let toCol = 0; toCol < 7; toCol++) {
                    if (fromCol !== toCol && canMoveToTableau(gameState.mirintea.tableau[toCol], card)) {
                        const movedCard = gameState.mirintea.tableau[fromCol].pop();
                        gameState.mirintea.tableau[toCol].push(movedCard);
                        // Flip the new top card if it's face down
                        if (gameState.mirintea.tableau[fromCol].length > 0 && !gameState.mirintea.tableau[fromCol][gameState.mirintea.tableau[fromCol].length - 1].faceUp) {
                            gameState.mirintea.tableau[fromCol][gameState.mirintea.tableau[fromCol].length - 1].faceUp = true;
                        }
                        moved = true;
                        break;
                    }
                }
                if (moved) break;
            }
        }
    }
    
    // If no move was made, try to flip a hidden card
    if (!moved) {
        for (let col = 0; col < 7; col++) {
            const pile = gameState.mirintea.tableau[col];
            if (pile.length > 0) {
                const topCard = pile[pile.length - 1];
                if (!topCard.faceUp) {
                    topCard.faceUp = true;
                    moved = true;
                    break;
                }
            }
        }
    }
    
    renderGame();
    
    // Check win condition
    if (checkWinCondition('mirintea')) {
        showGameOver(false);
        return;
    }
    
    // Show appropriate dialogue based on game state
    const playerProgress = calculateProgress('player');
    const mirinteaProgress = calculateProgress('mirintea');
    
    if (mirinteaProgress > playerProgress + 2) {
        showRandomDialogue('winning');
    } else if (playerProgress > mirinteaProgress + 2) {
        showRandomDialogue('losing');
    } else {
        showRandomDialogue('idle');
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

// Move card from waste to foundation
function moveWasteToFoundation(foundationIndex) {
    console.log('Moving waste card to foundation:', foundationIndex);
    if (gameState.player.waste.length === 0) {
        console.log('No card in waste');
        return;
    }
    
    const card = gameState.player.waste[gameState.player.waste.length - 1];
    console.log('Moving card:', card);
    
    // Check if card can be moved to foundation
    if (canMoveToFoundation(gameState.player.foundations[foundationIndex], card)) {
        console.log('Card can be moved to foundation');
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
    } else {
        console.log('Card cannot be moved to foundation');
    }
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
    return topCard.color !== card.color && getPreviousRank(topCard.rank) === card.rank;
}

// Get previous rank in sequence
function getPreviousRank(rank) {
    const index = RANKS.indexOf(rank);
    return index > 0 ? RANKS[index - 1] : null;
}

// Update the renderTableau function to add click and drag events to cards
function renderTableau() {
    // Render player tableau
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`player-tableau-${col}`);
        tableauColumn.innerHTML = '';
        
        for (let row = 0; row < gameState.player.tableau[col].length; row++) {
            const card = gameState.player.tableau[col][row];
            const cardElement = createCardElement(card);
            
            // Position cards vertically
            cardElement.style.top = `${row * 20}px`;
            
            // Add click event to select card
            cardElement.addEventListener('click', () => selectCard('player', col, row));
            
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
    } else {
        resultText.textContent = getRandomDialogue('lose');
        resultImage.src = '/mirintea/lose.png';
    }
    
    gameOverlay.classList.remove('hidden');
}

// Show a random dialogue
function showRandomDialogue(type) {
    const dialogue = getRandomDialogue(type);
    if (dialogue) {
        mirinteaDialogue.textContent = dialogue.replace('{name}', gameState.playerName);
    }
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
function canPlayerMove() {
    // Check if player can move waste card to foundation
    if (gameState.player.waste.length > 0) {
        const card = gameState.player.waste[gameState.player.waste.length - 1];
        for (let i = 0; i < 4; i++) {
            if (canMoveToFoundation(gameState.player.foundations[i], card)) {
                return true;
            }
        }
    }
    
    // Check if player can move tableau card to foundation
    for (let col = 0; col < 7; col++) {
        if (gameState.player.tableau[col].length > 0) {
            const card = gameState.player.tableau[col][gameState.player.tableau[col].length - 1];
            for (let i = 0; i < 4; i++) {
                if (canMoveToFoundation(gameState.player.foundations[i], card)) {
                    return true;
                }
            }
        }
    }
    
    // Check if player can move tableau card to another tableau column
    for (let fromCol = 0; fromCol < 7; fromCol++) {
        if (gameState.player.tableau[fromCol].length > 0) {
            // Check all face-up cards in the column
            for (let row = 0; row < gameState.player.tableau[fromCol].length; row++) {
                if (gameState.player.tableau[fromCol][row].faceUp) {
                    const card = gameState.player.tableau[fromCol][row];
                    for (let toCol = 0; toCol < 7; toCol++) {
                        if (fromCol !== toCol && canMoveToTableau(gameState.player.tableau[toCol], card)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    
    // Check if player can draw from stock
    if (gameState.player.stock.length > 0) {
        return true;
    }
    
    // Check if player can reset stock from waste
    if (gameState.player.waste.length > 0 && gameState.player.stock.length === 0) {
        return true;
    }
    
    return false;
}

// Check if Mirintea can make any moves
function canMirinteaMove() {
    // Check if Mirintea can move waste card to foundation
    if (gameState.mirintea.waste.length > 0) {
        const card = gameState.mirintea.waste[gameState.mirintea.waste.length - 1];
        for (let i = 0; i < 4; i++) {
            if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) {
                return true;
            }
        }
    }
    
    // Check if Mirintea can move tableau card to foundation
    for (let col = 0; col < 7; col++) {
        if (gameState.mirintea.tableau[col].length > 0) {
            const card = gameState.mirintea.tableau[col][gameState.mirintea.tableau[col].length - 1];
            for (let i = 0; i < 4; i++) {
                if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) {
                    return true;
                }
            }
        }
    }
    
    // Check if Mirintea can move tableau card to another tableau column
    for (let fromCol = 0; fromCol < 7; fromCol++) {
        if (gameState.mirintea.tableau[fromCol].length > 0) {
            // Check all face-up cards in the column
            for (let row = 0; row < gameState.mirintea.tableau[fromCol].length; row++) {
                if (gameState.mirintea.tableau[fromCol][row].faceUp) {
                    const card = gameState.mirintea.tableau[fromCol][row];
                    for (let toCol = 0; toCol < 7; toCol++) {
                        if (fromCol !== toCol && canMoveToTableau(gameState.mirintea.tableau[toCol], card)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    
    // Check if Mirintea can draw from stock
    if (gameState.mirintea.stock.length > 0) {
        return true;
    }
    
    // Check if Mirintea can reset stock from waste
    if (gameState.mirintea.waste.length > 0 && gameState.mirintea.stock.length === 0) {
        return true;
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
