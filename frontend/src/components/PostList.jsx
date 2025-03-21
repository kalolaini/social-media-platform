import { useState } from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const PostList = ({ posts, setPosts, updatePost }) => {
  const { user } = useAuth();
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState("");

  // ✅ Handle edit button click
  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditedContent(post.content);
    setEditedImage(post.image || "");
  };

  // ✅ Handle save after editing
  const handleSaveClick = async (postId) => {
    try {
      const response = await axiosInstance.put(
        `/posts/${postId}`,
        { content: editedContent, image: editedImage },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // ✅ Update UI immediately after updating post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...response.data, likes: post.likes } // ✅ Preserve likes
            : post
        )
      );

      setEditingPostId(null);
    } catch (error) {
      console.error("❌ Error updating post:", error.response?.data || error.message);
      alert("Error updating post. Please try again.");
      setEditingPostId(null);
    }
  };

  // ✅ Handle delete post
  const handleDeleteClick = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await axiosInstance.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      console.log("✅ Response from delete:", response.data);

      // ✅ Remove deleted post from UI
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

      alert("Post deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting post:", error.response?.data || error.message);
      alert("Error deleting post. Please try again.");
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          {editingPostId === post._id ? (
            // ✅ Edit Mode
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editedImage}
                onChange={(e) => setEditedImage(e.target.value)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Image URL (optional)"
              />
              <button
                onClick={() => handleSaveClick(post._id)}
                className="bg-green-600 text-white px-3 py-1 rounded mt-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingPostId(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded mt-2 ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            // ✅ View Mode
            <div>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Post" className="mt-2 max-w-full h-auto rounded" />}
              <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>

              {/* ✅ Like Button */}
              <LikeButton postId={post._id} />

              {/* ✅ Comment Section */}
              <CommentSection postId={post._id} />

              {/* ✅ Show Edit & Delete only for Post Owner */}
              {user && post.userId && (
                user.id.toString() === (post.userId._id ? post.userId._id.toString() : post.userId.toString()) && (
                  <div className="mt-2">
                    <button
                      onClick={() => handleEditClick(post)}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;


