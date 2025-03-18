import { useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const PostForm = ({ setPosts }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/posts",
        { content },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPosts((prev) => [response.data, ...prev]);
      setContent("");
    } catch (error) {
      alert("Failed to create post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-4">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-2">
        Post
      </button>
    </form>
  );
};

export default PostForm;
