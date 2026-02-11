const fs = require('fs');
const path = 'c:/Users/lenovo/OneDrive/Desktop/sql-nosql-dashboard/my-dashboard/src/data/nosql/levels.js';
try {
    const content = fs.readFileSync(path, 'utf8');
    const lines = content.split(/\r?\n/);
    console.log(`Original line count: ${lines.length}`);
    if (lines.length > 2487) {
        // Keep lines 0 to 2486 (inclusive), which is 2487 lines
        const truncatedLines = lines.slice(0, 2487);
        // Ensure the last line matches the expected indentation closure or add it
        // The last line at 2487 (index 2486) should be "    },"

        let truncated = truncatedLines.join('\n');
        truncated += '\n];';

        fs.writeFileSync(path, truncated, 'utf8');
        console.log('Truncated successfully.');
    } else {
        console.log('File is already short.');
    }
} catch (e) {
    console.error('Error:', e);
}
