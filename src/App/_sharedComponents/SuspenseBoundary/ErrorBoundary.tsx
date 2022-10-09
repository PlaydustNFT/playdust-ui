import React, { PropsWithChildren } from 'react';
import logger from '../../_helpers/logger';

type ErrorBoundaryProps = {
  fallback: React.SuspenseProps['fallback'];
};

class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProps>,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger('ErrorBoundary Caught', error, errorInfo.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default ErrorBoundary;
