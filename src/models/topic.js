import _ from 'lodash';
const utils = require('qweb3/src/utils');

class Topic {

  constructor(transactionLog) {

    if (!_.isEmpty(transactionLog)) {
      this.rawLog = transactionLog;
      this.decode();
    }
  }

  decode() {

    let nameHex = _.reduce(this.rawLog['_name'], (hexStr, value) => {

      let valStr = value;

      if (valStr.indexOf('0x') === 0) {
        valStr = valStr.slice(2);
      }

      return hexStr += valStr;

    }, '');
    this.name = _.trimEnd(utils.toAscii(nameHex), '\u0000');

    let intermedia = _.map(this.rawLog['_resultNames'], (item) => _.trimEnd(utils.toAscii(item), '\u0000'));
    this.results = _.filter(intermedia, item => !!item);

    this.bettingEndBlock = this.rawLog['_bettingEndBlock'].toNumber();
    this.resultSettingEndBlock = this.rawLog['_resultSettingEndBlock'].toNumber();
    this.address = this.rawLog['_topicAddress'];
    this.creator = this.rawLog['_creator'];
    this.oracle = this.rawLog['_oracle'];

  }

  toJson() {
    return {
      name: this.name,
      resultNames: this.results,
      bettingEndBlock: this.bettingEndBlock,
      resultSettingEndBlock: this.resultSettingEndBlock,
      address: this.address,
      creator: this.creator,
      oracle: this.oracle
    }
  }
}

export default Topic;