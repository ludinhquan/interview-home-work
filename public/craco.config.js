const path = require("path");
const CracoLessPlugin = require("craco-less-plugin");

module.exports = {
  webpack: {
    alias: {
      "@": path.join(path.resolve(__dirname, "./src")),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyVars: {
          "@mobile": "576px",
        },
        javascriptEnabled: true,
      },
    },
  ],
};
