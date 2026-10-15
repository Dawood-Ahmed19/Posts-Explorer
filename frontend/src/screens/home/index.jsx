import { useState } from "react";
import {
  Loader,
  ErrorState,
  EmptyState,
  PostList,
  SearchInput,
  Pagination,
  Dashboard,
  PostForm,
} from "../../components";
import { usePosts } from "../../hooks/usePosts";
import { useLikes } from "../../hooks/useLikes";
import "../../styles/Home.css";
import { usePostActions } from "../../hooks/usePostActions";

const Home = () => {
  const {
    posts,
    retry,
    error,
    status,
    addLocalPost,
    removeLocalPost,
    replaceLocalPost,
  } = usePosts();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(normalizedQuery);
  });
  const { likedIds, counts, toggleLike, likeError } = useLikes();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const PaginatedPosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const closeForm = () => {
    setFormOpen(false);
    setEditingPost(null);
  };

  const actions = usePostActions({
    onCreated: addLocalPost,
    onUpdated: replaceLocalPost,
    onDeleted: (post) => removeLocalPost(post.id),
  });

  const openAdd = () => {
    actions.clearActionError();
    setEditingPost(null);
    setFormOpen(true);
  };

  const openEdit = (post) => {
    actions.clearActionError();
    setEditingPost(post);
    setFormOpen(true);
  };

  const handleSubmit = async (values) => {
    const ok = editingPost
      ? await actions.update(editingPost.id, values)
      : await actions.create(values);
    if (ok) closeForm();
  };

  const handleDelete = (post) => {
    if (window.confirm(`Delete "${post.title}"?`)) actions.remove(post.id);
  };

  const renderContent = () => {
    if (status === "loading") return <Loader />;
    if (status === "error") {
      return <ErrorState message={error} onRetry={retry} />;
    }
    if (status === "empty" || posts.length === 0) {
      return (
        <EmptyState
          title="No posts yet"
          message="Your dashboard is ready! There are no posts available right now. Check back later."
        />
      );
    }
    if (filteredPosts.length === 0) {
      return (
        <EmptyState
          title="No results found"
          message={`No posts match "${query}". Try another search.`}
        />
      );
    }

    return (
      <>
        {likeError && (
          <p role="alert" className="like-error">
            {likeError}
          </p>
        )}
        <PostList
          posts={PaginatedPosts}
          likedIds={likedIds}
          counts={counts}
          onToggleLike={toggleLike}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
        <div className="home-pagination">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPrevious={() => setPage(currentPage - 1)}
            onNext={() => setPage(currentPage + 1)}
          />
        </div>
      </>
    );
  };

  return (
    <main className="home">
      <Dashboard posts={posts} filteredPosts={filteredPosts} />

      <section className="home-content">
        <div className="home-search">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">YOUR COLLECTION</span>
              <h2>Explore posts</h2>
            </div>

            {status === "success" && (
              <span className="results-badge">
                {filteredPosts.length} results
              </span>
            )}
          </div>

          <SearchInput
            value={query}
            onChange={handleSearch}
            placeholder="Search posts by title..."
            onReload={retry}
            reloading={status === "loading"}
          />
        </div>

        <button className="add-post-button" type="button" onClick={openAdd}>
          + Add post
        </button>

        {formOpen && (
          <PostForm
            key={editingPost?.id ?? "new"}
            initial={editingPost}
            saving={actions.saving}
            error={actions.actionError}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        )}

        {renderContent()}
      </section>
    </main>
  );
};

export default Home;
