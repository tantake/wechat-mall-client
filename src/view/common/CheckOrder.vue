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
    <div class="goods-box">
      <div class="goods-details">
        <img
          v-if="goodsInfo.goodsAlbum"
          :src="goodsInfo.goodsAlbum.goodsShortPic"
          class="goods-img"
          alt
        />
        <div class="goods-description">
          <p class="goods-name">{{goodsInfo.goodsSubtitle}}</p>
          <p class="goods-feature">{{goodsInfo.color}}</p>
          <div class="goods-choose">
            <span class="goods-price">
              ￥
              <label>{{parseInt(goodsInfo.goodsRetailPrice)}}</label>
              .{{goodsPriceDecimal}}
            </span>
            <div class="choose-number">
              <p class="btn-number">
                <span class="btn-reduce" @click="reduce">
                  <icon-font icon-class="reduce" />
                </span>
                <span class="number-box">{{number}}</span>
                <span class="btn-add" @click="add">
                  <icon-font icon-class="add" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total-price">
      <p>
        <span>商品金额</span>
        <span>￥{{orderPrice}}</span>
      </p>
      <p>
        <span>运费</span>
        <span>+￥{{shipAmountPrice}}</span>
      </p>
    </div>
    <div class="to-pay">
      <span>
        ￥
        <label>{{parseInt(totalPrice)}}</label>
        .{{orderPriceDecimal}}
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
      goodsInfo: {
        goodsRetailPrice: 0,
        shipAmount: 0
      },
      number: 0,
      totalPrice: 0
    };
  },
  computed: {
    orderPriceDecimal() {
      return (this.totalPrice.toFixed(2) + "").split(".")[1];
    },
    goodsPriceDecimal() {
      return (this.goodsInfo.goodsRetailPrice.toFixed(2) + "").split(".")[1];
    },
    orderPrice() {
      return this.totalPrice.toFixed(2);
    },
    shipAmountPrice() {
      return this.goodsInfo.shipAmount.toFixed(2);
    }
  },
  methods: {
    init() {
      this.getAddress();
      this.getGoodsInfo();
    },
    newAddress() {
      alert("选择地址");
    },
    reduce() {
      if (this.number <= 1) {
        this.number = 1;
        return;
      }
      this.number--;
      this.totalPrice = this.number * this.goodsInfo.goodsRetailPrice;
    },
    add() {
      if (this.number >= this.goodsInfo.saleNumber) {
        this.number = this.goodsInfo.saleNumber;
        return;
      }
      this.number++;
      this.totalPrice = this.number * this.goodsInfo.goodsRetailPrice;
    },
    goPay() {
      this.$router.push("/common/pay/123");
    },
    getGoodsInfo() {
      this.goodsInfo = this.$store.getters.buyNowGoodsInfo;
      this.number = this.goodsInfo.number;
      this.totalPrice = this.goodsInfo.number * this.goodsInfo.goodsRetailPrice;
      console.log(this.goodsInfo);
    },
    async getAddress() {
      try {
        this.$indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        const res = await this.$api.address.addressList({ userId: "1" });
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
    },
    chooseAddress() {
      this.$store.dispatch("setBackUrl", "/common/checkOrder");
      this.$router.push('/address/index');
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
  header {
    box-sizing: border-box;
    width: 100%;
    padding: 0 4%;
    background-color: #fff;
    border-radius: 0 0 16px 16px;
    .deliveryMethod {
      display: flex;
      align-items: center;
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
        margin-left: 2px;
      }
      /deep/.mint-radio-input:checked + .mint-radio-core {
        background-color: #f2270c;
        border-color: #f2270c;
      }
      /deep/.mint-radio-input:checked + .mint-radio-core:after {
        border-color: #fff;
        background-color: transparent;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
      }
      /deep/.mint-radio-core::after {
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
      /deep/.mint-radio-input {
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
        background-color: #f2270c;
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
          .choose-number {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .btn-number {
              display: flex;
              align-items: center;
              .btn-reduce {
                color: #2e2d2d;
                display: flex;
                .icon-font {
                  font-size: 24px;
                }
              }
              .btn-add {
                color: #2e2d2d;
                display: flex;
                .icon-font {
                  font-size: 24px;
                }
              }
              .number-box {
                width: 90px;
                height: 50px;
                line-height: 50px;
                margin: 0 20px;
                font-size: 24px;
                text-align: center;
                background-color: #f2f2f2;
              }
            }
          }
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