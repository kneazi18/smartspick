interface ErrorLogEntry {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  errorBoundary?: boolean;
  componentStack?: string;
  digest?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

class ErrorLogger {
  private sessionId: string;
  private userId?: string;
  private apiEndpoint: string;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.apiEndpoint = '/api/errors'; // Would be your error logging endpoint
    this.isEnabled = process.env.NODE_ENV === 'production';
    
    // Set up global error handlers
    this.setupGlobalHandlers();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  private setupGlobalHandlers(): void {
    if (typeof window === 'undefined') return;

    // Handle uncaught JavaScript errors
    window.addEventListener('error', (event) => {
      const errorData: any = {
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        severity: 'high',
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      };
      if (this.userId) {
        errorData.userId = this.userId;
      }
      this.logError(errorData);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        severity: 'high',
        context: {
          type: 'unhandledrejection',
          reason: event.reason,
        },
      });
    });

    // Handle network errors and resource loading failures
    window.addEventListener('error', (event) => {
      if (event.target !== window && event.target instanceof HTMLElement) {
        this.logError({
          message: `Resource loading error: ${event.target.tagName}`,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          sessionId: this.sessionId,
            severity: 'medium',
          context: {
            type: 'resource_error',
            element: event.target.tagName,
            src: (event.target as any).src || (event.target as any).href,
          },
        });
      }
    }, true);
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  logError(error: Partial<ErrorLogEntry>): void {
    if (!this.isEnabled) {
      console.warn('Error Logger:', error);
      return;
    }

    const errorEntry: any = {
      message: error.message || 'Unknown error',
      url: error.url || window.location.href,
      userAgent: error.userAgent || navigator.userAgent,
      timestamp: error.timestamp || new Date().toISOString(),
      sessionId: this.sessionId,
      errorBoundary: error.errorBoundary || false,
      severity: error.severity || 'medium',
      context: error.context || {},
    };

    // Add optional properties only if they exist
    if (error.stack) errorEntry.stack = error.stack;
    if (this.userId || error.userId) errorEntry.userId = this.userId || error.userId;
    if (error.componentStack) errorEntry.componentStack = error.componentStack;
    if (error.digest) errorEntry.digest = error.digest;

    // Send to logging service
    this.sendToLoggingService(errorEntry);

    // Store locally as backup
    this.storeLocally(errorEntry);
  }

  private async sendToLoggingService(error: ErrorLogEntry): Promise<void> {
    try {
      // In production, this would send to your error tracking service
      // Example: Sentry, LogRocket, or custom endpoint
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      });
    } catch (sendError) {
      console.error('Failed to send error to logging service:', sendError);
      
      // Fallback: store in localStorage for later retry
      this.storeForRetry(error);
    }
  }

  private storeLocally(error: ErrorLogEntry): void {
    try {
      const storageKey = 'smartspicks_errors';
      const existing = localStorage.getItem(storageKey);
      const errors = existing ? JSON.parse(existing) : [];
      
      errors.push(error);
      
      // Keep only last 50 errors
      if (errors.length > 50) {
        errors.splice(0, errors.length - 50);
      }
      
      localStorage.setItem(storageKey, JSON.stringify(errors));
    } catch (storageError) {
      console.error('Failed to store error locally:', storageError);
    }
  }

  private storeForRetry(error: ErrorLogEntry): void {
    try {
      const retryKey = 'smartspicks_errors_retry';
      const existing = localStorage.getItem(retryKey);
      const errors = existing ? JSON.parse(existing) : [];
      
      errors.push(error);
      localStorage.setItem(retryKey, JSON.stringify(errors));
    } catch (storageError) {
      console.error('Failed to store error for retry:', storageError);
    }
  }

  // Method to manually log React Error Boundary errors
  logReactError(error: Error, errorInfo: { componentStack: string }): void {
    const errorData: any = {
      message: error.message,
      errorBoundary: true,
      componentStack: errorInfo.componentStack,
      severity: 'high',
      context: {
        type: 'react_error_boundary',
        errorName: error.name,
      },
    };
    if (error.stack) {
      errorData.stack = error.stack;
    }
    this.logError(errorData);
  }

  // Method to log custom application errors
  logCustomError(
    message: string, 
    severity: ErrorLogEntry['severity'] = 'medium',
    context?: Record<string, any>
  ): void {
    this.logError({
      message,
      severity,
      context: {
        type: 'custom_error',
        ...context,
      },
    });
  }

  // Method to retry failed error logs
  async retryFailedLogs(): Promise<void> {
    try {
      const retryKey = 'smartspicks_errors_retry';
      const failedLogs = localStorage.getItem(retryKey);
      
      if (!failedLogs) return;
      
      const errors = JSON.parse(failedLogs);
      
      for (const error of errors) {
        await this.sendToLoggingService(error);
      }
      
      // Clear retry queue on success
      localStorage.removeItem(retryKey);
    } catch (retryError) {
      console.error('Failed to retry error logs:', retryError);
    }
  }

  // Get error statistics for debugging
  getErrorStats(): { total: number; bySeverity: Record<string, number> } {
    try {
      const storageKey = 'smartspicks_errors';
      const existing = localStorage.getItem(storageKey);
      
      if (!existing) return { total: 0, bySeverity: {} };
      
      const errors = JSON.parse(existing);
      const bySeverity = errors.reduce((acc: Record<string, number>, error: ErrorLogEntry) => {
        acc[error.severity] = (acc[error.severity] || 0) + 1;
        return acc;
      }, {});
      
      return {
        total: errors.length,
        bySeverity,
      };
    } catch (error) {
      console.error('Failed to get error stats:', error);
      return { total: 0, bySeverity: {} };
    }
  }
}

// Create singleton instance
const errorLogger = new ErrorLogger();

export default errorLogger;