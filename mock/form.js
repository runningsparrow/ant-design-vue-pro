function form(method) {
  let res = null;
  switch (method) {
    case "POST":
      res = { message: "ok" };
      break;
    default:
      res = null;
  }
  return res;
}

//nodejs 的 module.exports 导出模块
module.exports = form;
