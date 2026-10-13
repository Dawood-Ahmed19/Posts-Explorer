import { useState, useEffect, useRef, useCallback } from "react";
import { likePost, unlikePost } from "../api/posts";

const STORAGE_KEY = "likedPostIds";

const loadLikedIds = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const useLikes = () => {
  const [likedIds, setLikedIds] = useState(loadLikedIds);
  const [counts, setCounts] = useState({});
  const [likeError, setLikeError] = useState(null);
  const pendingRef = useRef(new Set());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds));
  }, [likedIds]);

  const toggleLike = useCallback(
    async (id, currentCount) => {
      if (pendingRef.current.has(id)) return;
      pendingRef.current.add(id);
      setLikeError(null);

      const wasLiked = likedIds.includes(id);

      setLikedIds((ids) =>
        wasLiked ? ids.filter((x) => x !== id) : [...ids, id],
      );
      setCounts((c) => ({ ...c, [id]: currentCount + (wasLiked ? -1 : 1) }));

      try {
        const updated = wasLiked ? await unlikePost(id) : await likePost(id);
        setCounts((c) => ({ ...c, [id]: updated.likes }));
      } catch {
        setLikedIds((ids) =>
          wasLiked ? [...ids, id] : ids.filter((x) => x !== id),
        );
        setCounts((c) => ({ ...c, [id]: currentCount }));
        setLikeError("Could Like the Post. Please try again.");
      } finally {
        pendingRef.current.delete(id);
      }
    },
    [likedIds],
  );

  return { likedIds, counts, toggleLike, likeError };
};

export { useLikes };
