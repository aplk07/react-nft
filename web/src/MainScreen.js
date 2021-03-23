import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import { web3 } from "./constants/constants";

import TokenCreationScreen from "./screens/CreateTokenScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function MainScreen() {
  const [activeAddress, setActiveAddress] = useState("");
  const [bal, setBal] = useState(0);
  async function renderData() {
    try {
      const addr = await web3.eth.getAccounts();
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
        <ProfileScreen
          ethereumBalance={bal}
          fromAddress={activeAddress[0]}
          tokenAddress="0x7e40600d3f52ccc62fb94187ac6decb8802c22f3"
        />
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
    <div className={`page-main`}>
      {!activeAddress && (
        <div className="overlay">
          <div className="loader" />
        </div>
      )}
      <div className="header py-4">
        <div className="container">
          <div className="d-flex">
            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown">
                <span className="ml-2 d-none d-lg-block">
                  <span className="text-default text-white">
                    Ethereum Wallet
                  </span>
                  <small className="text-muted d-block mt-1 text-white">
                    Address: {activeAddress}
                  </small>
                </span>
              </div>
            </div>
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
                      <i className="fa fa-edit"></i> Create Patent
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Main />
      </BrowserRouter>
    </div>
  );
}
