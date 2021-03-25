import React, { useState, useEffect } from "react";

import { AccordionTable } from "../screens/AccordionTable";

import { web3 } from "../constants/constants";

import { getPatentShare } from "../services/getPatentShare";

export const SharedTokenScreen = () => {
  const [list, setList] = useState([]);

  async function renderPatents() {
    const addr = await web3.eth.getAccounts();
    const sharedPatent = await getPatentShare(
      addr[0],
      "0x67e85C5e76AbB2df3F702Ae06Af46ceb33d76F9F",
      "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
    );

    setList(sharedPatent);
  }

  useEffect(() => {
    renderPatents();
  }, []);

  console.log(list);

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Transferred Patent</div>
      </div>

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

          <AccordionTable list={list} typeOfScreen={"share"} />
        </div>
      </div>
    </div>
  );
};

export default SharedTokenScreen;
