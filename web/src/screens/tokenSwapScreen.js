import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { swapToken } from "../services/swapToken";
export default function TokenSwapScreen({ fromAddress }) {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title"> Swap Token </div>
      </div>
      <div className="container">
        <div className="card d-flex align-items-center p-10 pt-5 mt-auto">
          <div className="col-auto m-5">
            <i className="fab fa-ethereum fa-2x"></i>
          </div>
          <div className="card-header">
            <h3 className="card-title">Swap Token</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input
                      className="form-control bg-primary"
                      disabled={true}
                      placeholder={fromAddress}
                    />
                  </div>
                </div>
              </div>
              <div className="my-3 my-md-5">
                <div className="form-group">
                  <div className="form-label">Set Value 1</div>
                  <div className="input-group">
                    <span className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-ethereum"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control text-right"
                        aria-label="Ethereum"
                        value={value1}
                        onChange={(val) => setValue1(val.target.value)}
                      ></input>
                      <span className="input-group-append">
                        <span className="input-group-text">token</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-3 my-md-5">
                <div className="form-group">
                  <div className="form-label">Set Value 2</div>
                  <div className="input-group">
                    <span className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-ethereum"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control text-right"
                        aria-label="Ethereum"
                        value={value2}
                        onChange={(val) => setValue2(val.target.value)}
                      ></input>
                      <span className="input-group-append">
                        <span className="input-group-text">token</span>
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
            onClick={() => swapToken(value1, value2)}
          >
            <i className="fe fe-send mr-2"></i>Send
          </button>
        </div>
      </div>
    </div>
  );
}
