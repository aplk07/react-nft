import { web3 } from "../constants/constants";

export const getNFTURI = async function (
  totalSupply,
  tokenAddress,
  ownerAddress
) {
  const minABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ];
  const uriContract = new web3.eth.Contract(minABI, tokenAddress);
  const temp = [];
  console.log(totalSupply);
  for (let i = 1; i <= totalSupply; i++) {
    const owner = await uriContract.methods.ownerOf(i).call();
    if (owner === ownerAddress) {
      const detail = await uriContract.methods.tokenURI(i).call();
      temp.push(detail);
    } else {
      const detail = await uriContract.methods.tokenURI(i).call();
      console.log(await uriContract.methods.ownerOf(i).call());
      console.log(detail, i);
    }
  }
  return temp;
};
