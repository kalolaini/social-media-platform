import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const LikeButton = ({ postId, initialLiked }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(initialLiked);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const handleLikeToggle = async () => {
    if (!user?.token) {
      alert("You must be logged in to like posts.");
      return;
    }

    try {
      if (liked) {
        // Unlike Post
        await axiosInstance.delete(`/likes/${postId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLiked(false);
      } else {
        // Like Post, but only if it's not already liked
        await axiosInstance.post(`/likes/${postId}`, {}, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLiked(true);
      }
    } catch (error) {
      console.error("❌ Error toggling like:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error toggling like");
    }
  };

  return (
    <button onClick={handleLikeToggle} className={`mt-2 px-3 py-1 rounded ${liked ? "bg-red-500" : "bg-gray-300"}`}>
      {liked ? "❤️" : "🤍"}
    </button>
  );
};

export default LikeButton;

