const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return <p className="mt-1 px-2 text-sm text-red-600">{error}</p>;
};

export default ErrorMessage;
