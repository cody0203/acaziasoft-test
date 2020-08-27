import React from "react";
import "./SectionButton.css";

const SectionButton = ({ icon, isActive, onSelectButton }) => {
  const { iconComponent, label } = icon;
  return (
    <div
      className={`section-button ${isActive ? "active" : ""}`}
      onClick={onSelectButton.bind(this, label)}
    >
      {iconComponent}
    </div>
  );
};

export default SectionButton;
