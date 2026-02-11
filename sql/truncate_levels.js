
import fs from 'fs';
const content = fs.readFileSync('src/data/levels.js', 'utf8');

// The file structure is:
// import ...
// export const sqlLevels = [
//   { ... level 1 ... },
//   ...
//   { ... level 20 ... }
// ];
// export { nosqlLevels };

// Since levels are objects in an array, we can use a more surgical approach.
// I'll reuse the logic from my count script to find level starts.
const levelHeaderRegex = /\{\s*\"id\":\s*\d+,\s*\"title\":\s*\"SQL Level (\d+)\"/g;
let matches = [];
let m;
while ((m = levelHeaderRegex.exec(content)) !== null) {
    matches.push({ num: parseInt(m[1]), index: m.index });
}

if (matches.length < 10) {
    console.error('Less than 10 levels found?!');
    process.exit(1);
}

// Target breakdown to reach exactly 174 questions spread over 10 levels.
// Let's use 18 questions for most levels, and some with 17 or 15.
// Level 9 should have 15 (as we recently overhaulled it).
// Level 10 should have 17.
// 15 + 17 = 32.
// 174 - 32 = 142.
// 142 questions for Levels 1-8.
// 142 / 8 = 17.75.
// So 6 levels with 18, 2 levels with 17.
// 18*6 + 17*2 = 108 + 34 = 142. OK!

const targetCounts = [18, 18, 18, 18, 18, 18, 17, 17, 15, 17];
// Total: 108 + 34 + 15 + 17 = 174. Perfect.

let newSqlLevels = [];

for (let i = 0; i < 10; i++) {
    const start = matches[i].index;
    const end = (i < matches.length - 1) ? matches[i + 1].index : content.lastIndexOf('];');
    let levelText = content.substring(start, end);

    // Extract questions array
    // We look for "questions": [ and everything until the closing ] for that array.
    // This is tricky with regex, so we'll find questions objects one by one.
    const questionRegex = /\{\s*\"id\":\s*\d+,\s*\"text\":[\s\S]*?\"allowedBlocks\":\s*\[[\s\S]*?\]\s*\}/g;
    let questions = [];
    let qMatch;
    while ((qMatch = questionRegex.exec(levelText)) !== null) {
        questions.push(qMatch[0]);
    }

    console.log(`Level ${i + 1}: Original ${questions.length} questions, Truncating to ${targetCounts[i]}`);

    // Keep only target count
    const keptQuestions = questions.slice(0, targetCounts[i]);

    // Reconstruct level object
    // Note: We need to preserve the level metadata (id, title, type) and the "questions": [ prefix
    const headMatch = levelText.match(/[\s\S]*?\"questions\":\s*\[/);
    if (!headMatch) throw new Error('Could not find questions head for level ' + (i + 1));

    let levelResult = headMatch[0] + "\n            " + keptQuestions.join(",\n            ") + "\n        ]\n    }";
    newSqlLevels.push(levelResult);
}

// Final file construction
const header = content.substring(0, content.indexOf('export const sqlLevels = [') + 'export const sqlLevels = ['.length);
const footer = "];\n\nexport { nosqlLevels };"; // We'll keep the export

const finalContent = header + "\n    " + newSqlLevels.join(",\n    ") + "\n" + footer;

fs.writeFileSync('src/data/levels.js', finalContent);
console.log('--- Truncation Complete ---');
console.log('Total levels: 10');
console.log('Total questions:', targetCounts.reduce((a, b) => a + b, 0));
