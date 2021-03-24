import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { transferToken } from "../services/transferToken";

export default function TransferTokenModal({
  status,
  data,
  onCancel,
  fromAddress,
}) {
  const [toAddress, setToAddress] = useState("");
  const [txHash, setTXHash] = useState("");
  const [txData, setTXData] = useState(undefined);

  const updateTransaction = function (txh) {
    setTXHash(txh);
  };

  const transactionStatus = async function (data) {
    setTXData(data);
  };

  const { tokenID, tokenName } = data;
  return (
    <Modal
      show={status}
      onHide={() => onCancel(false)}
      className="fadeInRight animated"
      centered
    >
      <Modal.Body style={{ backgroundColor: "#202020" }}>
        {txData ? (
          <div className="m-4 position-absolute">
            <div className="alert alert-icon alert-success" role="alert">
              <i className="fe fe-check mr-2" aria-hidden="true"></i>
              {txData.status ? "Token Created Successfully" : "Failure"}
            </div>
          </div>
        ) : (
          <div
            className="alert alert-primary alert-modal d-flex align-items-center p-2"
            role="alert"
            onClick={() =>
              window.open(`https://ropsten.etherscan.io/tx/${txHash}`, "_blank")
            }
          >
            <i className="fe fe-bell mr-2" aria-hidden="true"></i>
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
              <label className="form-label text-white">
                Transfer Patent To
              </label>
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
                transferToken(
                  fromAddress,
                  toAddress,
                  tokenID,
                  updateTransaction,
                  transactionStatus
                )
              }
            >
              <i className="fa fa-transfer mr-2"></i>Transfer
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
