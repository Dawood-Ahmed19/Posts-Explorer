import { useState, useEffect, useRef, useCallback } from "react";
import { fetchPosts } from "../api/posts";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const inflightRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      inflightRef.current = true;
      setStatus("loading");
      setError(null);

      try {
        const data = await fetchPosts(controller.signal);
        if (controller.signal.aborted) return;
        setPosts(data);
        setStatus(data.length === 0 ? "empty" : "success");
      } catch (err) {
        if (err.name === "AbortError" || controller.signal.aborted) return;

        setError("Something Went Wrong While loading posts, Try again.");
        setStatus("error");
      } finally {
        if (!controller.signal.aborted) {
          inflightRef.current = false;
        }
      }
    };
    load();
    return () => controller.abort();
  }, [reloadKey]);

  const retry = useCallback(() => {
    if (inflightRef.current) return;
    setReloadKey((key) => key + 1);
  }, []);

  const addLocalPost = useCallback((post) => {
    setPosts((current) => [...current, post]);
    setStatus("success");
  }, []);

  const replaceLocalPost = useCallback((post) => {
    setPosts((current) => current.map((p) => (p.id === post.id ? post : p)));
  }, []);

  const removeLocalPost = useCallback((id) => {
    setPosts((current) => current.filter((p) => p.id !== id));
  }, []);
  return {
    posts,
    retry,
    status,
    error,
    addLocalPost,
    replaceLocalPost,
    removeLocalPost,
  };
};

export { usePosts };
