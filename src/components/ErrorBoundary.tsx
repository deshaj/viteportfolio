import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white p-6 text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong.</h1>
          <p className="text-zinc-400 mb-4">A fatal error occurred rendering the app.</p>
          <div className="bg-black/50 p-4 rounded-lg border border-red-500/20 max-w-2xl overflow-auto text-left">
             <p className="text-red-400 font-mono text-sm whitespace-pre-wrap">
                {this.state.error?.toString()}
             </p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200"
          >
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;