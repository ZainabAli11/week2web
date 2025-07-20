const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Root route (GET /)
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API! Use /posts to manage blog posts.');
});

// In-memory blog data
let posts = [];
let idCounter = 1;

// CREATE - POST /posts
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  const newPost = { id: idCounter++, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// READ - GET /posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// READ SINGLE - GET /posts/:id
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  res.json(post);
});

// UPDATE - PUT /posts/:id
app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  post.title = title;
  post.content = content;
  res.json(post);
});

// DELETE - DELETE /posts/:id
app.delete('/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found.' });
  const deleted = posts.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Blog API server is running at http://localhost:${PORT}`);
});
