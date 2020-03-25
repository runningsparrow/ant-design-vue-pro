module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A",
          "link-color": "#1DA57A",
          "border-radius-base": "2px"
        },
        javascriptEnabled: true
      }
    }
  },
  //https://cli.vuejs.org/zh/guide/webpack.html#%E6%9B%BF%E6%8D%A2%E4%B8%80%E4%B8%AA%E8%A7%84%E5%88%99%E9%87%8C%E7%9A%84-loader
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  //从 http://webpack.docschina.org/configuration/dev-server/#devserver-proxy复制
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000",
        target: "http://localhost:8080",
        // bypass: function(req, res, proxyOptions) {
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            //增加else段
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            //注意，此处 mock 那里不是 引号 是 `
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            //删掉缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
