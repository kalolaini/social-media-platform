import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // ✅ Fetch comments when postId changes
  useEffect(() => {
    if (!postId || !user?.token) return;

    axiosInstance
      .get(`/comments/${postId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching comments:", error.response?.status, error.response?.data || error.message);
      });
  }, [postId, user]);

  // ✅ Handle submitting a comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!user?.token) {
        alert("You need to be logged in to comment.");
        console.error("❌ User token is missing.");
        return;
    }

         console.log("➡️ Sending request to add comment...");
        console.log("📌 Post ID:", postId);
        console.log("🔑 User Token:", user.token);

    try {
        const response = await axiosInstance.post(
            `/comments/${postId}`, // ✅ Ensure correct API endpoint
            { content: commentText },
            { headers: { Authorization: `Bearer ${user.token}` } }
        );

        console.log("✅ Comment added successfully:", response.data);
        setComments((prev) => [...prev, response.data]);
        setCommentText("");
    } catch (error) {
        console.error("❌ Failed to add comment:", error.response?.status, error.response?.data || error.message);
        alert(`Failed to add comment: ${error.response?.data?.message || "Unknown error"}`);
    }
};

  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold mb-2">Comments</h3>

      {/* ✅ Display comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="text-sm bg-gray-200 p-2 rounded mb-2">
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}

      {/* ✅ Show input field only if logged in */}
      {user && (
        <form onSubmit={handleCommentSubmit} className="mt-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full p-2 border rounded"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-2">
            Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;

