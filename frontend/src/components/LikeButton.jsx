import { useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const LikeButton = ({ postId }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = async () => {
    if (!user?.token) {
      alert("You must be logged in to like posts.");
      return;
    }

    try {
      if (liked) {
        await axiosInstance.delete(`/likes/${postId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await axiosInstance.post(`/likes/${postId}`, {}, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      setLiked(!liked); // ✅ Toggle the Like state
    } catch (error) {
      console.error("❌ Error toggling like:", error.response?.data || error.message);
    }
  };

  return (
    <button 
      onClick={handleLikeToggle} 
      className={`mt-2 px-3 py-1 rounded ${liked ? "bg-red-500" : "bg-gray-300"}`}
    >
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikeButton;
