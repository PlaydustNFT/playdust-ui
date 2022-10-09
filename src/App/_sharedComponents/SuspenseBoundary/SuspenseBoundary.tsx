import React, { PropsWithChildren, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ExplorerCardProps {
  loading: React.SuspenseProps['fallback'];
  error: React.SuspenseProps['fallback'];
  content: React.ReactNode;
  shouldRender?: boolean;
}
function SuspenseBoundary({
  loading,
  error,
  content,
  shouldRender = true,
}: PropsWithChildren<ExplorerCardProps>) {
  return !shouldRender ? null : (
    <ErrorBoundary fallback={error}>
      <Suspense fallback={loading}>{content}</Suspense>
    </ErrorBoundary>
  );
}

export default SuspenseBoundary;
