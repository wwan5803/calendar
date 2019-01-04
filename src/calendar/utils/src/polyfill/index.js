if (!process.env.IS_SERVER) {
  module.exports = require("./forBrowser");
}
