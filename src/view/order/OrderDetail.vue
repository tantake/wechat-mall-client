<template>
  <div class="billPage">
    <header>
      <div class="order-status" v-if="noPay">
        <p class="header-title">
          <icon-font icon-class="order-pay" />等待付款
        </p>
        <p class="info">
          需付款：￥
          <span>{{totalPrice}}</span>
          .00&nbsp;&nbsp;剩余：00小时{{minute}}分钟
        </p>
        <p class="order-btn">去支付</p>
      </div>
      <div class="order-status" v-else-if="sending">
        <p class="header-title">
          <icon-font icon-class="order-send" />等待收货
        </p>
        <p class="info">
          快递已发出，预计<span>2019-08-20</span>以前到底
        </p>
        <p class="order-btn">确认收货</p>
      </div>
      <div class="order-status" v-else>
        <p class="header-title" v-if="closed">
          <icon-font icon-class="order-finished" />已完成
        </p>
        <p class="header-title" v-if="canceled">
          <icon-font icon-class="order-cancel1" />已取消
        </p>
        <p class="info" v-if="closed">
          感谢您的支持
        </p>
        <p class="info" v-if="canceled">
          请再给我一次机会呗~
        </p>
        <p class="order-btn">再次购买</p>
      </div>
      <div class="address-box">
        <icon-font icon-class="address" />
        <div class="address">
          <p class="addres-user">{{address.name}}&nbsp;&nbsp;{{address.phoneNumber}}</p>
          <p>地址:{{address.province}}{{address.city}}{{address.county}}{{address.details}}</p>
        </div>
      </div>
    </header>
    <div class="goods-box">
      <div class="goods-details">
        <img :src="goodsInfo.img" class="goods-img" alt="goodsImg" />
        <div class="goods-description">
          <p class="goods-name">{{goodsInfo.name}}</p>
          <p class="goods-feature">{{goodsInfo.feature}}</p>
          <div class="goods-choose">
            <span class="goods-price">
              ￥
              <label>{{goodsInfo.price}}</label>.00
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-info">
      <p>
        <span>订单编号：</span>
        <span>{{order.id}}</span>
      </p>
      <p>
        <span>下单时间：</span>
        <span>{{order.createAt}}</span>
      </p>
      <p>
        <span>支付方式：</span>
        <span>{{order.payType}}</span>
      </p>
      <p>
        <span>配送方式：</span>
        <span>{{order.courier}}</span>
      </p>
    </div>
    <div class="total-price">
      <p>
        <span>商品金额</span>
        <span>￥{{goodsInfo.price}}.00</span>
      </p>
      <p>
        <span>运费</span>
        <span>+￥{{goodsInfo.fare}}.00</span>
      </p>
    </div>
    <div class="pay-box">
      <span class="cancel">取消订单</span>
      <span class="pay" @click="pay">去支付</span>
    </div>
  </div>
</template>

<script>
import goodsImg from "../../assets/images/520L.jpg";
export default {
  data() {
    return {
      noPay: false,
      sending: false,
      closed: false,
      canceled: true,
      name: "订单结算",
      value: "快递",
      address: {
        id: "123",
        name: "胡卓",
        phoneNumber: "182****7302",
        province: "重庆市",
        city: "市辖区",
        county: "九龙坡区",
        details: "保利狮子湖香樟郡6栋二单元"
      },
      goodsInfo: {
        img: goodsImg,
        name: "Apple iPhone XS MAX (A2104) 64GB 全网通国行正版手机",
        feature: "颜色：银色  版本：公开版",
        price: 8099,
        number: 1,
        saleNumber: 7,
        fare: 0
      },
      order: {
        id: "12345678954126",
        createAt: "2019-07-23 16:00:00",
        payType: "线上支付",
        courier: "普通快递"
      },
      totalPrice: 8099,
      payTime: 1800,
      minute: "30"
    };
  },
  methods: {
    init() {
      this.getOrder();
      this.countDown();
    },
    pay() {
      this.$router.push("/common/pay/123");
    },
    countDown() {
      this.timer = setInterval(() => {
        if (this.payTime > 0) {
          this.payTime--;
        } else {
          clearTimeout(this.timer);
        }
      }, 1000);
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
    span:first-of-type {
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