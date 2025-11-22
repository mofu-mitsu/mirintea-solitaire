// Game constants
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const COLORS = {
    hearts: 'red',
    diamonds: 'red',
    clubs: 'black',
    spades: 'black'
};

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
        "今日のあたしね、ちょっとだけ本気出す日なの。ちょっとだけね？♡",
        "{name}ってさ、真剣な顔かわいくて好きだよ。ほら、もっと見せて？",
        "ねぇ、負ける準備できた？あたしは勝つ準備できてるよ♡",
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
        "なんかごめんね？強すぎて♡（ぜんぜん謝ってない）",
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
        "あ〜〜〜！！なんでそこにそのカードくんの！？泣くよ！？",
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
        "は？なんでそんなドヤってんの？かわいいけどムカつくんだけど！？",
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
        "{name}に負けるの、ちょっとだけ嬉しいの嫌なんだけど…なにこれ…",
        "次は絶対勝つからね……覚悟しといて……？♡"
    ],
    idle: [
        "ねぇねぇ{name}、見て！このカードの並びかわいくない？",
        "ちょっと！進めないで！あたしのこと見て！！",
        "{name}が真剣にすると…なんかちょっと嫉妬するんだけど",
        "負けたくないのに…勝ちたいのに…好きなのに…なんなの〜〜！！",
        "ん？落ち込んでる？ギューしてあげよっか？",
        "{name}〜〜〜みりんてゃのこと見て？ほらほらほら！！",
        "ちょっと集中しないで！？あたし見て！？",
        "ねぇ手元見すぎ。顔見て？ねぇ？見て？♡",
        "進める前にさ、褒めて？一回褒めて？やる気出るからっ♡",
        "かまってくれないと負けるよ？責任取って？♡",
        "{name}が真剣な顔してると…なんか嫉妬するんだけど…なんで？",
        "カードよりあたし見てよ〜〜！！！",
        "負けそうなのに…かまってくれないのひどい……構って……？",
        "んも〜〜！！無視されたらめっちゃ煽るからね！？",
        "カードめくる音かわい〜…{name}の指もかわい〜♡",
        "この並び好き…美しすぎてスクショしたい…",
        "ねぇ、今の動きかっこよかった…もう一回やって？♡",
        "カード置く瞬間の{nname}の横顔が好き。",
        "進んでる音だけでテンション上がるの、あたしだけ？",
        "{name}とゲームしてる瞬間がいちばん好きかも…内緒だけど♡",
        "この緊張感…付き合ってるみたいじゃない？……違う？えっ違う？",
        "うわ、今の配置めっちゃ可愛い…スクショしたい",
        "{name}の手って継麗…カード持ってる指が好き",
        "はいはい、次のターンいくよ〜〜！集中〜〜！",
        "この瞬間が一番好き…並んでゲームしてるのって恋じゃん"
    ]
};

// DOM Elements
const nameModal = document.getElementById('nameModal');
const playerNameInput = document.getElementById('playerName');
const startButton = document.getElementById('startButton');
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
    gameState.gameStarted = true;
    
    initializeDeck();
    dealCards();
    renderGame();
    showRandomDialogue('start');
    
    // Start Mirintea's AI
    setInterval(mirinteaAI, 2000); // Mirintea makes a move every 2 seconds
    setInterval(showIdleDialogue, 10000); // Show idle dialogue every 10 seconds
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
    dealCards();
    renderGame();
    showRandomDialogue('start');
}

// Initialize a deck of cards
function initializeDeck() {
    // Create player deck
    let playerDeck = [];
    for (let suit of SUITS) {
        for (let rank of RANKS) {
            playerDeck.push({ suit, rank, color: COLORS[suit] });
        }
    }
    
    // Shuffle the deck
    playerDeck = shuffleDeck(playerDeck);
    
    // Split deck between player and Mirintea
    gameState.player.stock = playerDeck.slice(0, 26);
    gameState.mirintea.stock = playerDeck.slice(26, 52);
}

// Shuffle a deck of cards
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Deal cards to tableau
function dealCards() {
    // Deal player cards
    for (let col = 0; col < 7; col++) {
        for (let row = col; row < 7; row++) {
            if (gameState.player.stock.length > 0) {
                const card = gameState.player.stock.pop();
                // First card in each column is face up
                card.faceUp = (row === col);
                gameState.player.tableau[row].push(card);
            }
        }
    }
    
    // Deal Mirintea cards
    for (let col = 0; col < 7; col++) {
        for (let row = col; row < 7; row++) {
            if (gameState.mirintea.stock.length > 0) {
                const card = gameState.mirintea.stock.pop();
                // First card in each column is face up
                card.faceUp = (row === col);
                gameState.mirintea.tableau[row].push(card);
            }
        }
    }
}

// Render the game board
function renderGame() {
    renderPlayerBoard();
    renderMirinteaBoard();
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
    
    // Render tableau
    for (let col = 0; col < 7; col++) {
        const tableauColumn = document.getElementById(`player-tableau-${col}`);
        tableauColumn.innerHTML = '';
        
        for (let row = 0; row < gameState.player.tableau[col].length; row++) {
            const card = gameState.player.tableau[col][row];
            const cardElement = createCardElement(card);
            
            // Position cards vertically
            cardElement.style.top = `${row * 20}px`;
            
            // Add click event if card is face up
            if (card.faceUp) {
                cardElement.addEventListener('click', () => selectCard('player', col, row));
            }
            
            tableauColumn.appendChild(cardElement);
        }
    }
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
    
    // Render tableau
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

// Create a card element
function createCardElement(card, hideDetails = false) {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${card.color}`;
    
    if (hideDetails) {
        // For opponent cards, show back or face down
        if (card.faceUp) {
            cardElement.classList.add('face-up');
            // Use card image
            cardElement.style.backgroundImage = `url('cards/${card.suit}_${card.rank}.png')`;
            cardElement.style.backgroundSize = 'cover';
        } else {
            cardElement.classList.add('back');
        }
    } else {
        // For player cards
        if (card.faceUp) {
            cardElement.classList.add('face-up');
            // Use card image
            cardElement.style.backgroundImage = `url('cards/${card.suit}_${card.rank}.png')`;
            cardElement.style.backgroundSize = 'cover';
        } else {
            cardElement.classList.add('back');
        }
    }
    
    return cardElement;
}

// Draw a card from stock
function drawFromStock() {
    if (gameState.player.stock.length > 0) {
        const card = gameState.player.stock.pop();
        card.faceUp = true;
        gameState.player.waste.push(card);
        renderGame();
        
        // Check if player won
        if (checkWinCondition('player')) {
            showGameOver(true);
        }
    } else if (gameState.player.waste.length > 0) {
        // Reset stock from waste
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
    if (player !== 'player') return;
    
    const card = gameState.player.tableau[col][row];
    if (!card.faceUp) return;
    
    gameState.selectedCard = { player, col, row };
    
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
    // This is a simplified AI - in a real implementation, you'd have more complex logic
    let moved = false;
    
    // Try to move cards to foundations
    for (let i = 0; i < 4; i++) {
        if (gameState.mirintea.waste.length > 0) {
            const card = gameState.mirintea.waste[gameState.mirintea.waste.length - 1];
            if (canMoveToFoundation(gameState.mirintea.foundations[i], card)) {
                const movedCard = gameState.mirintea.waste.pop();
                gameState.mirintea.foundations[i].push(movedCard);
                moved = true;
                break;
            }
        }
    }
    
    // If no foundation move, try tableau moves
    if (!moved) {
        // Simplified: just flip a hidden card if possible
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
        resultImage.src = 'mirintea/win.png';
    } else {
        resultText.textContent = getRandomDialogue('lose');
        resultImage.src = 'mirintea/lose.png';
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

// Show idle dialogue periodically
function showIdleDialogue() {
    if (!gameState.gameStarted || gameState.gameOver) return;
    showRandomDialogue('idle');
}
