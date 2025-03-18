import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <p>{post.content}</p>
          <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
          <LikeButton postId={post._id} />
          <CommentSection postId={post._id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
