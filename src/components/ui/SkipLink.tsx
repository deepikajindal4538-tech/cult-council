import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-canvas focus:rounded-md focus:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-society-ams ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
