//先临时做一个模拟获取权限的函数

export function getCurrentAuthority() {
  //切换值用于测试
  return ["admin"];
  // return ["user"];
}

//一个校验权限的函数
export function check(authority) {
  const current = getCurrentAuthority();
  //authority.includes 检查 authority数组包含某元素
  //current.some JavaScript Array some() 方法 some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
  //some() 方法会依次执行数组的每个元素：
  //如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
  //如果没有满足条件的元素，则返回false。

  return current.some(item => authority.includes(item));
}

//一个登录函数
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
