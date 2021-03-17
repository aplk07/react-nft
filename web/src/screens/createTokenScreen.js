import React, { useEffect, useState } from "react";
import { createToken } from "../services/createToken";

export default function TokenCreationScreen({ fromAddress }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Create Token</div>
      </div>
      <div className="container">
        <div className="card d-flex align-items-center p-10 pt-5 mt-auto">
          <div className="col-auto m-5">
            <i className="fab fa-ethereum fa-2x"></i>
          </div>
          <div className="card-header">
            <h3 className="card-title">Create your Collectible Token</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div class="col">
                  <div class="form-group">
                    <label class="form-label">Owner</label>
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
                    <label class="form-label">Name</label>
                    <input
                      class="form-control"
                      placeholder="Phoebe Buffay"
                      value={name}
                      onChange={(val) => setName(val.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="my-3 my-md-5">
                <div class="form-group">
                  <label class="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="7"
                    placeholder="Description"
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
            className="btn btn-success"
            onClick={() => createToken(fromAddress, { name, description })}
          >
            <i class="fe fe-send mr-2"></i>Send
          </button>
        </div>
      </div>
    </div>
  );
}
