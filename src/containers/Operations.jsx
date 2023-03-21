import React from "react";
import "../styles/Operations.css";
import "../styles/OperationItem.css";

const Operations = ({ children }) => {
  return <div className="operation-container">{children}</div>;
};

export default React.memo(Operations);
