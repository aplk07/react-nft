import React from "react";
export default function ProfileScreen({
  ethereumBalance,
  nonFun,
  list,
}) {
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
