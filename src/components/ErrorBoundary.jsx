import React from "react";
import { MESSAGES, normalizeLocale } from "../i18n/messages.js";

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
      const locale = normalizeLocale(
        typeof document === "undefined" ? "es" : document.documentElement.lang
      );
      const messages = MESSAGES[locale];
      return (
        <div className="view" style={{ textAlign: "center", paddingTop: 80 }}>
          <h2 className="letter" style={{ fontSize: "1.4rem", marginBottom: 10 }}>{messages["error.boundary.title"]}</h2>
          <p className="lead" style={{ marginBottom: 18 }}>{messages["error.boundary.body"]}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>{messages["error.reload"]}</button>
        </div>
      );
    }
    return this.props.children;
  }
}
