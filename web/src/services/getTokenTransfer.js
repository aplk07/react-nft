import Web3 from "web3";

import { getURIData } from "./getURIData";

export const getTokenTransfer = async function (fromAddress, contract) {
  const sourceAddress = "0x0000000000000000000000000000000000000000";
  const ownedPatent = [];
  await fetch(
    "https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&address=" +
      fromAddress +
      "&startblock=0&endblock=999999999&sort=asc&apikey=U135AAK1Q682YD2SA98SMJC5JX9RRTS129"
  )
    .then((response) => response.json())
    .then(async (data, index) => {
      const allTransaction = data.result;
      for (let i = 0; i < allTransaction.length; i++) {
        const instanceData = allTransaction[i];
        if (instanceData.contractAddress === contract) {
          if (
            instanceData.from === sourceAddress &&
            Web3.utils.toChecksumAddress(instanceData.to) === fromAddress
          ) {
            const uri = await getURIData(instanceData.tokenID, contract);
            instanceData.uri = uri;
            instanceData.owner = true;
            allTransaction.map(function (val, index) {
              if (val.contractAddress === contract) {
                if (Web3.utils.toChecksumAddress(val.from) === fromAddress) {
                  if (instanceData.tokenID === val.tokenID) {
                    instanceData.share = val.hash;
                    instanceData.sharedTo = val.to;
                  }
                }
              }
            });
            ownedPatent.push(instanceData);
          } else if (
            Web3.utils.toChecksumAddress(instanceData.to) === fromAddress
          ) {
            const uri = await getURIData(instanceData.tokenID, contract);
            instanceData.uri = uri;
            instanceData.owner = false;
            allTransaction.map((val, index) => {
              if (val.contractAddress === contract) {
                if (instanceData.tokenID === val.tokenID) {
                  instanceData.sharedFrom = val.from;
                }
              }
            });
            ownedPatent.push(instanceData);
          }
        }
      }
    });
  return ownedPatent;
};
