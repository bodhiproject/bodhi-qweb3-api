import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function bet(args) {
  const { 
    index, 
    amount, 
    senderAddress,
  } = args;

  if (index === undefined || amount === undefined) {
    res.send(500, 'Both index and amount needs to be defined.');
    return;
  }

  const oracle = new qweb3.Contract(Contracts.CentralizedOracle.address, Contracts.CentralizedOracle.abi);
  return await oracle.send('bet', {
    methodArgs: [index],
    amount: amount,
    senderAddress: senderAddress,
  });
}
