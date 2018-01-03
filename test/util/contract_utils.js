import _ from 'lodash';

const ContractUtils = {
  isTxSuccessful: function(txReceipt) {
    return !_.isUndefined(txReceipt) 
      && !_.isUndefined(txReceipt.txid) 
      && !_.isUndefined(txReceipt.sender) 
      && !_.isUndefined(txReceipt.hash160);
  },
};

module.exports = ContractUtils;
