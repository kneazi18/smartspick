'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import Button from './ui/Button';
import errorLogger from '../lib/error-logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Use the comprehensive error logger
    errorLogger.logReactError(error, { componentStack: errorInfo.componentStack || '' });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReportError = () => {
    const { error, errorInfo } = this.state;
    const errorReport = {
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Here you would typically send this to your error reporting service
    console.log('Error report:', errorReport);
    
    // For now, we'll just copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => alert('Error details copied to clipboard'))
      .catch(() => console.log('Could not copy to clipboard'));
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Something went wrong
              </h1>
              <p className="text-gray-600 leading-relaxed">
                We're sorry, but something unexpected happened. Our team has been notified 
                and is working to fix the issue.
              </p>
            </div>

            {/* Error details for development */}
            {this.props.showErrorDetails && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
                <code className="text-xs text-red-700 block whitespace-pre-wrap">
                  {this.state.error.message}
                </code>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={this.handleRetry}
                className="flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                href="/"
                variant="outline"
                className="flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>

              {process.env.NODE_ENV === 'development' && (
                <Button
                  onClick={this.handleReportError}
                  variant="outline"
                  className="flex items-center justify-center text-xs"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  Report Error
                </Button>
              )}
            </div>

            {/* Help text */}
            <p className="text-sm text-gray-500">
              If this problem persists, please{' '}
              <a href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                contact support
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;