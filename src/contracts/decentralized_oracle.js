import Config from '../../config/config';
import Contracts from '../../config/contracts';

const Qweb3 = require('../modules/qweb3/index');
const qweb3 = new Qweb3(Config.QTUM_RPC_ADDRESS);

export async function vote(args) {
  const { 
    resultIndex, 
    botAmount, 
    senderAddress,
  } = args;

  const oracle = new qweb3.Contract(Contracts.DecentralizedOracle.address, Contracts.DecentralizedOracle.abi);
  return await oracle.send('voteResult', {
    methodArgs: [resultIndex, botAmount],
    gasLimit: 2000000,
    senderAddress: senderAddress,
  });
}
