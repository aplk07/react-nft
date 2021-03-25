import React, { useState, useEffect } from "react";

import { AccordionTable } from "../screens/AccordionTable";

import { web3 } from "../constants/constants";

import { getPatentTransferedTo } from "../services/getPatentTransferedTo";

export const TransferTokenScreen = () => {
  const [list, setList] = useState([]);

  async function renderPatents() {
    const addr = await web3.eth.getAccounts();
    const transferedPatent = await getPatentTransferedTo(
      addr[0],
      "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
    );

    setList(transferedPatent);
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

          <AccordionTable list={list} typeOfScreen={"transfer"} />
        </div>
      </div>
    </div>
  );
};

export default TransferTokenScreen;
