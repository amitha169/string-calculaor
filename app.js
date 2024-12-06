import express from 'express';
import add from './calculator.js';

const app = express();

app.get('/add', (req, res) => {
  const { numbers } = req.query;
  try {
    const result = add(numbers);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default app;
