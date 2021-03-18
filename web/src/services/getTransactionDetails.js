export const getTransactionDetails = async function (fromAddress, contract) {
  const listTransaction = [];
  fetch(
    "https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=" +
      fromAddress +
      "&startblock=0&endblock=99999999&sort=asc&apikey=U135AAK1Q682YD2SA98SMJC5JX9RRTS129"
  )
    .then((response) => response.json())
    .then((data, index) => {
      const allTransaction = data.result;
      for (let i = 0; i < allTransaction.length; i++) {
        if (allTransaction[`${i}`].to === contract) {
          listTransaction.push(allTransaction[`${i}`].hash);
        }
      }
    });
  return listTransaction;
};
