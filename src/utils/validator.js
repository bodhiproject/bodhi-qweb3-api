class Validator {

  static validateArgs(args) {
    for (var key in args) {
      if (args[key] === undefined) {
        throw new TypeError(key.concat(' is undefined');
      }
    }
  };
}

module.exports = Validator;
