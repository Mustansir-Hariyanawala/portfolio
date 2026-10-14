import "./PageHeader.css";

/**
 * Shared header for the inner pages: label, big title and subtitle on the
 * left. Anything passed as children (stats, a search bar, ...) sits in a
 * column on the right, so the header spans the full page width instead of
 * leaving empty space either side of a narrow centred block.
 */
function PageHeader({ label, title, subtitle, children }) {
  return (
    <header className={`page-header ${children ? "page-header--with-aside" : ""}`}>

      <div className="page-header-text">

        <p className="page-header-label">
          {label}
        </p>

        <h1 className="page-header-title">
          {title}
        </h1>

        {subtitle && (
          <p className="page-header-subtitle">
            {subtitle}
          </p>
        )}

      </div>

      {children && (
        <div className="page-header-aside">
          {children}
        </div>
      )}

    </header>
  );
}

export default PageHeader;
