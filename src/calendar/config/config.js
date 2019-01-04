var env = require("../../../.env");
if (env.env === "production" || env.env === "stagging") {
    module.exports = require("./prod.config");
} else {
    module.exports = require("./test.config");
}
