import React, { useState, useEffect } from "react";

import { AccordionTable } from "../screens/AccordionTable";


import { getPatentShare } from "../services/getPatentShare";
import AlertComponent from "./AlertPopup";

export const SharedTokenScreen = ({ fromAddress, error, setError }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ignored, setIgnored] = useState(false);
  async function renderPatents() {
    if (fromAddress) {
      const { sharedPatentFrom } = await getPatentShare(
        fromAddress,
        "0x67e85C5e76AbB2df3F702Ae06Af46ceb33d76F9F",
        "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
      );

      setLoading(false);
      setList(sharedPatentFrom);
    }
  }

  useEffect(() => {
    setLoading(true);
    renderPatents();
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Shared Patent</div>
      </div>
      {!error ? (
        <div className="card">
          <div className="table-responsive pb-0">
            <table className="table card-table table-vcenter text-nowrap">
              <thead>
                <tr>
                  <th className="w-1 text-white">Id</th>
                  <th className="text-white h1">Token Name</th>
                  <th className="text-white">Patent Name</th>
                  <th className="text-white">Patent ID</th>
                </tr>
              </thead>
            </table>

            <AccordionTable
              list={list}
              loading={loading}
              typeOfScreen={"share"}
            />
          </div>
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
          onCancel={(state) => {}}
        />
      )}
    </div>
  );
};

export default SharedTokenScreen;
