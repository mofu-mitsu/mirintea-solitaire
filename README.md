# Mirintea Solitaire

A double Solitaire game where you can play against Mirintea, a cute ENFP character with lots of personality!

## Features

- Classic Klondike Solitaire gameplay
- Double Solitaire mode - play against Mirintea
- Interactive character window with draggable functionality
- Mirintea reacts to your gameplay with dynamic dialogue
- Responsive design that works on both desktop and mobile
- Local storage for saving your name

## How to Play

1. Enter your name when prompted
2. Play Solitaire as usual:
   - Click the stock pile to draw cards
   - Drag cards to foundation piles (A-K of each suit)
   - Move cards between tableau columns
   - Build descending sequences in alternating colors
3. Compete against Mirintea who plays automatically
4. First to complete all four foundation piles wins!

## Character Reactions

Mirintea will react to the game state with various dialogues:
- When she's winning
- When she's losing
- During idle moments
- When she wins or loses

## File Structure

```
mirintea-solitaire/
├── index.html
├── style.css
├── script.js
├── cards/               ← Playing card images (52 + back)
│   ├── back.png
│   ├── spade_A.png
│   └── ... (all 52 cards)
├── mirintea/            ← Character illustrations
│   ├── default.png
│   ├── win.png
│   ├── lose.png
│   ├── angry.png
│   ├── doka.png
│   ├── cry.png
│   └── shy.png
├── voice/               ← Sound effects (optional)
└── vercel.json          ← Deployment configuration
```

## Setup Instructions

1. Download the playing card assets from: https://github.com/hayeah/playing-cards-assets
2. Extract the `png/250x350` folder contents to the `cards/` directory
3. Replace the placeholder images in the `mirintea/` directory with your own illustrations
4. Open `index.html` in a web browser to play locally
5. Deploy to Vercel using the included `vercel.json` configuration

## Customization

You can customize Mirintea's dialogues by modifying the `mirinteaDialogues` object in `script.js`.

## Credits

- Card images: https://github.com/hayeah/playing-cards-assets

- Character design: Created by [もふみつ]
