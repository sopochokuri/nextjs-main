// components/PortalTooltip.jsx
import { useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function PortalTooltip({ children, tooltipContent }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{ display: "inline-block", position: "relative" }}
      >
        {children}
      </div>
      {visible &&
        ref.current &&
        createPortal(
          <div
            className="tooltip-portal"
            style={{
              position: "absolute",
              top:
                ref.current.getBoundingClientRect().bottom + window.scrollY + 8,
              left:
                ref.current.getBoundingClientRect().left +
                window.scrollX +
                ref.current.offsetWidth / 2,
              transform: "translateX(-50%)",
              zIndex: 9999,
              background: "white",
              border: "1px solid #ccc",
              padding: "10px 20px 10px 20px",
              borderRadius: "6px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "justify",
            }}
          >
            {tooltipContent}
          </div>,
          document.body
        )}
    </>
  );
}
