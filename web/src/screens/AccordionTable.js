import React, { useRef, useState } from "react";
import {
  Accordion,
  Card,
  Overlay,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";

import DownArrow from "../assets/down-arrow.svg";
import UpArrow from "../assets/up-arrow.svg";
import OpenNew from "../assets/open_new.svg";

export const AccordionTable = ({
  list,
  setTransferModalVisible,
  setTransferData,
  typeOfScreen = "",
  setType,
}) => {
  const url = "https://ropsten.etherscan.io/tx/";
  const baseAddress = "0x0000000000000000000000000000000000000000";

  const [selectedID, setSelectedID] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  return (
    <Accordion className="accordion-dropdown">
      {!list ? (
        <div className="overlay">
          <div className="loader" />
        </div>
      ) : (
        <>
          {list.map((data, index) => {
            const {
              uri,
              tokenID,
              tokenName,
              tokenSymbol,
              hash,
              from,
              to,
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
                      <span className="text-muted text-white">{index + 1}</span>
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
                    <label className="text-white">Patent Description :</label>
                    <span className="text-white">{uri.description}</span>
                    <br />
                    <div class="card-footer mt-4">
                      {!typeOfScreen &&
                        (from === baseAddress ? (
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
                                <span className="text-white">Transfer</span>
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
                            <div className="d-flex flex-column">
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
                              {data.shares.length > 0 ? (
                                <div
                                  ref={ref}
                                  className="d-flex flex-row justify-content-eveny"
                                >
                                  Shares [{" "}
                                  {data.shares.map((val, index) => (
                                    <div
                                      className="cursor-pointer"
                                      onClick={(event) => {
                                        window.open(
                                          `https://ropsten.etherscan.io/address/${val}`,
                                          "_blank"
                                        );
                                      }}
                                    >
                                      <OverlayTrigger
                                        overlay={
                                          <Tooltip id="tooltip-disabled">
                                            {val}
                                          </Tooltip>
                                        }
                                      >
                                        <span className="d-inline-block">
                                          {" "}
                                          {index + 1}{" "}
                                          {index + 1 < data.shares.length
                                            ? ","
                                            : null}
                                        </span>
                                      </OverlayTrigger>
                                    </div>
                                  ))}{" "}
                                  ]
                                </div>
                              ) : null}
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
                                <span className="text-white">Transfer</span>
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
                        ))}
                      {typeOfScreen && (
                        <span className="text-white">
                          {typeOfScreen === "transfer"
                            ? "Transfered to " + to
                            : "Shared from " + from}
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </>
      )}
    </Accordion>
  );
};
