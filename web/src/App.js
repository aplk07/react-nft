/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import MainScreen from "./mainScreen";

export default function App() {
  return <MainScreen />;
}

// function App() {

  // useEffect(async () => {
  //   try {
  //     window.ethereum.enable();
  //     const addr = await web3.eth.getAccounts();
  //     setActiveAddress(addr);
  //     setBal(
  //       parseFloat(
  //         web3.utils.fromWei(await web3.eth.getBalance(addr[0]), "ether")
  //       ).toFixed(4)
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);
//   return (
//     <div className="App">
//       <div className="App-header">
//         <div className="User-account">
//           {!isTransactionMode && !tokenTransactionMode ? (
//             <div className="Account-container">
//               <div className="Account-header">Your Primary Account</div>
//               <div className="Account-address">{activeAddress}</div>
//               <div className="Account-balance">{bal} ETH</div>
//               <button onClick={() => setIsTransactionMode(true)}>
//                 Send ETH
//               </button>
//               <button onClick={() => setTokenTransactionMode(true)}>
//                 Send Token
//               </button>
//             </div>
//           ) : isTransactionMode ? (
//             <div className="Account-container">
//               <div className="Account-header">Send ETH</div>
//               <div className="Account-details">
//                 <div className="Account-from">from</div>
//                 <div className="Account-fromAddress">{activeAddress}</div>
//               </div>
//               <div className="Account-balanceDetails">
//                 <div className="Account-balanceHeader">balance ETH</div>
//                 <div className="Account-balanceValue">{bal}</div>
//               </div>
//               <form className="Form-container">
//                 <label>
//                   to:
//                   <input
//                     type="text"
//                     name="to"
//                     value={toAddress}
//                     min={0}
//                     onChange={(event) => setToAddress(event.target.value)}
//                   />
//                 </label>
//                 <label>
//                   amount:
//                   <input
//                     type="number"
//                     name="ether"
//                     value={value}
//                     min={0}
//                     onChange={(event) => setValue(event.target.value)}
//                   />
//                 </label>
//                 <label>
//                   gas limit:
//                   <input
//                     type="number"
//                     name="gas limit"
//                     value={gasLimit}
//                     min={0}
//                     onChange={(event) => setGasLimit(event.target.value)}
//                   />
//                 </label>
//                 <label>
//                   gas price:
//                   <input
//                     type="number"
//                     name="gas price"
//                     value={gasPrice}
//                     min={0}
//                     onChange={(event) => setGasPrice(event.target.value)}
//                   />
//                 </label>
//                 <button
//                   onClick={() =>
//                     sendEthereum(
//                       activeAddress[0],
//                       "0xc32b7fe13c001fe6D7Ac2B26AbF7535546CdcC84",
//                       value,
//                       gasLimit,
//                       gasPrice
//                     )
//                   }
//                 >
//                   Send
//                 </button>
//               </form>
//             </div>
//           ) : (
//             <div className="Account-container">
//               <div className="Account-header">Send TOken</div>
//               <div className="Account-details">
//                 <div className="Account-from">from</div>
//                 <div className="Account-fromAddress">{activeAddress}</div>
//               </div>
//               <form className="Form-container">
//                 <label>
//                   token address
//                   <input
//                     type="text"
//                     name="token Address"
//                     value={tokenAddress}
//                     min={0}
//                     onChange={(event) => setTokenAddress(event.target.value)}
//                   />
//                 </label>
//                 <label>
//                   to:
//                   <input
//                     type="text"
//                     name="to"
//                     value={toAddress}
//                     min={0}
//                     onChange={(event) => setToAddress(event.target.value)}
//                   />
//                 </label>
//                 <label>
//                   amount:
//                   <input
//                     type="number"
//                     name="ether"
//                     placeholder="1 is 1 token"
//                     value={value}
//                     min={0}
//                     onChange={(event) => setValue(event.target.value)}
//                   />
//                 </label>
//                 <button
//                   onClick={() =>
//                     sendToken(tokenAddress, activeAddress[0], toAddress, value)
//                   }
//                 >
//                   Send
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>
//         {txnId ? (
//           <div className="Transaction-result">
//             <div>transaction Status</div>
//             <div className="Transaction-details">
//               {isComplete ? "success" : "pending"}
//             </div>
//             <div>{txnId}</div>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }
