import { useState } from "react";
import {
  Loader,
  ErrorState,
  EmptyState,
  PostList,
  SearchInput,
  Pagination,
} from "../../components";
import { usePosts } from "../../hooks/usePosts";
import { useLikes } from "../../hooks/useLikes";

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

  if (status === "loading") return <Loader />;
  if (status === "error") return <ErrorState message={error} onRetry={retry} />;
  if (status === "empty") return <EmptyState message="No Post Available" />;
  return (
    <>
      <section className="home">
        <SearchInput
          value={query}
          onChange={handleSearch}
          placeholder="Type here..."
        />
        <div className="posts">
          {filteredPosts.length === 0 ? (
            <EmptyState title="No Results" message={`No Post match ${query}`} />
          ) : (
            <div className="posts-pagination">
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
              />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPrevious={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
