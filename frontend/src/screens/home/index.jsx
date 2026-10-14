import { useState } from "react";
import {
  Loader,
  ErrorState,
  EmptyState,
  PostList,
  SearchInput,
  Pagination,
  Dashboard,
} from "../../components";
import { usePosts } from "../../hooks/usePosts";
import { useLikes } from "../../hooks/useLikes";
import "../../styles/Home.css";

const Home = () => {
  const { posts, retry, error, status } = usePosts();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(normalizedQuery);
  });
  const { likedIds, counts, toggleLike, likeError } = useLikes();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const PaginatedPosts = filteredPosts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <main className="home">
      <Dashboard posts={posts} filteredPosts={filteredPosts} />

      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <ErrorState message={error} onRetry={retry} />
      ) : status === "empty" || posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          message="Your dashboard is ready! There are no posts available right now. Check back later."
        />
      ) : (
        <section className="home-content">
          <div className="home-search">
            <div className="section-heading">
              <div>
                <span className="section-eyebrow">YOUR COLLECTION</span>
                <h2>Explore posts</h2>
              </div>

              <span className="results-badge">
                {filteredPosts.length} results
              </span>
            </div>

            <SearchInput
              value={query}
              onChange={handleSearch}
              placeholder="Search posts by title..."
              onReload={retry}
              reloading={status === "loading"}
            />
          </div>

          {likeError && (
            <p role="alert" className="like-error">
              {likeError}
            </p>
          )}

          {filteredPosts.length === 0 ? (
            <EmptyState
              title="No results found"
              message={`No posts match "${query}". Try another search.`}
            />
          ) : (
            <>
              <PostList
                posts={PaginatedPosts}
                likedIds={likedIds}
                counts={counts}
                onToggleLike={toggleLike}
              />

              <div className="home-pagination">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPrevious={() => setPage((p) => p - 1)}
                  onNext={() => setPage((p) => p + 1)}
                />
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default Home;
