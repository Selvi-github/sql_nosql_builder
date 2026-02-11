const fs = require('fs');
const path = 'c:/Users/lenovo/OneDrive/Desktop/sql-nosql-dashboard/my-dashboard/src/data/nosql/levels.js';
try {
    const content = fs.readFileSync(path, 'utf8');
    // split by regex to handle different newlines
    const lines = content.split(/\r?\n/);
    console.log(`Current line count: ${lines.length}`);

    // We want to keep lines up to the end of Level 20.
    // Level 20 end closes with "    },"
    // In the previous view, this was line 2486.
    // So we want indices 0 to 2485.

    const fixed = lines.slice(0, 2486).join('\n') + '\n];';
    fs.writeFileSync(path, fixed, 'utf8');
    console.log('Fixed successfully.');
} catch (e) {
    console.error(e);
}
