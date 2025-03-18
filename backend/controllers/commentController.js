const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Create a comment
exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new comment
    const comment = new Comment({ userId, postId, content });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a post
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find comments by postId
    const comments = await Comment.find({ postId }).populate("userId", "name email");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
