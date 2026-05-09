export default function Loader() {
  return (
    <div id="loader">
      <div className="spinner-container">
        <div
          className="spinner-border"
          role="status"
          style={{
            color: "var(--sky-blue)",
            width: "3rem",
            height: "3rem",
          }}
        />

        <p
          className="mt-3"
          style={{
            color: "var(--sky-blue)",
            fontFamily: "monospace",
          }}
        >
          Initializing_System...
        </p>
      </div>
    </div>
  );
}
