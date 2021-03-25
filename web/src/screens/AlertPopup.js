import React from "react";
import { Modal } from "react-bootstrap";

export const AlertComponent = ({ error = false, setError, setIgnored }) => {
  return (
    <Modal
      show={error}
      className="fadeInRight animated"
      onHide={() => setIgnored(true)}
    >
      <div style={{ backgroundColor: "#202020" }} className="alert-popup">
        <Modal.Header>
          <div className="d-flex justify-content-between algin-items-center p-2 w-100 m-0">
            <h4 className="text-white">ERROR</h4>
            <i
              className="fa fa-close cursor-pointer text-white"
              onClick={() => setIgnored(true)}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="alert alert alert-icon m-0">
          <h4 className="text-white">{error}</h4>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AlertComponent;
