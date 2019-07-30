<template>
  <div class="pay">
    <p class="pay-title">壹柯米收银台</p>
    <p class="pay-price">
      ￥
      <span>{{order.totalPrice}}</span>.00
    </p>
    <p class="pay-time">剩余支付时间&nbsp;&nbsp;00:{{minute}}:{{second}}</p>
    <mt-radio align="right" title="支付方式" value="微信支付" :options="['微信支付']"></mt-radio>
    <p class="pay-btn" @click="pay">支付￥{{order.totalPrice}}.00</p>
  </div>
</template>

<script>
import wx from "weixin-jsapi";
export default {
  data() {
    return {
      order: {
        id: "123456",
        totalPrice: 3850
      },
      payTime: 1800,
      minute: "30",
      second: "00",
      timer: null
    };
  },
  watch: {
    payTime: function(val) {
      this.minute = parseInt(val / 60);
      this.second = val % 60;
    }
  },
  methods: {
    init() {
      this.countDown();
      this.getConfig();
    },
    countDown() {
      this.timer = setInterval(() => {
        if (this.payTime > 0) {
          this.payTime--;
        } else {
          clearTimeout(this.timer);
        }
      }, 1000);
    },
    getConfig() {
      this.$api.pay.getConfig().then(data => {
        console.log(wx);
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: ["chooseWXPay"]
        });
      });
    },
    pay() {
      this.$api.pay.getpay({id: 123}).then(data => {
        var args = data;
        wx.ready(function() {
          wx.chooseWXPay({
            timestamp: args.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: args.nonceStr, // 支付签名随机串，不长于 32 位
            package: args.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: args.paySign, // 支付签名
            success: function(res) {
              window.location.href = "你所要跳转的页面";
            },
            cancel: function(res) {
              alert("已取消支付");
            },
            fail: function(res) {
              alert("购买失败，请重新创建订单");
            }
          });
        });
      });
      alert("支付功能暂未打通");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.pay {
  width: 100%;
  position: absolute;
  background-color: #fff;
  min-height: 100%;
  .pay-title {
    text-align: center;
    line-height: 100px;
    margin-bottom: 40px;
    font-size: 30px;
  }
  .pay-price {
    text-align: center;
    font-size: 24px;
    color: #f23030;
    line-height: 60px;
    span {
      font-size: 48px;
      font-weight: bold;
    }
  }
  .pay-time {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 40px;
  }
  .pay-btn {
    position: fixed;
    left: 4%;
    bottom: 20px;
    width: 92%;
    height: 76px;
    border-radius: 100px;
    text-align: center;
    line-height: 76px;
    background: linear-gradient(to right, #ff4d17, #f20100);
    color: #fff;
    font-size: 28px;
  }
  /deep/ .mint-radiolist-title {
    font-size: 28px;
    width: 25%;
    text-align: left;
    margin: 0;
    color: #333;
  }
  /deep/.mint-radio-label {
    font-size: 28px;
  }
  /deep/.mint-radio-core {
    width: 32px;
    height: 32px;
  }
  /deep/.mint-radio-core::after {
    top: 8px;
    left: 8px;
    width: 12px;
    height: 12px;
  }
  /deep/.mint-radio-label {
    margin-left: 0;
  }
  /deep/.mint-radiolist-title {
    margin-left: 4%;
  }
}
</style>