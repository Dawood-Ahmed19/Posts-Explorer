const ErrorState = ({ message, onRetry, disabled = false }) => {
  return (
    <div className="error-state" role="alert">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button type="button" onClick={onRetry} disabled={disabled}>
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
