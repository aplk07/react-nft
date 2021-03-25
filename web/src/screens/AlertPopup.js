import React from "react";
import { Modal } from "react-bootstrap";

export const AlertComponent = ({ error = false, onCancel }) => {
  return (
    <Modal show={error} onHide={() => onCancel(false)}>
      <Modal.Body style={{ backgroundColor: "#202020" }} className="alert">
        {error}
      </Modal.Body>
    </Modal>
  );
};

export default AlertComponent;
