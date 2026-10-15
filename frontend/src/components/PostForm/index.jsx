import { useState } from "react";
import "../../styles/postForm.css";
const PostForm = ({ initial, saving, error, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title: title.trim(), body: body.trim() });
  };

  const canSave = title.trim() && body.trim() && !saving;

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>{initial ? "Edit post" : "New post"}</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write something..."
        rows={4}
        aria-label="Body"
      />

      {error && (
        <p role="alert" className="like-error">
          {error}
        </p>
      )}

      <div className="post-form-actions">
        <button type="submit" disabled={!canSave}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
