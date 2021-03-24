import Web3 from "web3";

import { getURIData } from "./getURIData";

export const getPatentTransferedTo = async function (fromAddress, contract) {
  const transferedPatent = [];
  await fetch(
    "https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&address=" +
      fromAddress +
      "&startblock=0&endblock=999999999&sort=asc&apikey=U135AAK1Q682YD2SA98SMJC5JX9RRTS129"
  )
    .then((response) => response.json())
    .then(async (data, index) => {
      const allTransaction = data.result;
      // const validList = [];
      const currentList = allTransaction.filter((transaction) => {
        return (
          transaction.contractAddress === contract &&
          Web3.utils.toChecksumAddress(transaction.from) === fromAddress
        );
      });
      // console.log(currentList);
      // const unique = (value, index, self) => {
      //   return self.indexOf(value) === index;
      // };
      // const tokens = currentList.map((val) => val.tokenID).filter(unique);
      // console.log(tokens)
      // tokens
      //   .map((ins) => currentList.map((el) => el.tokenID).findIndex(ins))
      //   .map((validIndexes) => validList.push(currentList[validIndexes]));

      await Promise.all(
        currentList.map(async (val, index) => {
          if (Web3.utils.toChecksumAddress(val.from) === fromAddress) {
            const uri = await getURIData(val.tokenID, contract).then(
              (data) => data
            );
            val.uri = uri;
            transferedPatent.push(val);
          }
        })
      );
    });
  return transferedPatent;
};
