import React from "react";
import "../styles/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="lds-dual-ring"></div>
      <p className="spinner-text">Loading...</p>
    </div>
  );
};

export default Spinner;
