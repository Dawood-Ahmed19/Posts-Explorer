const postsUrl =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/posts";
const SIMULATE = null;

const delay = (ms, signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

const fetchPosts = async (signal) => {
  if (SIMULATE === "slow") await delay(3000, signal);
  if (SIMULATE === "error") throw new Error("Simulated Server Error");
  const response = await fetch(postsUrl, { signal });
  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  const data = response.json();
  return SIMULATE === "empty" ? [] : data;
};

const sendLike = async (id, method) => {
  const response = await fetch(`${postsUrl}/${id}/like`, { method });
  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return response.json();
};
const sendJson = async (url, method, payload) => {
  const response = await fetch(url, {
    method,
    headers: payload ? { "Content-Type": "application/json" } : undefined,
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || `Server Error: ${response.status}`);
  }
  return response.json();
};

const createPost = (values) => sendJson(postsUrl, "POST", values);
const updatePost = (id, values) =>
  sendJson(`${postsUrl}/${id}`, "PATCH", values);
const deletePost = (id) => sendJson(`${postsUrl}/${id}`, "DELETE");

const likePost = (id) => sendLike(id, "POST");
const unlikePost = (id) => sendLike(id, "DELETE");

export {
  fetchPosts,
  postsUrl,
  likePost,
  unlikePost,
  createPost,
  updatePost,
  deletePost,
};
