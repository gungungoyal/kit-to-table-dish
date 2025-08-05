// Script to generate dish images
const fs = require('fs');

const dishImages = {
  // Chinese Platters
  'chilli-garlic-noodles': { name: 'Chilli Garlic Noodles', emoji: '🍜', color: '#FF6B6B' },
  'fried-rice-with-manchurian': { name: 'Fried Rice with Manchurian', emoji: '🍚', color: '#4ECDC4' },
  'hakka-noodles': { name: 'Hakka Noodles', emoji: '🍝', color: '#45B7D1' },
  'noodles-with-manchurian': { name: 'Noodles with Manchurian', emoji: '🍜', color: '#96CEB4' },
  'schezwan-noodles': { name: 'Schezwan Noodles', emoji: '🍝', color: '#FFEAA7' },
  'singapuri-noodles': { name: 'Singapuri Noodles', emoji: '🍜', color: '#FD79A8' },
  'veg-noodles': { name: 'Veg Noodles', emoji: '🍝', color: '#FDCB6E' },
  
  // Desserts
  'brownie-with-icecream': { name: 'Brownie with Icecream', emoji: '🍰', color: '#6C5CE7' },
  'cakes': { name: 'Cakes', emoji: '🎂', color: '#A29BFE' },
  'gulab-jamun': { name: 'Gulab Jamun', emoji: '🍮', color: '#FD79A8' },
  'jalebi': { name: 'Jalebi', emoji: '🍥', color: '#FDCB6E' },
  'pudding': { name: 'Pudding', emoji: '🍮', color: '#55A3FF' },
  'rabdi': { name: 'Rabdi', emoji: '🥛', color: '#81ECEC' },
  'rasmalai': { name: 'Rasmalai', emoji: '🍮', color: '#FAB1A0' },
  'waffles': { name: 'Waffles', emoji: '🧇', color: '#FFEAA7' },
  
  // Add more as needed...
};

function generateSVG(filename, dish) {
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${dish.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${dish.color}80;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <rect x="20" y="20" width="180" height="25" fill="rgba(255,255,255,0.9)" rx="5"/>
  <text x="25" y="37" font-family="Arial, sans-serif" font-size="12" fill="#333">VegBite Kitchen</text>
  <circle cx="200" cy="120" r="40" fill="rgba(255,255,255,0.8)"/>
  <text x="200" y="135" font-family="Arial, sans-serif" font-size="30" text-anchor="middle" fill="${dish.color}">${dish.emoji}</text>
  <rect x="30" y="220" width="340" height="50" fill="rgba(255,255,255,0.95)" rx="5"/>
  <text x="200" y="240" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#333">${dish.name}</text>
  <text x="200" y="255" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#666">Fresh • Vegetarian • Healthy</text>
</svg>`;
  
  return svg;
}

// Generate all images
Object.entries(dishImages).forEach(([filename, dish]) => {
  const svg = generateSVG(filename, dish);
  fs.writeFileSync(`${filename}.svg`, svg);
  console.log(`Generated ${filename}.svg`);
});

console.log('All dish images generated!');
