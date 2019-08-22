<template>
  <div class="billPage">
    <header>
      <div class="order-status" v-if="orderInfo.orderStatus===0">
        <p class="header-title">
          <icon-font icon-class="order-pay" />等待付款
        </p>
        <p class="info">
          需付款：￥
          <span>{{orderInfo.orderAmount}}</span>
          .00&nbsp;&nbsp;剩余：00小时{{minute}}分钟
        </p>
        <p class="order-btn" @click="goPay()">去支付</p>
      </div>
      <div class="order-status" v-else-if="orderInfo.orderStatus===2">
        <p class="header-title">
          <icon-font icon-class="order-send" />等待收货
        </p>
        <p class="info">
          快递已发出，预计
          <span>5天之内</span>以前到达
        </p>
        <p class="order-btn" @click="confirm()">确认收货</p>
      </div>
      <div class="order-status" v-else>
        <p class="header-title" v-if="orderInfo.orderStatus===5">
          <icon-font icon-class="order-finished" />已完成
        </p>
        <p class="header-title" v-if="orderInfo.orderStatus===-1">
          <icon-font icon-class="order-cancel1" />已取消
        </p>
        <p class="info" v-if="orderInfo.orderStatus===5">感谢您的支持</p>
        <p class="info" v-if="orderInfo.orderStatus===-1">请再给我一次机会呗~</p>
        <p class="order-btn" @click="shopping()">再次购买</p>
      </div>
      <div class="address-box">
        <icon-font icon-class="address" />
        <div class="address">
          <p class="addres-user">{{orderInfo.consignee}}&nbsp;&nbsp;{{orderInfo.phone}}</p>
          <p>地址:{{orderInfo.address}}</p>
        </div>
      </div>
    </header>
    <div class="goods-box">
      <div class="goods-details" v-for="item in orderInfo.goodsList" :key="item.goodsId">
        <img :src="item.imgUrl" class="goods-img" alt="goodsImg" />
        <div class="goods-description">
          <p class="goods-name">{{item.goodsName}}</p>
          <p class="goods-feature">
            <span
              v-for="(attr, index) in item.goodsAttrList"
              :key="index"
            >{{attr.goodAttrVaule}}&nbsp;&nbsp;</span>
          </p>
          <div class="goods-choose">
            <span class="goods-price">
              ￥
              <label>{{item.goodsPrice}}</label>.00
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-info">
      <p>
        <span>订单编号：</span>
        <span>{{orderInfo.orderSn}}</span>
      </p>
      <p>
        <span>下单时间：</span>
        <span>{{orderInfo.orderTime}}</span>
      </p>
      <p>
        <span>支付方式：</span>
        <span>线上支付</span>
      </p>
      <p>
        <span>配送方式：</span>
        <span>普通快递</span>
      </p>
    </div>
    <div class="total-price">
      <p>
        <span>商品金额</span>
        <span>￥{{orderInfo.orderAmount}}.00</span>
      </p>
      <p>
        <span>运费</span>
        <span>+￥0.00</span>
      </p>
    </div>
    <div class="pay-box">
      <span class="cancel" v-if="orderInfo.orderStatus===0" @click="cancel()">取消订单</span>
      <span class="pay" v-if="orderInfo.orderStatus===0" @click="goPay()">去支付</span>
      <span class="pay" v-if="orderInfo.orderStatus===2" @click="confirm()">确认收货</span>
      <span
        class="pay"
        v-if="orderInfo.orderStatus === 5 || orderInfo.orderStatus === -1"
        @click="shopping()"
      >再次购买</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "快递",
      payTime: 1800,
      minute: "30",
      orderInfo: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    init() {
      this.getOrder();
      this.countDown();
    },
    shopping() {
      this.$router.push("/index");
    },
    goPay() {
      this.$router.push(`/common/pay/${this.orderInfo.orderId}`);
    },
    cancel() {
      this.$messagebox.confirm("确认取消订单吗?").then(async () => {
        const res = await this.$api.order.updateOrderInfoById({
          orderId: this.orderInfo.orderId,
          orderStatus: -1
        });
        if (res.code !== 200) {
          this.$messagebox("", "网络异常");
        } else {
          const number = await this.$api.order.getOrderNumber({
            userId: this.userInfo.userId
          });
          if (number.code === 200) {
            this.$store.dispatch("setOrderNumber", number.data);
          }
          this.$router.push("/order/index/-1");
        }
      });
    },
    confirm() {
      this.$messagebox.confirm("确认已经收到货物?").then(async () => {
        const res = await this.$api.order.updateOrderInfoById({
          orderId: this.orderInfo.orderId,
          orderStatus: 5
        });
        if (res.code !== 200) {
          this.$messagebox("", "网络异常");
        } else {
          const number = await this.$api.order.getOrderNumber({
            userId: this.userInfo.userId
          });
          if (number.code === 200) {
            this.$store.dispatch("setOrderNumber", number.data);
          }
          this.$router.push("/order/index/5");
        }
      });
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
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      const res = await this.$api.order.getOrderInfo({ orderId: Number(this.$route.params.id) });
      this.$indicator.close();
      if (res.code !== 200) {
        this.$messagebox("", "网络异常");
        return;
      }
      this.orderInfo = res.data[0];
      console.log(this.orderInfo);
    }
  },
  watch: {
    payTime: function(val) {
      this.minute = parseInt(val / 60);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.billPage {
  width: 100%;
  position: absolute;
  min-height: 100%;
  padding-bottom: 120px;
  header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 480px;
    padding: 50px 4% 0;
    background: linear-gradient(to right, #f20100, #ff4d17);
    border-radius: 0 0 20px 20px;
    .order-status {
      .header-title {
        width: 100%;
        color: #fff;
        font-size: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-font {
          font-size: 36px;
          margin-right: 10px;
        }
      }
      .info {
        text-align: center;
        line-height: 90px;
        font-size: 24px;
        color: #fff;
        span {
          font-size: 32px;
        }
      }
      .order-btn {
        width: 35%;
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        color: #ff0000;
        text-align: center;
        border-radius: 100px;
        font-size: 24px;
        margin: 10px auto;
      }
    }
    .address-box {
      position: absolute;
      left: 0;
      bottom: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 40px 4%;
      display: flex;
      background-color: #fff;
      margin-top: 20px;
      border-radius: 16px;
      .address {
        flex: 1;
        p {
          font-size: 24px;
          color: 262626;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .addres-user {
          font-size: 30px;
          font-weight: bold;
          line-height: 50px;
          margin-bottom: 20px;
        }
      }
      .icon-font {
        font-size: 32px;
        font-weight: bold;
        margin: 10px 20px 0 0;
      }
    }
  }
  .goods-box {
    box-sizing: border-box;
    width: 100%;
    padding: 40px 4%;

    background-color: #fff;
    margin-top: 20px;
    border-radius: 16px;
    .goods-details {
      display: flex;
      .goods-img {
        width: 174px;
        height: 174px;
        margin-right: 20px;
      }
      .goods-description {
        flex: 1;
        overflow: hidden;
        .goods-name {
          font-size: 28px;
          color: #333;
          margin-bottom: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .goods-feature {
          font-size: 24px;
          color: #909090;
          margin-bottom: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .goods-choose {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .goods-price {
            font-size: 24px;
            font-weight: bold;
            color: #f2270c;
            label {
              font-size: 32px;
            }
          }
        }
      }
    }
  }
  .order-info {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 4%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 16px;
    p {
      width: 100%;
      display: flex;
      line-height: 60px;
      font-size: 28px;
      color: #333;
      align-items: center;
      span:first-of-type {
        margin-right: 30px;
      }
      span:last-of-type {
        font-weight: bold;
      }
    }
  }
  .total-price {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 4%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 16px;
    p {
      width: 100%;
      display: flex;
      line-height: 60px;
      font-size: 28px;
      color: #333;
      align-items: center;
      justify-content: space-between;
    }
  }
  .pay-box {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 4%;
    height: 100px;
    width: 100%;
    border-top: 1px solid #f0f0f0; /* no */
    align-items: center;
    justify-content: flex-end;
    span {
      box-sizing: border-box;
      display: inline-block;
      font-size: 24px;
      text-align: center;
      line-height: 60px;
      width: 24%;
      height: 60px;
      border-radius: 100px;
    }
    .cancel {
      border: 1px solid #313030; /* no */
      color: #262626;
    }
    .pay {
      margin-left: 4%;
      background: linear-gradient(to right, #f20100, #ff4d17);
      border-radius: 100px;
      color: #fff;
    }
  }
}
</style>