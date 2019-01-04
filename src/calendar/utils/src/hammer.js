if (!process.env.IS_SERVER) {
  module.exports = require("hammerjs");
} else {
  module.exports = function Hammer() {
    return {
      on: function() {},
      off: function() {}
    };
  };
}
