import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { shareToken } from "../services/shareToken";

export default function ShareTokenModal({
  status,
  data,
  onCancel,
  fromAddress,
}) {
  const [toAddress, setToAddress] = useState("");
  const [txHash, setTXHash] = useState("");

  const updateTransaction = async function (txh) {
    setTXHash(txh);
  };

  const { tokenID, tokenName } = data;
  return (
    <Modal show={status} onHide={() => onCancel(false)} animation={false}>
      <Modal.Body style={{ backgroundColor: "#202020" }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Patent ID: {tokenID}</h3>
          </div>
          <div className="card-body">Patent Name: {tokenName}</div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Share Patent To</label>
              <div className="input-icon mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={toAddress}
                  onChange={(event) => setToAddress(event.target.value)}
                  placeholder="To Address"
                ></input>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-info"
            onClick={() =>
              shareToken(fromAddress, toAddress, tokenID, updateTransaction)
            }
          >
            <i className="fa fa-share mr-2"></i>Share
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
