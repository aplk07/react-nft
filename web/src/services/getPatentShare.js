import Web3 from "web3";
import { web3 } from "../constants/constants";
import { getURIData } from "./getURIData";
export const getPatentShare = async function (
  fromAddress,
  shareContract,
  patentContract
) {
  const sharedPatent = [];
  await fetch(
    "https://api-ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=" +
      shareContract +
      "&apikey=U135AAK1Q682YD2SA98SMJC5JX9RRTS129"
  )
    .then((response) => response.json())
    .then(async (data, index) => {
      const res = data.result;
      res.forEach(async (val) => {
        const tokenID = Web3.utils.hexToNumber(val.data);
        const uri = await getURIData(tokenID, patentContract);
        function convertAddress(hexAddress) {
          return web3.eth.abi.decodeParameter(
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            hexAddress
          );
        }
        uri.from = convertAddress(val.topics[1]);
        uri.to = convertAddress(val.topics[2]);
        sharedPatent.push(uri);
      });
    });
  return sharedPatent;
};
