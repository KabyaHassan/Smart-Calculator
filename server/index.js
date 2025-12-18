const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { evaluate } = require('mathjs');
const db = require('./database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Helper to format result
const formatResult = (res) => {
    if (typeof res === 'number') {
        return parseFloat(res.toFixed(10)); // Avoid floating point errors
    }
    return res;
};

// API: Calculate
app.post('/api/calculate', (req, res) => {
    const { expression } = req.body;
    try {
        // Basic NLP: Replace natural language with operators
        let cleanExpr = expression
            .toLowerCase()
            .replace(/plus/g, '+')
            .replace(/minus/g, '-')
            .replace(/times/g, '*')
            .replace(/multiplied by/g, '*')
            .replace(/divided by/g, '/')
            .replace(/over/g, '/')
            .replace(/x/g, '*') // Treat 'x' as multiplication if simple
            .replace(/sqrt/g, 'sqrt')
            .replace(/pi/g, 'pi');

        const result = evaluate(cleanExpr);
        const formattedResult = formatResult(result);

        // Save to History
        const stmt = db.prepare('INSERT INTO history (expression, result) VALUES (?, ?)');
        stmt.run(expression, String(formattedResult));

        res.json({ result: formattedResult });
    } catch (error) {
        res.status(400).json({ error: 'Invalid expression' });
    }
});

// API: Get History
app.get('/api/history', (req, res) => {
    const stmt = db.prepare('SELECT * FROM history ORDER BY timestamp DESC LIMIT 10');
    const history = stmt.all();
    res.json(history);
});

// API: Clear History
app.delete('/api/history', (req, res) => {
    const stmt = db.prepare('DELETE FROM history');
    stmt.run();
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
