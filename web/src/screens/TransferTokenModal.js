import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { transferPatent } from "../services/transferPatent";
import { sharePatent } from "../services/sharePatent";

export default function TransferPatentModal({
  status,
  data,
  onCancel,
  fromAddress,
}) {
  const [toAddress, setToAddress] = useState("");
  const [txHash, setTXHash] = useState("");

  const { tokenID, tokenName } = data;
  return (
    <Modal
      show={status}
      onHide={() => onCancel(false)}
      className="fadeInRight animated"
      centered
    >
      <Modal.Body style={{ backgroundColor: "#202020" }}>
        {txHash && (
          <div
            className="alert alert-icon alert-primary alert-modal d-flex"
            role="alert"
            onClick={() =>
              window.open(`https://ropsten.etherscan.io/tx/${txHash}`, "_blank")
            }
          >
            <i className="fe fe-bell" aria-hidden="true"></i>
            <span> {txHash}</span>
          </div>
        )}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title text-white">Patent ID: {tokenID}</h3>
          </div>
          <div className="card-body text-white">Patent Name: {tokenName}</div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label text-white">Share Patent To</label>
              <div className="input-icon mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={toAddress}
                  disabled={txHash}
                  onChange={(event) => setToAddress(event.target.value)}
                  placeholder="To Address"
                />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              type="button"
              className="btn btn-info"
              disabled={txHash}
              onClick={() =>
                sharePatent(fromAddress, toAddress, tokenID, setTXHash)
              }
            >
              <i className="fa fa-share mr-2"></i>Share
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
