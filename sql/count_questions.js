
import fs from 'fs';
const content = fs.readFileSync('src/data/levels.js', 'utf8');
const levelHeaderRegex = /\{\s*\"id\":\s*\d+,\s*\"title\":\s*\"SQL Level (\d+)\"/g;
let matches = [];
let m;
while ((m = levelHeaderRegex.exec(content)) !== null) {
    matches.push({ num: parseInt(m[1]), index: m.index });
}

console.log('Total Levels Found:', matches.length);

let subtotal = 0;
for (let i = 0; i < Math.min(10, matches.length); i++) {
    const start = matches[i].index;
    const end = (i < matches.length - 1) ? matches[i + 1].index : content.lastIndexOf('];');
    const qCount = (content.substring(start, end).match(/\"expectedPattern\":/g) || []).length;
    console.log(`Level ${matches[i].num}: ${qCount} questions`);
    subtotal += qCount;
}
console.log('Subtotal (L1-10):', subtotal);
