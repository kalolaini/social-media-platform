import { useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const LikeButton = ({ postId }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
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
      setLiked(!liked);
    } catch (error) {
      alert("Error toggling like.");
    }
  };

  return (
    <button onClick={toggleLike} className={`mt-2 px-4 py-1 rounded ${liked ? "bg-red-500" : "bg-gray-300"}`}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikeButton;
