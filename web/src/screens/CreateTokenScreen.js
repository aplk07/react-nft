import React, { useState } from "react";

import { createToken } from "../services/createToken";
import AlertComponent from "./AlertPopup";

export default function TokenCreationScreen({
  fromAddress,
  updateChange,
  error,
  setError,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [txHash, setTXHash] = useState("");
  const [txData, setTXData] = useState(undefined);
  const [disableButton, setButtonDiable] = useState(false);
  const [ignored, setIgnored] = useState(false);
  const updateTransaction = function (txh) {
    setTXHash(txh);
    setButtonDiable(false);
  };

  const transactionStatus = async function (data) {
    setTXData(data);
    updateChange();
  };

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Create Patent</div>
      </div>
      <div className="container">
        {!error ? (
          <div className="card d-flex align-items-center p-10 pt-5 mt-auto">
            <div className="col-auto m-5">
              <i className="fa fa-book fa-2x text-white"></i>
            </div>
            <div className="card-header">
              <h3 className="card-title text-white">Add Your Patent</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="form-label text-white">Owner</label>
                      <input
                        className="form-control bg-primary"
                        disabled={true}
                        placeholder={fromAddress}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="form-label text-white">Name</label>
                      <input
                        className="form-control input-width"
                        placeholder="Pen with scanner"
                        value={name}
                        onChange={(val) => setName(val.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="my-3 my-md-5">
                  <div className="form-group">
                    <label className="form-label text-white">Abstract</label>
                    <textarea
                      className="form-control input-width"
                      name="description"
                      rows="7"
                      placeholder="With a machine as small as a pen, you can transfer text from paper directly into a computer. Christer Fåhraeus invented the C-pen."
                      value={description}
                      onChange={(val) => setDescription(val.target.value)}
                    >
                      {description}
                    </textarea>
                  </div>
                </div>
              </form>
            </div>
            <button
              type="button"
              disabled={disableButton}
              className="btn btn-success mb-6"
              onClick={() => {
                if (name && description) {
                  createToken(
                    fromAddress,
                    { name, description },
                    updateTransaction,
                    transactionStatus
                  );
                } else {
                  alert("Input Needed");
                }
              }}
            >
              <i className="fa fa-plus mr-2"></i>Add Patent
            </button>
            {txData ? (
              <div className="m-4 position-absolute">
                <div className="alert alert-icon alert-success" role="alert">
                  <i className="fe fe-check mr-2" aria-hidden="true"></i>
                  {txData.status ? "Token Created Successfully" : "Failure"}
                </div>
              </div>
            ) : (
              txHash.length > 0 && (
                <div className="m-4 position-absolute">
                  <div
                    className="alert alert-icon alert-primary"
                    role="alert"
                    onClick={() =>
                      window.open(
                        `https://ropsten.etherscan.io/tx/${txHash}`,
                        "_blank"
                      )
                    }
                  >
                    <i className="fe fe-bell mr-2" aria-hidden="true"></i>
                    {txHash}
                  </div>
                </div>
              )
            )}
          </div>
        ) : ignored ? (
          <div className="card d-flex align-items-center justify-content-between p-5">
            <h3 id="default-card">Login to Metamask</h3>
            <div class="example-column example-column-1">
              <div class="card p-7">
                Your Metamask is not connected or logged in.
              </div>
            </div>
          </div>
        ) : (
          <AlertComponent
            error={error}
            setError={setError}
            setIgnored={setIgnored}
          />
        )}
      </div>
    </div>
  );
}
