/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import ProfileScreen from "./screens/profileScreen";
import { sendToken } from "./services/sendToken";
import { sendEthereum } from "./services/sendEthereum";
import { web3 } from "./constants/constants";
import { tokenDetails } from "./services/tokenDetails";
import { getNFTDetails } from "./services/getNFTDetails";
import { getNFTURI } from "./services/getNFTURI";
import EthereumPaymentScreen from "./screens/ethereumPayment";
import TokenPaymentScreen from "./screens/tokenPayment";
import TokenSwapScreen from "./screens/tokenSwapScreen";
import TokenCreationScreen from "./screens/createTokenScreen";
export default function MainScreen() {
  const [activeAddress, setActiveAddress] = useState("");
  const [bal, setBal] = useState(0);
  const [txnCount, setTxnCount] = useState(0);
  const [tokenDetail, setTokenDetail] = useState(0);
  const [nonFun, setNonFun] = useState(0);
  const [list, setList] = useState([]);
  useEffect(async () => {
    try {
      window.ethereum.enable();
      const addr = await web3.eth.getAccounts();
      const count = await web3.eth.getTransactionCount(addr[0]);
      const token = await tokenDetails(
        "0x371186f686aeaa128f90cd3ab91bf0e07a86ba68",
        addr[0]
      );
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
      setTxnCount(count);
      setTokenDetail(token);
      setBal(
        parseFloat(
          web3.utils.fromWei(await web3.eth.getBalance(addr[0]), "ether")
        ).toFixed(4)
      );
    } catch (err) {
      console.log(err);
    }
  }, []);
  const profileScreen = () => {
    return (
      <ProfileScreen
        ethereumBalance={bal}
        transactionCount={txnCount}
        tokenDetail={tokenDetail}
        nonFun={nonFun}
        list={list}
      />
    );
  };
  const ethereumPaymentScreen = () => {
    return <EthereumPaymentScreen fromAddress={activeAddress[0]} />;
  };
  const tokenPaymentScreen = () => {
    return <TokenPaymentScreen fromAddress={activeAddress[0]} />;
  };
  const tokenSwapScreen = () => {
    return <TokenSwapScreen fromAddress={activeAddress[0]} />;
  };
  const tokenCreate = () => {
    return <TokenCreationScreen fromAddress={activeAddress[0]} />;
  };
  const Main = () => (
    <Switch>
      <Route exact path="/" component={profileScreen}></Route>
      <Route
        exact
        path="/ethereum-payment"
        component={ethereumPaymentScreen}
      ></Route>
      <Route exact path="/token-payment" component={tokenPaymentScreen}></Route>
      <Route exact path="/token-swap" component={tokenSwapScreen}></Route>
      <Route exact path="/token-create" component={tokenCreate}></Route>
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
              href="#"
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
                      to={{ pathname: "/ethereum-payment" }}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fab fa-ethereum"></i> Ethereum
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to={{ pathname: "/token-payment" }}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fa fa-key"></i> Token
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to={{ pathname: "/token-swap" }}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className="fa fa-key"></i> Token Swap
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
