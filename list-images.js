const fs = require('fs');
const path = require('path');

// Simple approach: use canvas to convert images
// Since we can't easily install native modules, let's try a pure JS approach

const imagesDir = 'c:/Users/mthar/OneDrive/Desktop/catdaddyscatcafe/assets/images';

// List files to convert (excluding menu.png)
const files = fs.readdirSync(imagesDir);
const toConvert = files.filter(f =>
    (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')) &&
    f !== 'menu.png'
);

console.log('Files to convert:');
toConvert.forEach(f => {
    const stats = fs.statSync(path.join(imagesDir, f));
    console.log(`  ${f} - ${(stats.size / 1024).toFixed(1)} KB`);
});

console.log('\nTotal files: ' + toConvert.length);
