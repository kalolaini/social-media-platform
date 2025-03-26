import { useState } from "react";
//import { useAuth } from "../context/AuthContext";

const PostForm = ({ createPost }) => {  
  const { user } = useAuth();
  const [formData, setFormData] = useState({ content: "", image: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    try {
      await createPost(formData.content, formData.image); 
      setFormData({ content: "", image: "" }); 
    } catch (error) {
      console.error("❌ Post creation failed:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <textarea
        placeholder="Write something..."
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Post
      </button>
    </form>
  );
};

export default PostForm;

