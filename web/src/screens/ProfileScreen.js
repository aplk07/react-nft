/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import TransferPatentModal from "./TransferTokenModal";
import { getTokenTransfer } from "../services/getTokenTransfer";
import { AccordionTable } from "../screens/AccordionTable";
import { getPatentShare } from "../services/getPatentShare";
import AlertComponent from "../screens/AlertPopup";

export default function ProfileScreen({
  error,
  ethereumBalance,
  fromAddress
}) {
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [transferData, setTransferData] = useState({});
  const [type, setType] = useState("");
  const [list, setList] = useState(undefined);

  async function renderPatents() {
    if (fromAddress) {
      const ownedPatent = await getTokenTransfer(
        fromAddress,
        "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
      );
      const { sharedPatentTo } = await getPatentShare(
        fromAddress,
        "0x67e85C5e76AbB2df3F702Ae06Af46ceb33d76F9F",
        "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
      );

      ownedPatent.map((data) => {
        const shares = [];
        sharedPatentTo.forEach((val) => {
          if (data.tokenID === val.tokenID.toString()) {
            shares.push(val.to);
          }
        });
        data.shares = shares;
      });
      setList(ownedPatent);
    }
  }

  useEffect(() => {
    if (!error) {
      renderPatents();
    }
  }, [error]);

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Profile</div>
      </div>
      {!error ? (
        <div className="row row-cards">
          <div className="col-md-3">
            <div className="card p-3 px-4">
              <div>
                <i className="fab fa-ethereum text-white m-1"></i>
                <span className="text-white">Ethereum Balance</span>
              </div>
              <div className="py-4 m-0 text-center text-white h1">
                {ethereumBalance} ETH
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title text-white">Patent Holding</h3>
              </div>
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
                  setTransferModalVisible={setTransferModalVisible}
                  setTransferData={setTransferData}
                  setType={setType}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AlertComponent
          error={error}
          onCancel={(state) => setTransferModalVisible(state)}
        />
      )}
      {transferModalVisible && (
        <TransferPatentModal
          fromAddress={fromAddress}
          status={transferModalVisible}
          type={type}
          data={transferData}
          onCancel={(state) => setTransferModalVisible(state)}
        />
      )}
    </div>
  );
}
