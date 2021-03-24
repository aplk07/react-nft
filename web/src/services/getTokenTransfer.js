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
    .then(async (data, index) => {
      const allTransaction = data.result;
      const validList = [];
      const currentList = allTransaction.filter((transaction) => {
        return (
          transaction.contractAddress === contract &&
          (Web3.utils.toChecksumAddress(transaction.to) === fromAddress ||
            Web3.utils.toChecksumAddress(transaction.from) === fromAddress)
        );
      });
      const unique = (value, index, self) => {
        return self.indexOf(value) === index;
      };
      const tokens = currentList.map((val) => val.tokenID).filter(unique);
      tokens
        .map((ins) => currentList.map((el) => el.tokenID).lastIndexOf(ins))
        .map((validIndexes) => validList.push(currentList[validIndexes]));

      await Promise.all(
        validList.map(async (val, index) => {
          if (Web3.utils.toChecksumAddress(val.to) === fromAddress) {
            const uri = await getURIData(val.tokenID, contract).then(
              (data) => data
            );
            val.uri = uri;
            ownedPatent.push(val);
          }
        })
      );
    });
  return ownedPatent;
};
