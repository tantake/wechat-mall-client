<template>
  <div class="billPage">
    <header>
      <mt-radio class="deliveryMethod" title="配送方式" v-model="value" :options="['快递', '自提']"></mt-radio>
    </header>
    <div class="address-box">
      <div class="address">
        <p>{{address.province}}{{address.city}}{{address.county}}</p>
        <p class="addres-details">{{address.details}}</p>
        <p>{{address.name}}&nbsp;&nbsp;{{address.phoneNumber}}</p>
      </div>
      <icon-font icon-class="arrow-right" />
    </div>
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
            <div class="choose-number">
              <p class="btn-number">
                <span class="btn-reduce" @click="reduce">
                  <icon-font icon-class="reduce" />
                </span>
                <span class="number-box">{{goodsInfo.number}}</span>
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
        <span>￥{{goodsInfo.price}}.00</span>
      </p>
      <p>
        <span>运费</span>
        <span>+￥{{goodsInfo.fare}}.00</span>
      </p>
    </div>
    <div class="to-pay">
      <span>
        ￥
        <label>{{totalPrice}}</label>.00
      </span>
      <span class="go-pay">提交订单</span>
    </div>
  </div>
</template>

<script>
import goodsImg from "../../assets/images/520L.jpg";
// import wx from 'weixin-jsapi'
export default {
  data() {
    return {
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
      totalPrice: 8099
    };
  },
  methods: {
    reduce() {
      if (this.goodsInfo.number <= 1) {
        this.goodsInfo.number = 1;
        return;
      }
      this.goodsInfo.number--;
    },
    add() {
      if (this.goodsInfo.number >= this.goodsInfo.saleNumber) {
        this.goodsInfo.number = this.goodsInfo.saleNumber;
        return;
      }
      this.goodsInfo.number++;
    }
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
        font-size: 30px;
        font-weight: bold;
        line-height: 50px;
        margin: 20px 0;
      }
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
    span{
      font-size: 24px;
      text-align: center;
      color: #f2270c;
      font-weight: bold;
      label{
        font-size: 42px;
      }
    }
    .go-pay{
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