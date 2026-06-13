import React from "react";

/* Keeps a single bad render from blanking the whole app. */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Caught by ErrorBoundary:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="view" style={{ textAlign: "center", paddingTop: 80 }}>
          <h2 className="serif" style={{ fontSize: "1.4rem", marginBottom: 10 }}>Algo se interrumpió</h2>
          <p className="lead" style={{ marginBottom: 18 }}>Tu progreso está guardado. Vuelve a cargar para continuar.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Recargar</button>
        </div>
      );
    }
    return this.props.children;
  }
}
