
import fs from 'fs';

const filePath = 'c:/Users/lenovo/OneDrive/Desktop/sql-nosql-dashboard/my-dashboard/src/data/levels_generated.js';
const content = fs.readFileSync(filePath, 'utf8');

// Strip export and eval
const jsCode = content.replace('export const levels =', '').trim().replace(/;$/, '');
const levels = eval('(' + jsCode + ')');

levels.forEach(level => {
    console.log(`Level ${level.id}: ${level.questions.length} questions`);
});
