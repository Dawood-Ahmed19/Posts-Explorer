import Post from "../Post";
import "../../styles/PostList.css";

const PostList = ({ posts, likedIds, counts, onToggleLike }) => {
  return (
    <>
      <section className="post-list">
        {posts.map((post) => {
          const likes = counts[post.id] ?? post.likes ?? 0;
          return (
            <Post
              key={post.id}
              {...post}
              likes={likes}
              liked={likedIds.includes(post.id)}
              onLike={() => onToggleLike(post.id, likes)}
            />
          );
        })}
      </section>
    </>
  );
};

export default PostList;
