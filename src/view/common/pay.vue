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
      timer: null,
      payConfig: {}
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
    async pay() {
      this.payConfig = await this.$api.pay.getConfig({
        openId: "o9ng05rk9w7i6RmucpS5B-miMEjw",
        orderSn: "20190801142462826",
        totalFree: 1,
        descrption: "测试交易"
      });
      console.log(this.payConfig);
      this.onBridgeReady(this.payConfig);
    },
    onBridgeReady(payConfig) {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: payConfig.appid, // 公众号名称，由商户传入
          timeStamp: payConfig.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: payConfig.nonce_str, // 随机串
          package: `prepay_id=${payConfig.prepay_id}`,
          signType: "MD5", // 微信签名方式：
          paySign: payConfig.sign // 微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            console.log("支付成功");
          } else {
            console.log("支付失败");
          }
        }
      );
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
    top: 30%;
    left: 30%;
    width: 40%;
    height: 40%;
  }
  /deep/.mint-radio-label {
    margin-left: 0;
  }
  /deep/.mint-radiolist-title {
    margin-left: 4%;
  }
  /deep/.mint-radio-input:checked + .mint-radio-core {
    background-color: #f2270c;
    border-color: #f2270c;
  }
}
</style>