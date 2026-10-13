const EmptyState = ({ message, title = "Nothing to show" }) => {
  return (
    <div className="empty-state" role="status">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
