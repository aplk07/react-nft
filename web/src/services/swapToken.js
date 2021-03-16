import { web3 } from "../constants/constants";
export const swapToken = async function (amount1, amount2) {
  const minABI = [
    {
      constant: false,
      inputs: [
        {
          name: "_amount1",
          type: "uint256",
        },
        {
          name: "_amount2",
          type: "uint256",
        },
      ],
      name: "swap",
      type: "function",
    },
  ];
  const decimals = web3.utils.toBN(18);
  const _amount1 = web3.utils.toBN(amount1);
  const _amount2 = web3.utils.toBN(amount2);
  const value1 = _amount1.mul(web3.utils.toBN(10).pow(decimals));
  const value2 = _amount2.mul(web3.utils.toBN(10).pow(decimals));
  const contract = new web3.eth.Contract(
    minABI,
    "0x04093E56CfE969512F89A52aC4432E6A2aE46fb4"
  );
  const sawpping = await contract.methods
    .swap(value1, value2).call();
};
