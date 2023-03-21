import React from "react";
import { createPortal } from "react-dom";
import "../styles/Modal.css";

const Modal = ({ setShowModal, operationText }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-body">
        <h3 className="modal-title">Operation Completed ✅</h3>
        <p className="modal-text">{operationText}</p>
        <button className="modal-button" onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
