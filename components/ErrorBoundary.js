import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error }) => {
  return (
    <div>
      <h1>Something went wrong:</h1>
      <p>{error.message}</p>
    </div>
  );
};

const MyErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default MyErrorBoundary;
