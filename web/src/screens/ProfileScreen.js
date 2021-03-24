/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";

import { web3 } from "../constants/constants";

import DownArrow from "../assets/down-arrow.svg";
import UpArrow from "../assets/up-arrow.svg";
import OpenNew from "../assets/open_new.svg";
import TransferPatentModal from "./TransferTokenModal";
import { getTokenTransfer } from "../services/getTokenTransfer";

export default function ProfileScreen({ ethereumBalance, fromAddress }) {
  const [selectedID, setSelectedID] = useState("");
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [shareData, setShareData] = useState({});
  const [list, setList] = useState(undefined);
  const url = "https://ropsten.etherscan.io/tx/";

  async function renderPatents() {
    const addr = await web3.eth.getAccounts();
    const ownedPatent = await getTokenTransfer(
      addr[0],
      "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
    );
    setList(ownedPatent);
  }
  useEffect(() => {
    renderPatents();
  }, []);
  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Profile</div>
      </div>
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
              <h3 className="card-title text-white">Your Patents</h3>
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
              {!list ? (
                <div className="overlay">
                  <div className="loader" />
                </div>
              ) : (
                <Accordion className="accordion-dropdown">
                  {list.map((data, index) => {
                    const {
                      uri,
                      tokenID,
                      tokenName,
                      tokenSymbol,
                      hash,
                      sharedTo,
                      share,
                    } = data;
                    return (
                      <Card key={index}>
                        <Card.Header>
                          <Accordion.Toggle
                            className="d-flex align-items-center w-100 border-0 p-0"
                            variant="link"
                            eventKey={uri.name}
                            onClick={() =>
                              setSelectedID(
                                selectedID === uri.name ? "" : uri.name
                              )
                            }
                          >
                            <p>
                              <span className="text-muted text-white">
                                {index + 1}
                              </span>
                            </p>
                            <p className="text-white">{tokenName}</p>
                            <p className="text-white">
                              {uri.name} ({tokenSymbol})
                            </p>
                            <div className="patent-id d-flex justify-content-between">
                              <span className="text-white">{tokenID}</span>
                              <img
                                src={
                                  uri.name === selectedID ? DownArrow : UpArrow
                                }
                                alt="down"
                              />
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={uri.name}>
                          <Card.Body>
                            <label className="text-white">Patent Name : </label>
                            <span className="text-white"> {uri.name}</span>
                            <br />
                            <label className="text-white">
                              Patent Description :
                            </label>
                            <span className="text-white">
                              {uri.description}
                            </span>
                            <br />
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                window.open(`${url}${hash}`, "_blank")
                              }
                            >
                              <img src={OpenNew} className="open-new" alt="" />
                              {"   "}
                              <span className="text-white">
                                View on Ethereum scan.io
                              </span>
                            </div>
                            {!share ? (
                              <div
                                className="cursor-pointer mr-0"
                                onClick={() => {
                                  setShareModalVisible(true);
                                  setShareData({
                                    tokenID,
                                    tokenName: uri.name,
                                  });
                                }}
                              >
                                <i className="fa fa-share mr-2"></i>
                                <span className="text-white">Share</span>
                              </div>
                            ) : (
                              <div
                                className="cursor-pointer"
                                onClick={() =>
                                  window.open(
                                    `https://ropsten.etherscan.io/tx/${share}`,
                                    "_blank"
                                  )
                                }
                              >
                                <img
                                  src={OpenNew}
                                  className="open-new"
                                  alt=""
                                />
                                {"   "}
                                <span className="text-white">
                                  Shared to {sharedTo}
                                </span>
                              </div>
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    );
                  })}
                </Accordion>
              )}
            </div>
          </div>
        </div>
      </div>
      {shareModalVisible ? (
        <TransferPatentModal
          fromAddress={fromAddress}
          status={shareModalVisible}
          data={shareData}
          onCancel={(state) => setShareModalVisible(state)}
        />
      ) : null}
    </div>
  );
}
