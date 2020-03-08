module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  //从 http://webpack.docschina.org/configuration/dev-server/#devserver-proxy复制
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // bypass: function(req, res, proxyOptions) {
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
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
