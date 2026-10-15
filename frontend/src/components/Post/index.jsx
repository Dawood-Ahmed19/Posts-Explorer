import "../../styles/Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const Post = ({
  id,
  userId,
  title,
  body,
  likes,
  liked,
  onLike,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="post-container">
      <div>
        <p className="post-id">Post Number: {id}</p>
        <p className="user-id">User ID: {userId}</p>
        <h1 className="post-title">{title}</h1>
        <p className="post-body">{body}</p>
      </div>
      {/* aciton btns */}
      <div className="action-buttons">
        <button type="button" onClick={onEdit}>
          <FontAwesomeIcon icon={faPencil} />
          Edit
        </button>
        <button type="button" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>
      </div>
      {/* Like / dislike button */}
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
