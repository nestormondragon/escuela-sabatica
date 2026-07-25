import React from "react";
import Icon from "../../components/Icon.jsx";

export default function ReturnThread({ item, onResolve }) {
  if (!item) return null;

  return (
    <aside className="return-thread" aria-label={item.label}>
      <Icon name="refresh" size={16} />
      <div>
        <span>{item.label}</span>
        <p>{item.body}</p>
        {item.kind === "commitment" ? (
          <button type="button" onClick={() => onResolve?.(item.id)}>
            Ya lo hice
          </button>
        ) : null}
      </div>
    </aside>
  );
}
