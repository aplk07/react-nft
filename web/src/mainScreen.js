import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import { web3 } from "./constants/constants";

import { getNFTDetails } from "./services/getNFTDetails";
import { getNFTURI } from "./services/getNFTURI";

import TokenCreationScreen from "./screens/createTokenScreen";
import ProfileScreen from "./screens/profileScreen";

export default function MainScreen() {
  const [activeAddress, setActiveAddress] = useState("");
  const [bal, setBal] = useState(0);
  const [nonFun, setNonFun] = useState(0);
  const [list, setList] = useState([]);

  async function renderData() {
    try {
      window.ethereum.request({ method: 'eth_requestAccounts' });
      const addr = await web3.eth.getAccounts();
      const nonFungible = await getNFTDetails(
        "0xbafa36b476ee5a17b69892a1a1283d85983370a4",
        addr[0]
      );
      const tempList = await getNFTURI(
        nonFungible.totalSup,
        "0xbafa36b476ee5a17b69892a1a1283d85983370a4",
        addr[0]
      );
      setNonFun(nonFungible);
      setList(tempList);
      setActiveAddress(addr);
      setBal(
        parseFloat(
          web3.utils.fromWei(await web3.eth.getBalance(addr[0]), "ether")
        ).toFixed(4)
      );
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    renderData();
    window.ethereum.on("accountsChanged", function () {
      renderData();
    });
  }, []);

  const Main = () => (
    <Switch>
      <Route exact path="/">
        <ProfileScreen ethereumBalance={bal} nonFun={nonFun} list={list} />
      </Route>

      <Route exact path="/token-create">
        <TokenCreationScreen
          fromAddress={activeAddress[0]}
          updateChange={() => {
            renderData();
          }}
        />
      </Route>
    </Switch>
  );

  return (
    <div className="page-main">
      <div className="header py-4">
        <div className="container">
          <div className="d-flex">
            <a className="header-brand" href="./index.html"></a>
            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown">
                <a
                  href="#"
                  className="nav-link pr-0 leading-none"
                  data-toggle="dropdown"
                >
                  <span className="ml-2 d-none d-lg-block">
                    <span className="text-default">Ethereum Wallet</span>
                    <small className="text-muted d-block mt-1">
                      Address: {activeAddress}
                    </small>
                  </span>
                </a>
              </div>
            </div>
            <a
              className="header-toggler d-lg-none ml-3 ml-lg-0"
              data-toggle="collapse"
              data-target="#headerMenuCollapse"
            >
              <span className="header-toggler-icon"></span>
            </a>
          </div>
        </div>
      </div>
      <BrowserRouter>
        <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg order-lg-first">
                <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                  <li className="nav-item">
                    <NavLink
                      exact
                      to={{ pathname: "/" }}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fe fe-home"></i> Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to={{ pathname: "/token-create" }}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fa fa-edit"></i> Create Token
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3 my-md-5">
          <Main />
        </div>
      </BrowserRouter>
    </div>
  );
}
