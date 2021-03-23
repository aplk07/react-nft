import { web3 } from "../constants/constants";

export const getURIData = async function (tokenId, contractAddress) {
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
  const uriContract = new web3.eth.Contract(minABI, contractAddress);
  let detail = await uriContract.methods.tokenURI(tokenId).call();
  const addTokenId = JSON.parse(detail);
  detail = JSON.stringify(addTokenId);
  return addTokenId;
};
