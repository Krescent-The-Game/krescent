// config.forge.js
const path = require("path");

module.exports = {
  packagerConfig: {
    icon: path.resolve(__dirname, "favicon.icns"),
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Krescent",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      config: {
        packagerConfig: {
          icon: path.resolve(__dirname, "/favicon.icns"),
        },
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
