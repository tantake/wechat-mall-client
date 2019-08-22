<template>
  <div class="order">
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item id="all">全部</mt-tab-item>
      <mt-tab-item id="0">
        <span v-if="orderNumber.waitPay !== 0&&orderNumber.waitPay !== undefined" class="wait-pay">{{orderNumber.waitPay}}</span>待付款
      </mt-tab-item>
      <mt-tab-item id="2">
        <span v-if="orderNumber.waitReceipt !== 0&&orderNumber.waitReceipt !== undefined" class="wait-receipt">{{orderNumber.waitReceipt}}</span>待收货
      </mt-tab-item>
      <mt-tab-item id="5">已完成</mt-tab-item>
      <mt-tab-item id="-1">已取消</mt-tab-item>
    </mt-navbar>

    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="scroll-box"
    >
      <li v-for="item in order" :key="item.orderId">
        <div class="goods-list">
          <div class="pendingPayment-box goods-box">
            <div
              class="goods-box-detail"
              @click="orderDetail(item.orderId)"
              v-for="(goods, index) in item.goodsList"
              :key="index"
            >
              <img :src="goods.imgUrl" alt />
              <div class="goods-detail">
                <p class="goods-name">{{goods.goodsName}}</p>
                <p class="goods-type">
                  <span
                    v-for="(attr, index) in goods.goodsAttrList"
                    :key="index"
                  >{{attr.goodAttrVaule}}&nbsp;&nbsp;</span>
                </p>
                <p class="goods-price">
                  <span>￥{{goods.goodsPrice}}</span>
                  <span class="goods-number">x{{goods.goodsNum}}</span>
                </p>
              </div>
            </div>
            <div class="operating-box">
              <p v-if="item.orderStatus === 0" class="order-status">
                <span class="status">待付款</span>
                <span class="info">
                  需付款
                  <label>￥{{item.orderAmount}}</label>
                </span>
              </p>
              <p v-else-if="item.orderStatus === 2" class="order-status">
                <span class="status">待收货</span>
                <span class="info">快递已寄出，请注意查收</span>
              </p>
              <p v-else-if="item.orderStatus === 5" class="order-status">
                <span class="status">已完成</span>
                <span class="info">查看详情</span>
              </p>
              <p v-else-if="item.orderStatus === -1" class="order-status">
                <span class="status">已取消</span>
                <span class="info">查看详情</span>
              </p>
              <p class="btn-box">
                <span
                  v-if="item.orderStatus === 0"
                  @click="cancelOrder(item.orderId)"
                  class="cancel"
                >取消订单</span>
                <span v-if="item.orderStatus === 0" @click="pay(item.orderId)" class="confirm">去支付</span>
                <span
                  v-if="item.orderStatus === 2"
                  @click="confirmOrder(item.orderId)"
                  class="confirm"
                >确认收货</span>
                <span
                  class="confirm"
                  v-if="item.orderStatus === 5 || item.orderStatus === -1"
                  @click="shopping()"
                >再次购买</span>
              </p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="loading-box" v-if="isLoading">
          <mt-spinner color="#26a2ff" type="fading-circle" :size="30"></mt-spinner>
          <span class="loading-more">加载中...</span>
        </div>
      </li>
      <li class="no-order" v-if="noOrder">
        <img :src="noImg" alt />
        <span>您还没有相关订单</span>
      </li>
      <li class="no-more" v-if="noMore">
        <span>没有更多啦~</span>
      </li>
    </ul>
  </div>
</template>

<script>
import noOrder from "@/assets/images/no-order.png";
export default {
  data() {
    return {
      order: [],
      selected: "",
      loading: true,
      isLoading: false,
      noOrder: false,
      noMore: false,
      pageSize: 10,
      pageIndex: 1,
      noImg: noOrder
    };
  },
  watch: {
    selected: function() {
      this.loading = true;
      this.noMore = false;
      this.noOrder = false;
      this.pageIndex = 1;
      this.order = [];
      this.getOrderByStatus();
    }
  },
  computed: {
    orderNumber() {
      return this.$store.getters.orderNumber;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    init() {
      this.selected = this.$route.params.type;
    },
    pay(orderId) {
      this.$router.push(`/common/pay/${orderId}`);
    },
    shopping() {
      this.$router.push("/index");
    },
    cancelOrder(orderId) {
      this.$messagebox.confirm("确认取消订单吗?").then(async () => {
        const res = await this.$api.order.updateOrderInfoById({
          orderId: orderId,
          orderStatus: -1
        });
        if (res.code !== 200) {
          this.$messagebox("", "网络异常");
        } else {
          this.selected = "-1";
          const number = await this.$api.order.getOrderNumber({
            userId: this.userInfo.userId
          });
          if (number.code === 200) {
            this.$store.dispatch("setOrderNumber", number.data);
            console.log(this.orderNumber);
          }
        }
      });
    },
    confirmOrder(orderId) {
      this.$messagebox.confirm("确认已经收到货物?").then(async () => {
        const res = await this.$api.order.updateOrderInfoById({
          orderId: orderId,
          orderStatus: 5
        });
        if (res.code !== 200) {
          this.$messagebox("", "网络异常");
        } else {
          this.selected = "5";
          const number = await this.$api.order.getOrderNumber({
            userId: this.userInfo.userId
          });
          if (number.code === 200) {
            this.$store.dispatch("setOrderNumber", number.data);
          }
        }
      });
    },
    orderDetail(orderId) {
      this.$router.push(`/order/detail/${orderId}`);
    },
    async getOrderByStatus() {
      console.log(this.pageIndex);
      this.isLoading = true;
      let res;
      if (this.selected === "all") {
        res = await this.$api.order.getOrderInfo({
          userId: this.userInfo.userId,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        });
      } else {
        res = await this.$api.order.getOrderInfo({
          userId: this.userInfo.userId,
          orderStatus: Number(this.selected),
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        });
      }
      if (res.code === 200) {
        if (res.data.length > 0) {
          this.order = this.$lodash.concat(this.order, res.data);
          console.log(this.order);
          this.pageIndex++;
          this.loading = false;
        } else if (res.data.length === 0 && this.pageIndex > 1) {
          this.noMore = true;
          this.loading = true;
        } else if (this.order.length === 0 && this.pageIndex === 1) {
          this.noOrder = true;
          this.loading = true;
        } else {
          this.loading = true;
        }
        this.isLoading = false;
      } else {
        this.$messagebox("提示", "网络异常");
      }
    },
    loadMore() {
      this.loading = true;
      this.getOrderByStatus();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
.order {
  width: 100%;
  height: 100%;
  position: absolute;
  @{deep} .mint-tab-item {
    position: relative;
  }
  .wait-pay,
  .wait-receipt {
    position: absolute;
    font-size: 20px;
    top: 10%;
    right: 10%;
    display: inline-block;
    line-height: 40px;
    text-align: center;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    color: #fff;
    background-color: #f2270c;
  }
  .scroll-box {
    position: absolute;
    top: 112px;
    width: 100%;
    height: calc(100% - 112px);
    overflow-y: scroll;
    .goods-box {
      box-sizing: border-box;
      width: 100%;
      padding: 20px 4% 0;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 16px;
      .goods-box-detail {
        display: flex;
        align-items: center;
        padding: 20px 0;
        width: 100%;
        border-bottom: 1px solid #efefef; /* no */
        img {
          width: 180px;
          height: 180px;
          background-color: #f23030;
          margin-right: 10px;
        }
        .goods-detail {
          flex: 1;
          height: 180px;
          overflow: hidden;
          font-size: 0;
          box-sizing: border-box;
          padding: 10px 0;
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .goods-name {
            font-size: 30px;
            color: #333;
          }
          .goods-type {
            color: #5d5d5d;
            font-size: 28px;
            margin: 30px 0;
          }
          .goods-price {
            display: flex;
            justify-content: space-between;
            font-size: 30px;
            color: #333;
          }
        }
      }
      .goods-box-detail:last-of-type {
        border-bottom: 0;
      }
      .operating-box {
        width: 100%;
        .order-status {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          .status {
            font-size: 30px;
            color: #f23030;
          }
          .info {
            color: #5e5e5e;
            font-size: 30px;
            label {
              color: #f23030;
            }
          }
        }
        .btn-box {
          border-top: 1px solid #efefef; /* no */
          padding: 20px 0;
          text-align: right;
          font-size: 0;
          span {
            display: inline-block;
            box-sizing: border-box;
            margin-left: 20px;
            font-size: 24px;
            width: 140px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            border-radius: 16px;
          }
          .confirm {
            background-color: #f23030;
            color: #fff;
          }
          .cancel {
            border: 1px solid #757575; /* no */
            color: #333;
          }
        }
      }
    }
    .loading-box {
      display: flex;
      padding: 20px 0;
      justify-content: center;
      align-items: center;
      .loading-more {
        font-size: 30px;
        margin-left: 20px;
      }
    }
    .no-order {
      width: 100%;
      text-align: center;
      color: #5e5e5e;
      font-size: 28px;
      img {
        display: block;
        width: 40%;
        margin: 40px auto 10px;
      }
    }
    .no-more {
      padding: 20px 0;
      text-align: center;
      font-size: 28px;
    }
  }
}
</style>