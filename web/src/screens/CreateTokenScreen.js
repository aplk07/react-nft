import React, { useState } from "react";

import { createToken } from "../services/createToken";

export default function TokenCreationScreen({ fromAddress, updateChange }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [txHash, setTXHash] = useState("");
  const [txData, setTXData] = useState(undefined);

  const updateTransaction = function (txh) {
    setTXHash(txh);
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
                      className="form-control"
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
                    className="form-control"
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
          )}
        </div>
      </div>
    </div>
  );
}
