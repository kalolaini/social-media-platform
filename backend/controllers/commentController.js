const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Create a comment
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;

        console.log("➡️ Request to Add Comment");
        console.log("📌 Post ID:", postId);
        console.log("👤 Request User:", req.user); // ✅ Log the user object

        // If req.user is missing, return an error
        if (!req.user) {
            console.error("❌ User not authenticated. req.user is undefined.");
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userId = req.user.id;
        console.log("✅ User ID:", userId);

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            console.error("❌ Post not found:", postId);
            return res.status(404).json({ message: "Post not found" });
        }

        // Create a new comment
        const comment = new Comment({ userId, postId, content });
        await comment.save();

        console.log("✅ Comment added successfully:", comment);
        res.status(201).json(comment);
    } catch (error) {
        console.error("❌ Error adding comment:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get all comments for a post
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params; // ✅ Extract postId from URL params

    console.log("🔍 Fetching comments for post ID:", postId);

    // Find comments for the given postId and populate user details
    const comments = await Comment.find({ postId }).populate("userId", "name email");

    console.log(`✅ Found ${comments.length} comments for post ID:`, postId);
    res.status(200).json(comments);
  } catch (error) {
    console.error("❌ Error fetching comments:", error.message);
    res.status(500).json({ message: error.message });
  }
};
