import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            opacity: 0.6
          }}>🎬</div>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #64ffda, #448aff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Oops! Something went wrong</h1>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '500px',
            lineHeight: '1.6'
          }}>The movie app encountered an unexpected error. Please refresh the page to try again.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #64ffda, #448aff)',
              color: 'white',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #4dd0e1, #42a5f5)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #64ffda, #448aff)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🔄 Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{
              marginTop: '2rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.9rem',
              maxWidth: '600px'
            }}>
              <summary style={{ cursor: 'pointer', marginBottom: '1rem' }}>Error Details</summary>
              <pre style={{
                whiteSpace: 'pre-wrap',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'left',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

