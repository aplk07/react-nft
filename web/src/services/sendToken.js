import { web3 } from "../constants/constants";
export const sendToken = function (
  tokenAddress,
  ownerAddress,
  toAddress,
  tokenValue
) {
  const minABI = [
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      type: "function",
    },
  ];
  const decimals = web3.utils.toBN(18);
  const amount = web3.utils.toBN(tokenValue);
  const contract = new web3.eth.Contract(minABI, tokenAddress);
  const value = amount.mul(web3.utils.toBN(10).pow(decimals));
  contract.methods
    .transfer(toAddress, value)
    .send({ from: ownerAddress })
    .on("transactionHash", function (hash) {
      console.log(hash);
    });
};
