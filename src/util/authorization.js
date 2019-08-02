import router from "../router/index";
const GetQueryString = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};
router.beforeEach(async (to, from, next) => {
  const openID = await window.$db.getItem("openID");
  if (openID) {
    console.log(openID);
    console.log("存在openID");
    next();
  } else {
    console.log(from);
    console.log(window.location.href);
    const code = GetQueryString("code");
    console.log(code);
    if (code !== null) {
      console.log("获取code，请求用户信息");
      const res = await window.$api.user.getUser({
        code: code,
        scope: "snsapi_base"
      });
      await window.$db.setItem("user", res);
      next();
    } else {
      console.log("微信网页授权");
      let redirectUrl = "http://mall.foxsun.cn";
      redirectUrl = encodeURIComponent(redirectUrl);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx747c3c3fbbc0b823&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    }
  }
});
