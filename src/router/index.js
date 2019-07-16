import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/index/Index";
import Sort from "@/view/sort/Index";
import Car from "@/view/car/Index";
import Home from "@/view/home/Index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "首页",
      component: Index
    },
    {
      path: "/sort",
      name: "分类",
      component: Sort
    },
    {
      path: "/car",
      name: "购物车",
      component: Car
    },
    {
      path: "/home",
      name: "我的",
      component: Home
    },
    {
      path: "/details",
      name: "details",
      component: () => import("@/view/sort/Details"),
      meta: {
        navShow: false
      }
    }
  ]
});
