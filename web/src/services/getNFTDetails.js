import { web3 } from "../constants/constants";

export const getNFTDetails = async function (tokenAddress, walletAddress) {
  const minABI = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    // balanceOf
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    // decimals
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      type: "function",
    },
  ];
  const balanceContract = new web3.eth.Contract(minABI, tokenAddress);
  const name = await balanceContract.methods.name().call();
  const balance = await balanceContract.methods.balanceOf(walletAddress).call();
  const totalSup = await balanceContract.methods.totalSupply().call();
  const symbol = await balanceContract.methods.symbol().call();
  const decimals = web3.utils.toBN(0);
  const bal = web3.utils.toBN(balance);
  const final = bal.div(web3.utils.toBN(10).pow(decimals));
  return { balance: final.toNumber(), name, symbol, totalSup };
};
