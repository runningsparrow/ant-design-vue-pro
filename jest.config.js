module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  //设置识别哪些文件是测试文件（glob形式），与testRegex互斥，不能同时写
  testMatch: ["**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  //如果是终端敲npm run unit，那么需要修改jest.conf.js文件添加一行testURL
  testURL: "http://localhost/",
  collectCoverage: process.env.COVERAGE === "true",
  collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"]
};
