import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/index/Index";
import Sort from "@/view/sort/Index";
import Car from "@/view/car/Index";
import Home from "@/view/home/Index";

Vue.use(Router);

export default new Router({
  mode: "history",
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
      path: "/sort/details/:id",
      name: "商品详情",
      component: () => import("@/view/sort/Details"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/car",
      name: "购物车",
      component: Car
    },
    {
      path: "/car/settlement",
      name: "购物车结算页",
      component: () => import("@/view/car/Settlement"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/home",
      name: "我的",
      component: Home
    },
    {
      path: "/address/index",
      name: "地址管理",
      component: () => import("@/view/address/Index"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/address/edit/:id?",
      name: "地址编辑",
      component: () => import("@/view/address/Edit"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/order/index/:type",
      name: "订单页",
      component: () => import("@/view/order/Index"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/order/settlement/:id",
      name: "结算页",
      component: () => import("@/view/order/Settlement"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/order/unpaidOrder/detail/:id",
      name: "未支付订单详情页",
      component: () => import("@/view/order/UnpaidOrderDetail"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/pay/:orderID",
      name: "支付页面",
      component: () => import("@/view/common/pay"),
      meta: {
        navShow: false
      }
    }
  ]
});
