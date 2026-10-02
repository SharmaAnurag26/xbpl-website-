"use client";

/**
 * Last-resort boundary when the root layout itself fails. It replaces the whole document,
 * so it can't rely on the app's CSS or fonts. Styles are inline and minimal.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#06162e",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <main>
          <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Something went wrong.</h1>
          <p style={{ color: "#b4c3d9" }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.25rem",
              border: 0,
              borderRadius: "0.5rem",
              background: "#0663d4",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
