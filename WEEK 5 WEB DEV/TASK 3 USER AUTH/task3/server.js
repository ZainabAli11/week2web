const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

app.use(express.json());

// Dummy in-memory data stores
let users = [];
let posts = [];
let idCounter = 1;

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware to check role
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
  };
}

// Register
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role required.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });
  res.status(201).json({ message: 'User registered successfully.' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route: Create Post (admin only)
app.post('/posts', authenticateToken, authorizeRole('admin'), (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  const newPost = { id: idCounter++, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Public route: Get Posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Blog API is running. Use /register, /login, /posts, etc.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Auth-protected Blog API running at http://localhost:${PORT}`);
});
