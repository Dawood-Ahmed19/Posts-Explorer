const Dashboard = ({ posts = [], filteredPosts = [] }) => {
  return (
    <>
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">
            <span className="hero-dot" />
            YOUR CONTENT DASHBOARD
          </span>

          <h1>
            Discover your <span>next favorite</span> post.
          </h1>

          <p>
            Explore ideas, find interesting content, and show some love to the
            posts that inspire you.
          </p>
        </div>

        <div className="hero-decoration" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-icon">
            <span>✦</span>
          </div>
        </div>
      </section>

      <section className="home-stats" aria-label="Post statistics">
        <article className="stat-card">
          <div className="stat-icon posts-icon">▤</div>
          <div>
            <p>Total posts</p>
            <h2>{posts.length}</h2>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon search-icon">⌕</div>
          <div>
            <p>Matching posts</p>
            <h2>{filteredPosts.length}</h2>
          </div>
        </article>
      </section>
    </>
  );
};

export default Dashboard;
