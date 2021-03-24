import Web3 from "web3";

import { getURIData } from "./getURIData";

export const getTokenTransfer = async function (fromAddress, contract) {
  // const sourceAddress = "0x0000000000000000000000000000000000000000";
  const ownedPatent = [];
  await fetch(
    "https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&address=" +
      fromAddress +
      "&startblock=0&endblock=999999999&sort=asc&apikey=U135AAK1Q682YD2SA98SMJC5JX9RRTS129"
  )
    .then((response) => response.json())
    .then((data, index) => {
      const allTransaction = data.result;
      const found = [];
      allTransaction.map((value, index) => {
        if (value.contractAddress === contract) {
          if (Web3.utils.toChecksumAddress(value.to) === fromAddress) {
            const temp = allTransaction.reduce((previous, current) =>
              current.tokenID === value.tokenID ? current : previous
            );
            found.push(temp);
          }
        }
      });

      found.forEach((val, index) => {
        if (Web3.utils.toChecksumAddress(val.to) === fromAddress) {
          const uri = getURIData(val.tokenID, contract);
          val.uri = uri;
          ownedPatent.push(val);
        }
      });

      // // for (let i = 0; i < allTransaction.length; i++) {
      // //   const instanceData = allTransaction[i];
      // //   if (instanceData.contractAddress === contract) {
      // //     if (Web3.utils.toChecksumAddress(instanceData.to) === fromAddress) {
      // //       for (let j = i + 1; j < allTransaction.length; j++) {
      // //         const instance2 = allTransaction[j];
      // //         if (instanceData.tokenID === instance2.tokenID) {
      // //           console.log(instanceData.from, instanceData.to);
      // //         }
      // //       }
      // //       // instanceData.owner = true;
      // //       // allTransaction.map(function (val, index) {
      // //       //   if (val.contractAddress === contract) {
      // //       //     if (Web3.utils.toChecksumAddress(val.from) === fromAddress) {
      // //       //       if (instanceData.tokenID === val.tokenID) {
      // //       //         instanceData.share = val.hash;
      // //       //         instanceData.sharedTo = val.to;
      // //       //       }
      // //       //     }
      // //       //   }
      // //       //   return null;
      // //       // });
      // //       // ownedPatent.push(instanceData);
      // //     }
      // //     // else if (
      // //     //   Web3.utils.toChecksumAddress(instanceData.to) === fromAddress
      // //     // ) {

      // //     //   instanceData.owner = false;
      // //     //   allTransaction.map((val, index) => {
      // //     //     if (val.contractAddress === contract) {
      // //     //       if (instanceData.tokenID === val.tokenID) {
      // //     //         instanceData.sharedFrom = val.from;
      // //     //       }
      // //     //     }
      // //     //     return null;
      // //     //   });
      // //     //   ownedPatent.push(instanceData);
      // //     // }
      // //   }
      // }
    });
  console.log(ownedPatent);
  return ownedPatent;
};
