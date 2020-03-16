function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [20, 40, 99, 20, 30, 48];
      break;
    default:
      res = null;
  }
  return res;
}

//nodejs 的 module.exports 导出模块
module.exports = chart;
