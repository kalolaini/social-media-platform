import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    axiosInstance.get(`/comments/${postId}`).then((response) => {
      setComments(response.data);
    });
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/comments/${postId}`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComments((prev) => [...prev, response.data]);
      setCommentText("");
    } catch (error) {
      alert("Failed to add comment.");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold mb-2">Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="text-sm bg-gray-200 p-2 rounded mb-2">
          {comment.content}
        </div>
      ))}
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
