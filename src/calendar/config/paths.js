"use strict";

const path = require("path");

const entryProjectName = process.env.ENTRY_PROJECT_NAME || "finlogix-main";
const devBuildProjectName =
  process.env.DEV_BUILD_PROJECT_NAME || "finlogix-dev-build-tools";
const sourceProjects = process.env.SOURCE_PROJECTS || [
  "finlogix-components",
  "finlogix-utils",
  "finlogix-store",
  "finlogix-language"
];
const styleProjects = process.env.STYLE_PROJECTS || [
  "finlogix-components",
  "config"
];

const entryProjectDirectory = path.resolve(__dirname, "../" + entryProjectName);
const devBuildProjectDirectory = path.resolve(
  __dirname,
  "../" + devBuildProjectName
);
const resolveApp = relativePath =>
  path.resolve(entryProjectDirectory, relativePath);
const appSourcePaths = [resolveApp("src")];
sourceProjects.forEach(proj =>
  appSourcePaths.push(path.resolve(__dirname, "../" + proj))
);

const appStylePaths = [resolveApp("src")];
styleProjects.forEach(proj =>
  appStylePaths.push(path.resolve(__dirname, "../" + proj))
);

module.exports = {
  projectBuild: path.resolve(__dirname, "../../build"),
  projectServerBuild: path.resolve(__dirname, "../../server_build"),
  appEntryNodeModule: resolveApp("node_modules"),
  devBuildNodeModule: path.resolve(devBuildProjectDirectory, "node_modules"),
  appBuild: resolveApp("build"),
  appPublic: resolveApp("public"),
  appRelease: resolveApp("release"),
  appIndexJs: resolveApp("src/index.js"),
  appServerIndexJs: resolveApp("src/Server.jsx"),
  appSrc: resolveApp("src"),
  appSourcePaths,
  appStylePaths,
  appHtml: resolveApp("public/index.html")
};
