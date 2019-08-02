<template>
  <div class="order">
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item id="all">全部</mt-tab-item>
      <mt-tab-item id="pendingPayment">待付款</mt-tab-item>
      <mt-tab-item id="pendingShip">待发货</mt-tab-item>
      <mt-tab-item id="pendingReceipt">待收货</mt-tab-item>
      <mt-tab-item id="pendingEvaluation">待评价</mt-tab-item>
    </mt-navbar>
    <div class="goods-list">
      <div class="pendingPayment-box goods-box" v-for="goods in order" :key="goods.id">
        <p class="goods-box-title">
          <span>壹柯米自营旗舰店</span>
          <span>等待支付</span>
        </p>
        <p class="goods-box-detail" @click="orderDetail(goods.orderId)">
          <img :src="goods.goodsImg" alt />
          <span class="goods-name">{{goods.goodsName}}</span>
          <span class="goods-price">
            ￥
            <label>{{goods.goodsPrice}}</label>.00
          </span>
        </p>
        <p class="goods-box-pay">
          <span @click="pay(goods.orderId)">去支付</span>
        </p>
      </div>
    </div>

    <!-- tab-container -->
    <!-- <mt-tab-container v-model="selected">
      <mt-tab-container-item id="all"></mt-tab-container-item>
      <mt-tab-container-item id="pendingPayment">
       <mt-cell v-for="goods in order" :title="goods.goodsName" :key="goods.id" />
        <div class="pendingPayment-box goods-box" v-for="goods in order" :key="goods.id">
          <p class="goods-box-title">
            <span>壹柯米自营旗舰店</span>
            <span>等待支付</span>
          </p>
          <p class="goods-box-detail" @click="orderDetail(goods.orderId)">
            <img :src="goods.goodsImg" alt />
            <span class="goods-name">{{goods.goodsName}}</span>
            <span class="goods-price">
              ￥
              <label>{{goods.goodsPrice}}</label>.00
            </span>
          </p>
          <p class="goods-box-pay">
            <span @click="pay(goods.orderId)">去支付</span>
          </p>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="pendingReceipt">
        <mt-cell v-for="goods in order" :title="goods.goodsName" :key="goods.id" />
      </mt-tab-container-item>
      <mt-tab-container-item id="completed">
        <mt-cell v-for="goods in order" :title="goods.goodsName" :key="goods.id" />
      </mt-tab-container-item>
    </mt-tab-container>-->
  </div>
</template>

<script>
import img1 from "@/assets/images/520L.jpg";
import img2 from "@/assets/images/520X.jpg";
export default {
  data() {
    return {
      order: [
        {
          orderId: 1,
          goodsImg: img1,
          goodsName: "520L壹柯米yikemill智能门锁方便快捷一握即开限时特价",
          goodsPrice: 1899
        },
        {
          orderId: 2,
          goodsImg: img2,
          goodsName: "520X壹柯米yikemill智能门锁方便快捷一握即开限时特价",
          goodsPrice: 1699
        }
      ],
      selected: "all"
    };
  },
  computed: {},
  methods: {
    init() {
      this.selected = this.$route.params.type;
    },
    pay(orderId) {
      this.$router.push(`/common/pay/${orderId}`);
    },
    orderDetail(orderId) {
      this.$router.push(`/order/unpaidOrder/detail/${orderId}`);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.order {
  width: 100%;
  position: absolute;
  .goods-list {
    width: 100%;
    padding-top: 112px;
    .goods-box {
      box-sizing: border-box;
      width: 100%;
      padding: 40px 4%;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 16px;
      .goods-box-title {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        span:first-of-type {
          font-weight: bold;
        }
        span:last-of-type {
          color: #f23030;
        }
      }
      .goods-box-detail {
        display: flex;
        align-items: center;
        font-size: 28px;
        padding: 20px 0;
        img {
          width: 180px;
          height: 180px;
        }
        .goods-price label {
          font-size: 36px;
        }
        .goods-name {
          margin: 0 30px;
          text-align: justify;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          flex: 1;
        }
      }
      .goods-box-pay {
        text-align: right;
        span {
          font-size: 24px;
          border: 1px solid #f23030; /* no */
          color: #f23030;
          border-radius: 100px;
          padding: 10px 40px;
        }
      }
    }
  }
}
</style>