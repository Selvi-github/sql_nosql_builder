
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawPath = path.join(__dirname, '../src/assets/sql/sql_levels_query');
const outPath = path.join(__dirname, '../src/data/levels_generated.js');

const raw = fs.readFileSync(rawPath, 'utf8');

// Split raw by lines
const lines = raw.split('\n');

const allQuestions = [];
let currentCategory = 'General';

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for category header
    if (line.startsWith('-- 🧩')) {
        currentCategory = line.replace('-- 🧩', '').trim();
        continue;
    }

    // Check for question line "-- ID. Text"
    const qMatch = line.match(/^--\s+(\d+)\.\s+(.+)$/);
    if (qMatch) {
        const id = parseInt(qMatch[1]);
        const text = qMatch[2].trim();
        let query = '';

        // Find the next non-empty line that isn't a comment
        let nextIdx = i + 1;
        while (nextIdx < lines.length) {
            const nextLine = lines[nextIdx].trim();
            if (nextLine && !nextLine.startsWith('--')) {
                query = nextLine;
                break;
            }
            if (nextLine.startsWith('--')) break; // Next question or category
            nextIdx++;
        }

        if (query) {
            allQuestions.push({
                origId: id,
                text,
                query,
                category: currentCategory
            });
            i = nextIdx; // Skip to query line
        }
    }
}

console.log(`Parsed ${allQuestions.length} total questions.`);

// 1. Identify "Group By" questions (41-60)
const groupByQs = allQuestions.filter(q => q.origId >= 41 && q.origId <= 60);
// 2. Identify "String Functions" questions (121-145)
const stringFs = allQuestions.filter(q => q.origId >= 121 && q.origId <= 145);
// 3. Keep rest in relative order
const rest = allQuestions.filter(q => !(q.origId >= 121 && q.origId <= 145));

// Reorder Logic: Insert stringFs immediately after groupByQs in the sequence
const reorderedAll = [];
const insertAfterId = 60; // Group By ends at 60

for (const q of rest) {
    reorderedAll.push(q);
    if (q.origId === insertAfterId) {
        reorderedAll.push(...stringFs);
    }
}

// 4. Group into 20 levels of 30 questions each (20 * 30 = 600)
const finalLevels = [];
const questionsPerLevel = 30;
const totalTargetLevels = 20;

for (let i = 0; i < totalTargetLevels; i++) {
    const levelNum = i + 1;
    const startIdx = i * questionsPerLevel;
    const levelQuestionsRaw = reorderedAll.slice(startIdx, startIdx + questionsPerLevel);

    if (levelQuestionsRaw.length === 0) continue;

    const levelQuestions = levelQuestionsRaw.map((q, idx) => {
        const blocks = ['sql_select'];
        const sql = (q.query || '').toUpperCase();

        if (sql.includes('WHERE')) blocks.push('sql_where');
        if (sql.includes('JOIN')) blocks.push('sql_join');
        if (sql.includes('GROUP BY')) blocks.push('sql_group');
        if (sql.includes('HAVING')) blocks.push('sql_having');
        if (sql.includes('ORDER BY')) blocks.push('sql_order');
        if (sql.includes('LIMIT')) blocks.push('sql_limit');
        if (sql.includes('INSERT')) blocks.push('sql_insert');
        if (sql.includes('UPDATE')) blocks.push('sql_update');
        if (sql.includes('DELETE')) blocks.push('sql_delete');
        if (sql.includes('CREATE TABLE')) blocks.push('sql_create_table');

        // Tokenize query for expectedPattern
        const structures = (q.query || '').split(/[\s,;()]+/).filter(t => t.length > 0);

        return {
            id: levelNum * 100 + (idx + 1),
            text: q.text,
            expectedPattern: { structures },
            hint: `Try using: ${q.query}`,
            allowedBlocks: [...new Set(blocks)]
        };
    });

    finalLevels.push({
        id: levelNum,
        title: `SQL Level ${levelNum}`,
        type: 'SQL',
        questions: levelQuestions
    });
}

const fileContent = `export const levels = ${JSON.stringify(finalLevels, null, 4)};\n`;

fs.writeFileSync(outPath, fileContent);
console.log(`Successfully reconstructed ${finalLevels.length} levels with ${reorderedAll.length} questions.`);
