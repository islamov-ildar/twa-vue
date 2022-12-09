const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/twa-vue/" : "/",

  transpileDependencies: true,

  configureWebpack: (config) => {
    config.externals = {
      typeorm: "require('typeorm')",

      pg: "require('pg')",
    };
  },
});
