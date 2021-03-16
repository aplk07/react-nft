import { web3 } from "../constants/constants";
export const sendEthereum = async function (
  fromAddress,
  toAddress,
  value,
  gasLimit = 21000,
  gasPrice = 10000
) {
  const ethereumDecimals = web3.utils.toBN(15);
  const gasPriceDecimals = web3.utils.toBN(5);
  const amount = web3.utils.toBN(value);
  const gas = web3.utils.toBN(gasPrice);
  const ethereumVal = amount.mul(web3.utils.toBN(10).pow(ethereumDecimals));
  const gasPriceVal = gas.mul(web3.utils.toBN(10).pow(gasPriceDecimals));
  web3.eth
    .sendTransaction({
      from: fromAddress,
      to: toAddress,
      value: ethereumVal,
      gas: gasLimit,
      gasPrice: gasPriceVal,
    })
    .on("transactionHash", (hash) => {
      console.log(hash);
    })
    .then(function (reseipt) {
      console.log("Completed");
    });
};
