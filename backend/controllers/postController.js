const Post = require("../models/Post");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const newPost = new Post({ userId: req.user.id, content, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // ✅ Check if the post exists
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // ✅ Only allow the post owner to update
      if (post.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // ✅ Validate request body
      if (!req.body.content?.trim()) {
        return res.status(400).json({ message: "Content cannot be empty" });
      }
  
      // ✅ Update post fields
      post.content = req.body.content;
      post.image = req.body.image || post.image;
  
      // ✅ Save updated post
      const updatedPost = await post.save();
  
      // ✅ Return updated post
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Delete a post
exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // ✅ Check if the post exists before accessing userId
      if (!post) {
        return res.status(404).json({ message: "❌ Post not found" });
      }
  
      // ✅ Check if the user requesting deletion is the owner
      if (post.userId.toString() !== req.user.id) {
        return res.status(401).json({ message: "❌ Unauthorized" });
      }
  
      await post.deleteOne();
      res.json({ message: "✅ Post deleted successfully" });
    } catch (err) {
      console.error("❌ Error deleting post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
