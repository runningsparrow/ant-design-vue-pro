import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/404";
//引入 RenderRouterView
// import RenderRouterView from "../components/RenderRouterView";

Vue.use(VueRouter);

const routes = [
  //增加登录与注册的路由
  {
    path: "/user",
    //hideInMenu 使这个路由item不传递给菜单
    hideInMenu: true,
    //挂载 RenderRouterView
    // component: RenderRouterView,
    // component 改成异步加载
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/UserLayout"),
    children: [
      //增加一个上级目录的自动跳转
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Register")
      }
    ]
  },
  //加入其他布局要素 start
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/BasicLayout"),
    children: [
      //dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        //添加字段用于 sidemenu ,icon的名字可以是任意组件库自带的图标
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            //这个meta不需要图标，只在一级菜单给图标
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      },
      //form
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        meta: { icon: "form", title: "表单" },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            //这个meta不需要图标，只在一级菜单给图标
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            //它的儿子不传递给sidemenu
            hideChildrenInMenu: true,
            //这个meta不需要图标，只在一级菜单给图标
            meta: { title: "分步表单" },
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "about" */ "../views/Forms/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  //加入其他布局要素 end
  {
    path: "*",
    name: "404",
    //不传递给sidemenu
    hideInMenu: true,
    component: NotFound
  }
  // {
  //   path: "/",
  //   name: "home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  //假如页面不变，则不需要加载进度条
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
