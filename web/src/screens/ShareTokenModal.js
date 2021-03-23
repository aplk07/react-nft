import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { shareToken } from "../services/shareToken";
export default function ShareTokenModal({
  status,
  data,
  onCancel,
  fromAddress,
}) {
  const [show, setShow] = useState(status);
  const [toAddress, setToAddress] = useState("");
  const [txHash, setTXHash] = useState("");

  const updateTransaction = async function (txh) {
    setTXHash(txh);
  };
  const { tokenId, tokenName } = data;
  return (
    <Modal show={show} onHide={() => onCancel(false)} animation={false}>
      <Modal.Body style={{ backgroundColor: "#202020" }}>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Patent ID: {tokenId}</h3>
          </div>
          <div class="card-body">Patent Name: {tokenName}</div>
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
            class="btn btn-info"
            onClick={() =>
              shareToken(fromAddress, toAddress, tokenId, updateTransaction)
            }
          >
            <i class="fa fa-share mr-2"></i>Share
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
