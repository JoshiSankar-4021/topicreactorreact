import React from "react";

export default function IconButton({ 
  icon: Icon,   // pass an icon component
  size = 24,    // default size
  color = "black", 
  onClick, 
  title 
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "none")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
    >
      <Icon size={size} color={color} />
    </button>
  );
}
