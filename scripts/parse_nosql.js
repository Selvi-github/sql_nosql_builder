import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawPath = path.join(__dirname, '../src/data/raw_nosql.txt');
const outPath = path.join(__dirname, '../src/data/nosql_levels_data.js');

const raw = fs.readFileSync(rawPath, 'utf8');

// Regex to match "1. Question \n Answer"
// Questions are numbered 1 to 300.
// We relax the regex to handle potential formatting variations
const regex = /(\d+)\.\s+([^\n]+)\n([^\n]+)/g;

let matches;
const questions = [];

while ((matches = regex.exec(raw)) !== null) {
    questions.push({
        num: parseInt(matches[1]),
        text: matches[2].trim(),
        answer: matches[3].trim()
    });
}

console.log(`Parsed ${questions.length} questions.`);

// Group into 30 levels of 10
const levels = [];
for (let i = 0; i < 30; i++) {
    const levelNum = i + 1;
    const startIdx = i * 10;
    const levelQuestions = questions.slice(startIdx, startIdx + 10).map(q => {
        // Infer allowed blocks based on the answer
        const blocks = ['nosql_find']; // default
        const ans = q.answer;

        // Check for specific operations
        if (ans.includes('sort')) blocks.push('nosql_sort');
        if (ans.includes('limit')) blocks.push('nosql_limit');
        if (ans.includes('skip')) blocks.push('nosql_skip');
        if (ans.includes('count') || ans.includes('countDocuments')) blocks.push('nosql_count');
        if (ans.includes('aggregate')) blocks.push('nosql_aggregate');
        if (ans.includes('distinct')) blocks.push('nosql_distinct');
        if (ans.includes('$gt') || ans.includes('$lt') || ans.includes('$ne') || ans.includes('$gte') || ans.includes('$lte')) {
            blocks.push('nosql_comparison', 'nosql_logical');
        }
        if (ans.includes('project')) blocks.push('nosql_project');
        if (ans.includes('findOne')) blocks.push('nosql_find_one');
        if (ans.includes('insert') || ans.includes('update') || ans.includes('delete') || ans.includes('remove') || ans.includes('replaceOne')) {
            blocks.push('nosql_update', 'nosql_delete', 'nosql_insert');
        }

        // Index operations
        if (ans.includes('createIndex') || ans.includes('dropIndex') || ans.includes('getIndexes')) {
            blocks.push('nosql_index');
        }

        // Admin operations
        if (ans.includes('stats') || ans.includes('drop()') || ans.includes('renameCollection')) {
            blocks.push('nosql_admin');
        }

        return {
            id: q.num, // IDs 1-300
            text: q.text,
            hint: `Try: ${q.answer}`,
            expectedPattern: {
                // For NoSQL, we might not use "structures" tokens as strictly as SQL?
                // Or maybe we do. GameContext doesn't validate strictly for NoSQL yet?
                // We'll put the answer as the hint. validation might be strict exact match or loose.
                // For now, put the answer string.
                script: q.answer
            },
            allowedBlocks: [...new Set(blocks)]
        };
    });

    levels.push({
        id: levelNum, // Reuse IDs 1-30. Context must separate storage!
        title: `NoSQL Level ${levelNum}`,
        type: 'NoSQL',
        questions: levelQuestions
    });
}

const fileContent = `// Auto-generated NoSQL Levels
export const nosqlLevels = ${JSON.stringify(levels, null, 4)};
`;

fs.writeFileSync(outPath, fileContent);
console.log('Written nosql_levels_data.js');
