var env = require("../../../.env");

var hostname = env.hostname;
var apiHostname = env.apiHostname;
if (process.env.IS_SERVER) {
    hostname = "http://www.finlogixtest.com";
    apiHostname = "http://api.finlogixtest.com";
}
var apiVersion = env.apiVersion;
var apiPrefix = apiHostname + "/" + apiVersion + "/";
var defaultLang = "en";
var symbolServer = env.symbolServer;
var bridgeHost = env.bridgeHost;
var bridgeApiVersion = env.bridgeApiVersion;
var bridgeApiPrefix = bridgeHost + "/" + bridgeApiVersion + "/";
var imgUrl = "/img/";
var jsAssetsPrefix = "/";
var cssAssetsPrefix = "/";
var cssImagePath = cssAssetsPrefix + "img/";
var SSRPort = 3000;
var chartVersionBreakPoint = "2018-02-08";

var thirdPartyRedirectUrls = {
    facebook: apiPrefix + "redirect/facebook",
    google: apiPrefix + "redirect/google",
    twitter: apiPrefix + "redirect/twitter",
    linkedin: apiPrefix + "redirect/linkedin"
};

var thirdPartyConfig = {
    facebook: {
        appId: "1284035321711952",
        cookie: true,
        xfbml: true,
        version: "v2.9"
    },
    weibo: {
        appId: 4031462134
    }
};

var homeHeader = {
    homeTitle: "Finlogix",
    homeContent: "Finlogix is a trading platform",
    homeImage: "/img/finlogix_logo_wechat.png"
};

module.exports = {
    hostname: hostname,
    thirdPartyRedirectUrls: thirdPartyRedirectUrls,
    thirdPartyConfig: thirdPartyConfig,
    apiHostname: apiHostname,
    apiVersion: apiVersion,
    apiPrefix: apiPrefix,
    defaultLang: defaultLang,
    symbolServer: symbolServer,
    bridgeHost: bridgeHost,
    bridgeApiVersion: bridgeApiVersion,
    bridgeApiPrefix: bridgeApiPrefix,
    imgUrl: imgUrl,
    jsAssetsPrefix: jsAssetsPrefix,
    cssAssetsPrefix: cssAssetsPrefix,
    cssImagePath: cssImagePath,
    SSRPort: SSRPort,
    homeHeader: homeHeader,
    chartVersionBreakPoint: chartVersionBreakPoint
};
