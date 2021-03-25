/** eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";

import { web3 } from "../constants/constants";

import DownArrow from "../assets/down-arrow.svg";
import UpArrow from "../assets/up-arrow.svg";
import OpenNew from "../assets/open_new.svg";
import TransferPatentModal from "./TransferTokenModal";
import { getTokenTransfer } from "../services/getTokenTransfer";
import { getPatentTransferedTo } from "../services/getPatentTransferedTo";
import { getPatentShare } from "../services/getPatentShare";
export default function ProfileScreen({
  ethereumBalance,
  fromAddress,
  updateChange,
}) {
  const [selectedID, setSelectedID] = useState("");
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [transferData, setTransferData] = useState({});
  const [type, setType] = useState("");
  const [list, setList] = useState(undefined);
  const baseAddress = "0x0000000000000000000000000000000000000000";

  const url = "https://ropsten.etherscan.io/tx/";

  async function renderPatents() {
    const addr = await web3.eth.getAccounts();
    const ownedPatent = await getTokenTransfer(
      addr[0],
      "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
    );
    const transferedPatent = await getPatentTransferedTo(
      addr[0],
      "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
    );
    await getPatentShare(
      addr[0],
      "0x67e85C5e76AbB2df3F702Ae06Af46ceb33d76F9F",
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
                      from,
                    } = data;
                    return (
                      <Card key={index}>
                        <Card.Header>
                          <Accordion.Toggle
                            className="d-flex align-items-center w-100 border-0 p-0"
                            variant="link"
                            eventKey={hash}
                            onClick={() =>
                              setSelectedID(selectedID === hash ? "" : hash)
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
                                src={selectedID === hash ? DownArrow : UpArrow}
                                alt="down"
                              />
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={hash}>
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
                            <div class="card-footer mt-4">
                              {from === baseAddress ? (
                                <div className="d-flex flex-row justify-content-between">
                                  <div className="d-flex">
                                    <div
                                      className="cursor-pointer"
                                      onClick={() =>
                                        window.open(`${url}${hash}`, "_blank")
                                      }
                                    >
                                      <img
                                        src={OpenNew}
                                        className="open-new"
                                        alt=""
                                      />
                                      {"   "}
                                      <span className="text-white">
                                        View on Ethereum scan.io
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row justify-content-between">
                                    <div
                                      className="cursor-pointer mr-4"
                                      onClick={() => {
                                        setTransferModalVisible(true);
                                        setType("transfer");
                                        setTransferData({
                                          tokenID,
                                          tokenName: uri.name,
                                        });
                                      }}
                                    >
                                      <i className="fa fa-share mr-2"></i>
                                      <span className="text-white">
                                        Transfer
                                      </span>
                                    </div>
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setTransferModalVisible(true);
                                        setType("share");
                                        setTransferData({
                                          tokenID,
                                          tokenName: uri.name,
                                        });
                                      }}
                                    >
                                      <i className="fa fa-share-alt mr-2"></i>
                                      <span className="text-white">Share</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex flex-row justify-content-between">
                                  <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                      window.open(
                                        `https://ropsten.etherscan.io/tx/${hash}`,
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
                                      Transfered from {from}
                                    </span>
                                  </div>
                                  <div className="d-flex flex-row justify-content-between">
                                    <div
                                      className="cursor-pointer mr-4"
                                      onClick={() => {
                                        setTransferModalVisible(true);
                                        setType("transfer");
                                        setTransferData({
                                          tokenID,
                                          tokenName: uri.name,
                                        });
                                      }}
                                    >
                                      <i className="fa fa-share mr-2"></i>
                                      <span className="text-white">
                                        Transfer
                                      </span>
                                    </div>
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setTransferModalVisible(true);
                                        setType("share");
                                        setTransferData({
                                          tokenID,
                                          tokenName: uri.name,
                                        });
                                      }}
                                    >
                                      <i className="fa fa-share-alt mr-2"></i>
                                      <span className="text-white">Share</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
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
      {transferModalVisible ? (
        <TransferPatentModal
          fromAddress={fromAddress}
          status={transferModalVisible}
          type={type}
          data={transferData}
          onCancel={(state) => setTransferModalVisible(state)}
        />
      ) : null}
    </div>
  );
}
