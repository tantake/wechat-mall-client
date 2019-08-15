<template>
  <div class="billPage">
    <header>
      <mt-radio class="deliveryMethod" title="配送方式" v-model="value" :options="['快递', '自提']"></mt-radio>
    </header>
    <div class="address-box">
      <div v-if="address.addressId" class="address" @click="chooseAddress">
        <p>{{address.province}}{{address.city}}{{address.district}}</p>
        <p class="addres-details">{{address.address}}</p>
        <p>{{address.uname}}&nbsp;&nbsp;{{address.mobile}}</p>
      </div>
      <div v-else class="address address-no" @click="chooseAddress">
        <icon-font icon-class="address" />
        <span>添加地址</span>
      </div>
      <icon-font icon-class="arrow-right" />
    </div>
    <div class="goods-box" v-for="(item, index) in goodsList" :key="index">
      <div class="goods-details">
        <img :src="item.imgUrl" class="goods-img" alt="tupian" />
        <div class="goods-description">
          <p class="goods-name">{{item.goodsSubtitle}}</p>
          <p class="goods-feature">
            <span v-for="(attr, index) in item.goodsAttr" :key="index">{{attr.type}}:{{attr.value}}，</span>
            {{item.goodsNumber}}件
          </p>
          <p class="goods-price">￥{{item.goodsRetailPrice.toFixed(2)}}</p>
        </div>
      </div>
    </div>
    <div class="total-price">
      <p>
        <span>商品金额</span>
        <span>￥{{totalPrice.toFixed(2)}}</span>
      </p>
      <p>
        <span>运费</span>
        <span>+￥0.00</span>
      </p>
    </div>
    <div class="to-pay">
      <span>
        ￥
        <label>{{totalPrice.toFixed(2)}}</label>
      </span>
      <span class="go-pay" @click="goPay">提交订单</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "订单结算",
      value: "快递",
      address: {},
      goodsList: [],
      order: {},
      totalPrice: 0
    };
  },
  methods: {
    init() {
      this.getAddress();
      this.getGoodsInfo();
    },
    newAddress() {
      alert("选择地址");
    },
    async goPay() {
      const user = this.$store.getters.userInfo;
      this.order.orderAmount = this.totalPrice;
      this.order.deliverMethod = "顺丰";
      this.order.userId = user.userId;
      this.order.addressId = this.address.addressId;
      let list = [];
      this.$lodash.map(this.goodsList, item => {
        list.push({
          goodsId: item.goodsId,
          attrIdList: item.attrIdList,
          goodsNum: item.goodsNumber
        });
      });
      this.order.goodsList = list;
      const res = await this.$api.order.generateOrders(this.order);
      console.log(res);
      if (res.code !== 200) {
        this.$messagebox("提示", "请求失败");
        return false;
      }
      this.$router.push(`/common/pay/${res.data.orderId}`);
    },
    getGoodsInfo() {
      this.goodsList = this.$store.getters.buyGoodsList;
      console.log(this.goodsList);
      this.$lodash.map(this.goodsList, item => {
        this.totalPrice +=
          Number(item.goodsNumber) * Number(item.goodsRetailPrice);
      });
    },
    async getAddress() {
      const addressId = this.$store.getters.shippingAddressId;
      if (addressId === "") {
        try {
          this.$indicator.open({
            text: "加载中...",
            spinnerType: "fading-circle"
          });
          const user = this.$store.getters.userInfo;
          const res = await this.$api.address.addressList({
            userId: user.userId
          });
          console.log(res);
          if (res.length >= 1) {
            const defaultAddress = this.$lodash.filter(
              res,
              arr => arr.isDefault === 1
            );
            if (defaultAddress) {
              this.address = defaultAddress[0];
            } else {
              this.address = res[0];
            }
          }
          console.log(this.address);
          this.$indicator.close();
        } catch (e) {
          this.$indicator.close();
          this.$messagebox("", "网络异常");
          console.log("​catch -> e", e);
        }
      } else {
        try {
          this.$indicator.open({
            text: "加载中...",
            spinnerType: "fading-circle"
          });
          const res = await this.$api.address.getAddressById({
            addressId: addressId
          });
          console.log(res);
          this.address = res;
          this.$indicator.close();
        } catch (e) {
          this.$indicator.close();
          this.$messagebox("", "网络异常");
          console.log("​catch -> e", e);
        }
      }
    },
    chooseAddress() {
      this.$store.dispatch("setBackUrl", "/common/checkOrder");
      this.$router.push("/address/index");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
.billPage {
  width: 100%;
  position: absolute;
  padding-bottom: 120px;
  header {
    box-sizing: border-box;
    width: 100%;
    padding: 0 4%;
    background-color: #fff;
    border-radius: 0 0 16px 16px;
    .deliveryMethod {
      display: flex;
      align-items: center;
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
      @{deep} .mint-radio-label {
        margin-left: 2px;
      }
      @{deep} .mint-radio-input:checked + .mint-radio-core {
        background-color: #f2270c;
        border-color: #f2270c;
      }
      @{deep} .mint-radio-input:checked + .mint-radio-core:after {
        border-color: #fff;
        background-color: transparent;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
      }
      @{deep} .mint-radio-core::after {
        border: 4px solid transparent;
        border-left: 0;
        border-top: 0;
        border-radius: 0px;
        content: " ";
        top: 4px;
        left: 9px;
        position: absolute;
        width: 7px;
        height: 14px;
      }
      @{deep} .mint-radio-input {
        outline: none;
      }
    }
  }
  .address-box {
    box-sizing: border-box;
    width: 100%;
    padding: 40px 4%;
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 16px;
    .address {
      flex: 1;
      p {
        font-size: 24px;
        color: 262626;
      }
      .addres-details {
        font-size: 28px;
        font-weight: bold;
        line-height: 50px;
        margin: 20px 0;
      }
      .icon-font {
        font-size: 40px;
      }
      span {
        font-size: 30px;
        margin-left: 4%;
      }
    }
    .address-no {
      display: flex;
      align-items: center;
    }
    .icon-font {
      font-size: 32px;
      font-weight: bold;
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
        background-color: fefefe;
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
        .goods-price {
          font-size: 30px;
          color: #f2270c;
        }
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
  .to-pay {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 4%;
    height: 100px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 24px;
      text-align: center;
      color: #f2270c;
      font-weight: bold;
      label {
        font-size: 42px;
      }
    }
    .go-pay {
      display: inline-block;
      font-weight: normal;
      width: 230px;
      height: 76px;
      background: linear-gradient(to right, #f20100, #ff4d17);
      border-radius: 100px;
      color: #fff;
      line-height: 76px;
    }
  }
}
</style>