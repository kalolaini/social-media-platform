const Like = require("../models/Like");
const Post = require("../models/Post");

// Like a Post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Ensure the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "❌ Post not found" });
    }

    // Check if user has already liked the post
    let existingLike = await Like.findOne({ userId, postId });
    if (!existingLike) {
        // If like does not exist, create a new like
        existingLike = new Like({ userId, postId });
        await existingLike.save();
      }

    //Create a new like
    //await new Like({ userId, postId }).save();

    // Fetch updated like count
    const likeCount = await Like.countDocuments({ postId });

    res.status(201).json({ liked: true, likeCount });
  } catch (error) {
    console.error("❌ Error liking post:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};

// Unlike a Post
exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Check if the like exists
    const like = await Like.findOne({ userId, postId });
    if (!like) {
      return res.status(404).json({ message: "❌ Like not found" });
    }

    // Remove the like
    await like.deleteOne();

    // Fetch updated like count
    const likeCount = await Like.countDocuments({ postId });

    res.status(200).json({ liked: false, likeCount });
  } catch (error) {
    console.error("❌ Error unliking post:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};

