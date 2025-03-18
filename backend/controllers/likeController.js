const Like = require("../models/Like");
const Post = require("../models/Post");

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    // Create a new like
    const like = new Like({ userId, postId });
    await like.save();

    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Check if the like exists
    const like = await Like.findOne({ userId, postId });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    // Delete the like
    await like.deleteOne();
    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
