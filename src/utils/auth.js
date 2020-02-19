//先临时做一个模拟获取权限的函数

export function getCurrentAuthority() {
  return ["admin"];
}

//一个校验权限的函数
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

//一个登录函数
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
