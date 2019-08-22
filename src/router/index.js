import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/index/Index";
import Sort from "@/view/sort/Index";
import Cart from "@/view/cart/Index";
import Home from "@/view/home/Index";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/index",
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
      path: "/cart",
      name: "购物车",
      component: Cart
    },
    {
      path: "/home",
      name: "我的",
      component: Home
    },
    {
      path: "/home/about",
      name: "关于我们",
      component: () => import("@/view/home/About"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/home/contact",
      name: "联系我们",
      component: () => import("@/view/home/Contact"),
      meta: {
        navShow: false
      }
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
      path: "/order/detail/:id",
      name: "待支付订单详情页",
      component: () => import("@/view/order/OrderDetail"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/common/detail/:id",
      name: "商品详情页",
      component: () => import("@/view/common/Detail"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/common/checkOrder",
      name: "结算页",
      component: () => import("@/view/common/CheckOrder"),
      meta: {
        navShow: false
      }
    },
    {
      path: "/common/pay/:orderID",
      name: "支付页面",
      component: () => import("@/view/common/Pay"),
      meta: {
        navShow: false
      }
    },
  ]
});
