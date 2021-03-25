import { web3 } from "../constants/constants";

export const sharePatent = async function (
  fromAddress,
  toAddress,
  tokenID,
  update,
  success,
  error
) {
  const patentContract = "0x7e40600d3f52ccc62fb94187ac6decb8802c22f3";
  const minABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "sharePatent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const contract = new web3.eth.Contract(
    minABI,
    "0x67e85C5e76AbB2df3F702Ae06Af46ceb33d76F9F"
  );
  try {
    contract.methods
      .sharePatent(toAddress, patentContract, tokenID)
      .send({ from: fromAddress })
      .on("transactionHash", (hash) => {
        update(hash);
      })
      .then((done) => {
        console.log(done);
      });
  } catch (err) {
    error(err.message);
  }
};
