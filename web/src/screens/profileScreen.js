import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export default function ProfileScreen({
  ethereumBalance,
  transactionCount,
  tokenDetail,
  nonFun,
  list,
}) {
  const [tokens, setTokens] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(nonFun.balance);
  }, [nonFun.balance]);
  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Profile</div>
      </div>
      <div className="row row-cards">
        <div className="col-md-3">
          <div className="card p-3 px-4">
            <div>
              <i className="fab fa-ethereum text-grey m-1"></i>Ethereum Balance
            </div>
            <div className="py-4 m-0 text-center h1 text-grey">
              {ethereumBalance} ETH
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 px-4">
            <div>
              <i class="fa fa-history text-yellow m-1" aria-hidden="true"></i>
              Total Transactions
            </div>
            <div className="py-4 m-0 text-center h1 text-yellow">
              {transactionCount}
            </div>
            <div className="d-flex">
              <small className="text-muted">Ethereum</small>
              <div className="ml-auto">
                <i className="fab fa-ethereum text-grey m-1"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 px-4">
            <div>
              <i className="fa fa-key text-blue m-1"></i>
              Token
            </div>
            <div className="py-4 m-0 text-center h1 text-blue">
              {tokenDetail.balance}
            </div>
            <div className="d-flex">
              <small className="text-muted">{tokenDetail.name}</small>
              <div className="ml-auto">
                <i className="fa fa-plug text-grey m-1"></i>
                Unit {tokenDetail.symbol}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Tokens</h3>
            </div>
            <div class="table-responsive">
              <table class="table card-table table-vcenter text-nowrap">
                <thead>
                  <tr>
                    <th class="w-1">Id</th>
                    <th>Name</th>
                    <th>Token</th>
                    <th>symbol</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((data, index) => {
                    return (
                      <tr>
                        <td>
                          <span class="text-muted">{index + 1}</span>
                        </td>
                        <td>{nonFun.name}</td>
                        <td>{data}</td>
                        <td>{nonFun.symbol}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
