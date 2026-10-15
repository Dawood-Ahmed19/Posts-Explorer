import "../../styles/Pagination.css";

const Pagination = ({ page, totalPages, onPrevious, onNext }) => {
  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" onClick={onPrevious} disabled={page <= 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button type="button" onClick={onNext} disabled={page >= totalPages}>
        Next
      </button>
    </nav>
  );
};

export default Pagination;
