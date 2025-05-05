import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  );
}
