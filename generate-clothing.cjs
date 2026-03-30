const fs = require('fs');
const path = require('path');
const https = require('https');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const clothingPrompts = {
  hats: [
    { name: 'baseball', prompt: 'A red baseball cap, front view, simple clipart style, isolated on white background' },
    { name: 'beanie', prompt: 'A blue knit beanie hat, front view, simple clipart style, isolated on white background' },
    { name: 'tophat', prompt: 'A black top hat, front view, simple clipart style, isolated on white background' },
    { name: 'crown', prompt: 'A golden crown, front view, simple clipart style, isolated on white background' },
    { name: 'party', prompt: 'A colorful party hat with polka dots, front view, simple clipart style, isolated on white background' },
    { name: 'chef', prompt: 'A white chef hat (toque), front view, simple clipart style, isolated on white background' },
    { name: 'pirate', prompt: 'A black pirate hat with skull symbol, front view, simple clipart style, isolated on white background' },
  ],
  shirts: [
    { name: 'tshirt', prompt: 'A blue t-shirt, front view, simple clipart style, isolated on white background' },
    { name: 'hoodie', prompt: 'A gray hoodie sweatshirt, front view, simple clipart style, isolated on white background' },
    { name: 'suit', prompt: 'A black suit jacket, front view, simple clipart style, isolated on white background' },
    { name: 'sweater', prompt: 'A red cozy sweater, front view, simple clipart style, isolated on white background' },
    { name: 'tank', prompt: 'A white tank top, front view, simple clipart style, isolated on white background' },
    { name: 'jersey', prompt: 'A sports jersey with number 1, front view, simple clipart style, isolated on white background' },
    { name: 'cape', prompt: 'A red superhero cape, front view, simple clipart style, isolated on white background' },
  ],
  pants: [
    { name: 'jeans', prompt: 'Blue jeans pants, front view, simple clipart style, isolated on white background' },
    { name: 'shorts', prompt: 'Khaki shorts, front view, simple clipart style, isolated on white background' },
    { name: 'dress', prompt: 'Black dress pants, front view, simple clipart style, isolated on white background' },
    { name: 'skirt', prompt: 'A pink skirt, front view, simple clipart style, isolated on white background' },
    { name: 'sweatpants', prompt: 'Gray sweatpants, front view, simple clipart style, isolated on white background' },
  ],
  accessories: [
    { name: 'glasses', prompt: 'Cool sunglasses, front view, simple clipart style, isolated on white background' },
    { name: 'scarf', prompt: 'A red winter scarf, front view, simple clipart style, isolated on white background' },
    { name: 'bowtie', prompt: 'A fancy bow tie, front view, simple clipart style, isolated on white background' },
    { name: 'backpack', prompt: 'A small backpack, front view, simple clipart style, isolated on white background' },
  ]
};

async function generateImage(prompt) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard'
    })
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data.data[0].url;
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('🎨 Starting clothing generation...\n');
  
  for (const [category, items] of Object.entries(clothingPrompts)) {
    console.log(`\n📁 Generating ${category}...`);
    
    for (const item of items) {
      try {
        console.log(`  ⏳ Generating ${item.name}...`);
        const imageUrl = await generateImage(item.prompt);
        
        const filepath = path.join(__dirname, 'public', 'clothing', category, `${item.name}.png`);
        await downloadImage(imageUrl, filepath);
        
        console.log(`  ✅ ${item.name} saved!`);
        
        // Rate limiting: wait 2 seconds between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`  ❌ Error generating ${item.name}:`, error.message);
      }
    }
  }
  
  console.log('\n🎉 Done generating all clothing items!');
}

main().catch(console.error);
