const Post = ({ id, userId, title, body, likes, liked, onLike }) => {
  return (
    <div className="post-container">
      <div>
        <p className="post-id">Post Number: {id}</p>
        <p className="user-id">User ID: {userId}</p>
        <h1 className="post-title">{title}</h1>
        <p className="post-body">{body}</p>
      </div>
      <button
        type="button"
        className={`like-button ${liked ? "liked" : ""}`}
        onClick={onLike}
        aria-pressed={liked}
        aria-label={liked ? "Unlike post" : "Like post"}
      >
        {liked ? "♥" : "♡"} {likes}
      </button>
    </div>
  );
};

export default Post;
