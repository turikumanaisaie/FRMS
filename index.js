const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// db connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BENNIQ'
});

// GET all films
app.get('/api/films', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM films');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET a film ID
app.get('/api/films/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM films WHERE film_id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Film not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add film
app.post('/api/films', async (req, res) => {
    const { title, category, director, duration, recording_date, status } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO films (title, category, director, duration, recording_date, status) VALUES (?, ?, ?, ?, ?, ?)',
            [title, category, director, duration, recording_date, status]
        );
1        res.status(201).json({ film_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update film
app.put('/api/films/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, director, duration, recording_date, status } = req.body;
    try {
        await pool.query(
            'UPDATE films SET title=?, category=?, director=?, duration=?, recording_date=?, status=? WHERE film_id=?',
            [title, category, director, duration, recording_date, status, id]
        );
        res.json({ message: 'Film updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove film
app.delete('/api/films/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM films WHERE film_id=?', [id]);
        res.json({ message: 'Film deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// server
app.listen(5000, () => console.log('Server running on port 5000'));