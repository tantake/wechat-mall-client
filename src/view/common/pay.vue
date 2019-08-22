<template>
  <div class="pay">
    <p class="pay-title">壹柯米收银台</p>
    <p class="pay-price">
      ￥
      <span>{{order.orderAmount}}</span>
    </p>
    <p class="pay-time">剩余支付时间&nbsp;&nbsp;00:{{minute}}:{{second}}</p>
    <mt-radio align="right" title="支付方式" value="微信支付" :options="['微信支付']"></mt-radio>
    <p class="pay-btn" @click="pay">支付￥{{order.orderAmount}}</p>
  </div>
</template>

<script>
import wx from "weixin-jsapi";
export default {
  data() {
    return {
      order: {},
      payTime: 1800,
      minute: "30",
      second: "00",
      timer: null,
      payConfig: {},
      payResult: ""
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
      this.getOrder();
      this.countDown();
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
    async getOrder() {
      const res = await this.$api.order.getOrderInfo({
        orderId: Number(this.$route.params.orderID)
      });
      if (res.code === 200) {
        this.order = res.data[0];
        console.log(res.data[0]);
      } else {
        this.$messagebox("提示", "网络异常");
      }
      return res.data[0];
    },
    async getConfig() {
      const res = await this.$api.pay.getConfig();
      wx.config({
        debug: true,
        appId: res.appid,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: ["chooseWXPay"]
      });
      // 检查是否支持调起微信支付
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["chooseWXPay"],
          success: function(res) {
            console.log("seccess");
            console.log(res);
          },
          fail: function(res) {
            console.log("fail");
            console.log(res);
          }
        });
      });
    },
    async pay() {
      const that = this;
      const user = this.$store.getters.userInfo;
      const orderId = this.$route.params.orderID;
      console.log(user);
      const res = await this.$api.pay.pay({
        openId: user.openid,
        orderSn: Number(orderId)
      });
      WeixinJSBridge.invoke(// eslint-disable-line
        "getBrandWCPayRequest",
        {
          appId: res.appId,
          timeStamp: res.timeStamp,
          nonceStr: res.nonce_str,
          package: `prepay_id=${res.prepay_id}`,
          signType: res.signType,
          paySign: res.paySign
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            that.$router.push(`/order/detail/${orderId}`);
            /* that.$indicator.open({
              text: "检查订单状态...",
              spinnerType: "fading-circle"
            });
            that.payResult = setInterval(() => {
              let order = that.getOrder();
              if (order.orderStatus === 1) {
                that.$indicator.close();
                clearInterval(that.payResult);
                that.$router.push(`/order/detail/${orderId}`);
              }
            }, 2000); */
          } else {
            that.$messagebox("支付失败", "网络异常");
          }
        }
      );
      console.log(res);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
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
  @{deep} .mint-radiolist-title {
    font-size: 28px;
    width: 25%;
    text-align: left;
    margin: 0;
    color: #333;
  }
  @{deep} .mint-radio-label {
    font-size: 28px;
  }
  @{deep} .mint-radio-core {
    width: 32px;
    height: 32px;
  }
  @{deep} .mint-radio-core::after {
    top: 30%;
    left: 30%;
    width: 40%;
    height: 40%;
  }
  @{deep} .mint-radio-label {
    margin-left: 0;
  }
  @{deep} .mint-radiolist-title {
    margin-left: 4%;
  }
  @{deep} .mint-radio-input:checked + .mint-radio-core {
    background-color: #f2270c;
    border-color: #f2270c;
  }
}
</style>