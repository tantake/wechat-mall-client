import router from "../router/index";
import store from "../store/index";
/* const GetQueryString = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}; */
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
router.beforeEach(async (to, from, next) => {
  const user = store.getters.userInfo;
  if (!user.userId) {
    store.dispatch("setUserInfo", { userId: 1 });
    const cartNumber = await window.$api.goods.cartNumber({ userId: 1 });
    store.dispatch("setCartNumber", cartNumber);
  }
  next();
  /* if (user.userId) {
    console.log("存在user");
    console.log(user);
    next();
  } else {
    const code = GetQueryString("code");
    console.log(code);
    if (code !== null) {
      console.log("获取code，请求用户信息");
      const res = await window.$api.user.getUser({
        code: code,
        scope: "snsapi_base"
      });
      store.dispatch("setUserInfo", res);
      const cartNumber = await window.$api.goods.cartNumber({ userId: res.userId });
      store.dispatch("setCartNumber", cartNumber);
      console.log(res);
      next();
    } else {
      console.log("微信网页授权");
      let redirectUrl = "http://temp.foxsun.cn";
      redirectUrl = encodeURIComponent(redirectUrl);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx747c3c3fbbc0b823&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    }
  } */
});
