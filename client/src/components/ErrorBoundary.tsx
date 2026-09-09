import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#fdfcfb] p-8 text-[#0b0b10]">
          <section className="flex w-full max-w-2xl flex-col items-center border border-[#0b0b10]/10 p-8 shadow-[0_20px_60px_rgba(90,31,46,0.12)]" role="alert" aria-live="assertive">
            <AlertTriangle
              size={48}
              strokeWidth={1.75}
              className="mb-6 flex-shrink-0 text-[#5a1f2e]"
            />

            <h2 className="mb-4 text-center text-xl font-semibold text-balance">An unexpected error occurred.</h2>

            <div className="mb-6 w-full overflow-auto border border-[#0b0b10]/10 bg-[#0b0b10]/5 p-4">
              <pre className="whitespace-break-spaces break-words text-sm text-[#0b0b10]/65">
                {this.state.error?.stack}
              </pre>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="flex min-h-11 items-center gap-2 bg-[#5a1f2e] px-4 py-2 text-sm font-semibold text-[#fdfcfb] transition-[background-color,transform] duration-200 hover:bg-[#0b0b10] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a007] motion-reduce:transition-none cursor-pointer"
            >
              <RotateCcw size={16} strokeWidth={1.75} />
              Reload Page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
