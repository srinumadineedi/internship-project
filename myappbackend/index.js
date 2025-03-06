const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// PostgreSQL connection details (hardcoded)
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'pet-marriage', // Replace with your database name
  password: 'srinu', // Replace with your PostgreSQL password
  port: 5432,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database at:', res.rows[0].now);
  }
});

// API Endpoints

// Get all pets
app.get('/api/pets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pets');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new pet
app.post('/api/pets', async (req, res) => {
  const { name, breed, age } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pets (name, breed, age) VALUES ($1, $2, $3) RETURNING *',
      [name, breed, age]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});