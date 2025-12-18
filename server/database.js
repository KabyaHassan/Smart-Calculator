const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'calculator.db');
const db = new Database(dbPath);

// Create table if not exists
const stmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        expression TEXT NOT NULL,
        result TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);
stmt.run();

module.exports = db;
