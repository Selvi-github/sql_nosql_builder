import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatedPath = path.join(__dirname, '../src/data/levels_generated.js');
const targetPath = path.join(__dirname, '../src/data/levels.js');

try {
    let content = fs.readFileSync(generatedPath, 'utf8');

    // Replace variable name
    content = content.replace('export const levels =', 'export const sqlLevels =');

    // Add import
    const importLine = "import { nosqlLevels } from './nosql_levels_data.js';\n\n";

    // Add export
    const exportLine = "\n\nexport { nosqlLevels };";

    // Combine
    const finalContent = importLine + content + exportLine;

    fs.writeFileSync(targetPath, finalContent);
    console.log('levels.js synced successfully with Clean SQL Levels (1-20)!');
} catch (error) {
    console.error('Error syncing levels:', error);
    process.exit(1);
}
