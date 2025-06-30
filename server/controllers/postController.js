

const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const email = req.user.email;  // get email from logged in user

    const newPost = new Post({ email, content });
    await newPost.save();

    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// Get all posts with replies
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
};

// Add reply to a post
exports.addReply = async (req, res) => {
  try {
    const postId = req.params.id;
    const { message } = req.body;
    const email = req.user.email; // logged in user

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.replies.push({ email, message });
    await post.save();

    res.status(201).json({ message: 'Reply added', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add reply' });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
