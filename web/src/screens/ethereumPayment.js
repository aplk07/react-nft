import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { sendEthereum } from "../services/sendEthereum";
export default function EthereumPaymentScreen({
  fromAddress,
}) {
  const [toAddress, setToAddress] = useState("");
  const [ether, setEther] = useState(0);
  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Send Ethereum</div>
      </div>
      <div className="container">
        <div className="card d-flex align-items-center p-10 pt-5 mt-auto">
          <div className="col-auto m-5">
            <i className="fab fa-ethereum fa-2x"></i>
          </div>
          <div className="card-header">
            <h3 className="card-title">Send Ethereum</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div class="col">
                  <div class="form-group">
                    <label class="form-label">From Address</label>
                    <input
                      class="form-control bg-primary"
                      disabled={true}
                      placeholder={fromAddress}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="col">
                  <div class="form-group">
                    <label class="form-label">To Address</label>
                    <input
                      class="form-control"
                      placeholder="0x3akjdjb37y298eu98qu29a0dn"
                      value={toAddress}
                      onChange={(val) => setToAddress(val.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="my-3 my-md-5">
                <div className="form-group">
                  <div className="form-label">Ether</div>
                  <div className="input-group">
                    <span className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-ethereum"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control text-right"
                        aria-label="Ethereum"
                        value={ether}
                        onChange={(val) => setEther(val.target.value)}
                      ></input>
                      <span className="input-group-append">
                        <span className="input-group-text">ether</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => sendEthereum(fromAddress, toAddress, ether)}
          >
            <i class="fe fe-send mr-2"></i>Send
          </button>
        </div>
      </div>
    </div>
  );
}
