import router from "../../router";
import request from "../../utils/request";

const state = {
  step: {
    payAccount: "123456"
  }
};

//一个异步的action
const actions = {
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: "/api/form",
      method: "POST",
      data: payload
    });
    //返回请求后
    commit("saveStepFormData", payload);
    //跳转路由
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

export default {
  //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  namespaced: true,
  state,
  actions,
  mutations
};
