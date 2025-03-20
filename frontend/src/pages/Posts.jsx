import { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const Posts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  // ✅ Fetch Posts from Backend
  useEffect(() => {
    if (user?.token) {
      axiosInstance
        .get("/posts", { //This is where I previously had the wrong API
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          console.log("Fetched posts:", response.data);
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("❌ Error fetching posts:", error.response?.status, error.response?.data || error.message);
        });
    }
  }, [user]);

  // ✅ Create Post Function
  const createPost = async (content, image) => {
    try {
      const response = await axiosInstance.post(
        "/posts", //API endpoint
        { content, image },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setPosts([response.data, ...posts]); // Add new post to UI
        } catch (error) {
        console.error("❌ Error creating post:", error.response?.status, error.response?.data || error.message);
        }
  };

  // ✅ Update Post Function
  const updatePost = async (id, updatedContent, updatedImage) => {
    try {
      const response = await axiosInstance.put(
        `/api/posts/${id}`,
        { content: updatedContent, image: updatedImage },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
  
      setPosts(posts.map((post) => (post._id === id ? response.data : post))); // ✅ Update UI
    } catch (error) {
      console.error("❌ Error updating post:", error.response?.status, error.response?.data || error.message);
    }
  };

  // ✅ Delete Post Function
  const deletePost = async (id) => {
    try {
      await axiosInstance.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id)); // ✅ Remove post from UI
    } catch (error) {
      console.error("❌ Error deleting post:", error.response?.status, error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {user && <PostForm createPost={createPost} />} {/* ✅ Ensure createPost is passed */}
      <PostList posts={posts} updatePost={updatePost} deletePost={deletePost} />
    </div>
  );
};

export default Posts;
