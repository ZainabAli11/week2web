const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to Blog API');
});

app.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
