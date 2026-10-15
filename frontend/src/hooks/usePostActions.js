import { useState, useRef } from "react";
import { createPost, updatePost, deletePost } from "../api/posts";

const usePostActions = ({ onCreated, onUpdated, onDeleted }) => {
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState(null);
  const busyRef = useRef(false);

  const run = async (task, onSuccess) => {
    if (busyRef.current) return false;
    busyRef.current = true;
    setSaving(true);
    setActionError(null);

    try {
      onSuccess(await task());
      return true;
    } catch (err) {
      setActionError(err.message);
      return false;
    } finally {
      busyRef.current = false;
      setSaving(false);
    }
  };

  return {
    saving,
    actionError,
    clearActionError: () => setActionError(null),
    create: (values) => run(() => createPost(values), onCreated),
    update: (id, values) => run(() => updatePost(id, values), onUpdated),
    remove: (id) => run(() => deletePost(id), onDeleted),
  };
};

export { usePostActions };
