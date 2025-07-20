const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.get('/about', (req, res) => {
  res.send('This is the About page.');
});

app.post('/submit', (req, res) => {
  const data = req.body;
  res.send(`Data received: ${JSON.stringify(data)}`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
