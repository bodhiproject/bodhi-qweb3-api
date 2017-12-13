import Contracts from '../../config/contracts';

export async function bet(qweb3, args) {
  const { 
    index, 
    amount, 
    senderAddress,
  } = args;

  if (index === undefined || amount === undefined) {
    res.send(500, 'Both index and amount needs to be defined.');
    return;
  }

  console.log('bet');
  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.send('bet', {
    methodArgs: [index],
    amount: amount,
    senderAddress: senderAddress,
  });
}
