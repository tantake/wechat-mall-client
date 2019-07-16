<template>
  <div id="index">
    <img :src="product.productImg" class="product-img" />
    <div class="goods-details">
      <p class="title">{{product.title}}</p>
      <p class="price">￥{{product.price}}</p>
    </div>
    <div class="goods-info">
      <span>运费 ￥0.00</span>
      <span>库存 6000</span>
      <span>销量 5000件</span>
    </div>
    <div class="model-choose" @click="sColor">
      <span>已选</span>
      <span class="model-details">黑色，一件</span>
      <span>
        <icon-font icon-class="icon-arrows" />
      </span>
    </div>
    <div class="product-introduce">
      <img :src="product.productIntroduce" />
    </div>
    <footer>
      <div class="shoppingOrCart">
        <span @click="goShopping">
          <icon-font icon-class="menu-index" />
          <br />店铺
        </span>
        <span @click="goCart">
          <icon-font icon-class="menu-car" />
          <br />购物车
        </span>
      </div>
      <div class="join-car" @click="showBuy = true">加入购物车</div>
      <div class="buy-now" @click="showBuy = true">立刻购买</div>
    </footer>
    <div class="choose-type" v-if="showColor">
      <div class="choose-content">
        <span class="close-choose" @click="showColor = false">
          <icon-font icon-class="icon-close" />
        </span>
        <div class="choose-title">
          <div class="choose-imgbox">
            <img src alt="商品图片" />
          </div>
          <div class="choose-product-info">
            <p class="price">￥1999.00</p>
            <p class="inventory">库存1500件</p>
          </div>
        </div>
        <div class="choose-classify">
          <div class="classify-title">颜色</div>
          <div class="color-btn">
            <p
              v-for="(item, index) in colorList"
              :key="index"
              :class="activeColor==index ? 'active color-item':'color-item'"
              @click="chooseColor(item, index)"
            >{{item}}</p>
          </div>
        </div>
        <div class="choose-number">
          <p class="number-title">数量</p>
          <p class="btn-number">
            <span class="btn-reduce" @click="subtract">
              <icon-font icon-class="icon-reduce" />
            </span>
            <span class="btn-ibox">
              {{number}}
            </span>
            <span class="btn-add" @click="number++">
              <icon-font icon-class="icon-add" />
            </span>
          </p>
        </div>
        <div class="c-btn"></div>
        <div class="gobuy" @click="sBuy">立刻购买</div>
      </div>
    </div>
    <div class="buyBox" v-if="showBuy">
      <div class="b-content">
        <i class="iconfont icon-guanbi bgb" @click="showBuy =false"></i>
        <div class="b-title">
          <div class="b-imgbox">
            <img src alt style="width:100%;height:100%" />
          </div>
          <div class="bt-content">
            <p class="bt-price">￥1999.00</p>
            <p class="bt-inventory">库存：1500件</p>
          </div>
        </div>
        <div class="bt-num">
          <p class="btn-word">购买数量</p>
          <p class="btn-NUM">
            <span class="btn-j" @click="subtract">-</span>
            <span class="btn-ibox">
              <input type="text" class="btn-input" :value="num" />
            </span>
            <span class="btn-add" @click="num++">+</span>
          </p>
        </div>
        <div class="buy-btn">
          <p class="sub-btn" @click="byMoney">确认</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productOne from "@/assets/images/520L-details.jpg";
import productTwo from "@/assets/images/520L-introduce.jpg";
export default {
  data() {
    return {
      product: {
        productImg: productOne,
        title: "壹柯米iLock 550X 72小时发货",
        price: "1990.00",
        productIntroduce: productTwo
      },
      number: 1,
      showBuy: false,
      showColor: false,
      activeColor: 0,
      colorList: ["白色", "黑色", "红色", "深空灰", "香槟金"],
      productColor: ""
    };
  },
  methods: {
    subtract() {
      if (this.number <= 1) {
        this.number = 1;
        return;
      }
      this.number--;
    },
    sColor() {
      this.showColor = true;
    },
    goShopping() {
      alert("shouye");
    },
    goCart() {
      alert("cart");
    },
    sBuy() {
      this.showBuy = true;
      this.showColor = false;
    },
    byMoney() {
      this.showBuy = false;
    },
    chooseColor(item, index) {
      this.activeColor = index;
      this.productColor = item;
    }
  },
  created() {
    //  this.$indicator.open()
  }
};
</script>

<style lang="less" scoped>
.product-img {
  display: block;
  width: 100%;
}
@rem : 1 / 41.4rem;

.goods-details {
  text-align: left;
  width: 100%;
  height: 120px;
  padding: 15px 4% 0;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1px solid #bbb;
  .title {
    font-size: 32px;
    line-height: 50px;
    color: #1f1f1f;
  }
  .price {
    font-size: 30px;
    color: #a2313e;
    font-weight: bold;
  }
}
.goods-info {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  font-size: 28px;
  color: #5e5e5e;
  padding: 0 8%;
  box-sizing: border-box;
}
.model-choose {
  padding: 20px 4%;
  box-sizing: border-box;
  display: flex;
  background-color: #fff;
  font-size: 28px;
  color: #333;
  span:first-of-type {
    font-weight: bold;
  }
  .model-details {
    flex: 1;
    margin: 0 40px;
    text-align: justify;
  }
}
.product-introduce {
  img {
    width: 100%;
  }
}
footer {
  width: 100%;
  height: 90px;
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  .shoppingOrCart {
    box-sizing: border-box;
    width: 260px;
    padding: 0 45px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 24px;
      text-align: center;
      .icon-font {
        font-size: 42px;
      }
    }
  }
  .join-car,
  .buy-now {
    flex: 1;
    height: 100%;
    background-color: #75b6b8;
    color: #fff;
    font-size: 32px;
    text-align: center;
    line-height: 90px;
  }
  .join-car {
    background-color: #d88d6f;
  }
}
.choose-type {
  width: 100%;
  height: 100%;
  background-color: rgba(158, 158, 158, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 666;
  .choose-content {
    text-align: left;
    width: 100%;
    background-color: #fff;
    padding: 30px 4%;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
    position: absolute;
    left: 0;
    bottom: 0;
    .close-choose {
      position: absolute;
      right: 25px;
      top: 15px;
      .icon-font {
        font-size: 42px;
      }
    }
    .choose-title {
      width: 100%;
      height: 160px;
      display: flex;
      .choose-imgbox {
        background: red;
        margin-right: 30px;
        border-radius: 12px;
        overflow: hidden;
        img {
          display: block;
          width: 160px;
          height: 160px;
        }
      }
      .choose-product-info {
        flex: 1;
        text-align: left;
        vertical-align: bottom;
        .price {
          color: #a2313e;
          font-weight: bold;
          font-size: 32px;
          margin-bottom: 20px;
        }
        .inventory {
          font-size: 24px;
          color: #5e5e5e;
        }
      }
    }
    .choose-classify {
      padding-top: 40px;
      .classify-title {
        font-size: 24px;
        color: #333;
        font-weight: bold;
        margin-bottom: 30px;
      }
      .color-btn {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: -20px;
        margin-right: -30px;
        .color-item {
          width: 150px;
          height: 50px;
          margin-bottom: 20px;
          margin-right: 30px;
          border-radius: 100px;
          background-color: #f2f2f2;
          color: #333;
          line-height: 50px;
          text-align: center;
          font-size: 24px;
          box-sizing: border-box;
        }
        .color-item.active {
          border: 1px solid #f2270c; /* no */
          color: #f2270c;
          background-color: #fcedeb;
        }
      }
    }
    .choose-number {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 40px;
      .number-title {
        font-size: 24px;
        font-weight: bold;
      }
      .btn-number {
        display: flex;
        align-items: center;
        .btn-reduce {
          color: #2e2d2d;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-font {
            font-size: 24px;
          }
        }
        .btn-add {
          color: #2e2d2d;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-font {
            font-size: 24px;
          }
        }
        .btn-ibox {
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
    .gobuy {
      margin-top: 15 * @rem;
      width: 100%;
      height: 40 * @rem;
      text-align: center;
      line-height: 40 * @rem;
      border-radius: 5 * @rem;
      background-color: #a2313e;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
    }
  }
}
.buyBox {
  text-align: left;
  width: 100%;
  height: 100%;
  background-color: rgba(158, 158, 158, 0.8);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 555;

  .b-content {
    width: 100%;
    background-color: #fff;

    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    .bgb {
      position: absolute;
      right: 15 * @rem;
      top: 15 * @rem;
      width: 24 * @rem;
      height: 24 * @rem;
    }
    .b-title {
      padding: 0 15 * @rem 15 * @rem;
      box-sizing: border-box;
      width: 100%;
      height: 65 * @rem;
      display: flex;
      margin-bottom: 15 * @rem;
      .b-imgbox {
        width: 80 * @rem;
        height: 80 * @rem;
        position: relative;
        top: -15 * @rem;
        left: 0;
        background: red;
        margin-right: 15 * @rem;
        border-radius: 5 * @rem;
        overflow: hidden;
      }
      .bt-content {
        flex: 1;
        .bt-price {
          font-size: 16 * @rem;
          color: #a2313e;
          margin-top: 16 * @rem;
          font-weight: bold;
        }
        .bt-inventory {
          font-size: 12 * @rem;
          margin-top: 5 * @rem;
          color: #9e9e9e;
        }
      }
    }
    .bt-num {
      width: 100%;
      height: 40 * @rem;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15 * @rem;
      .btn-word {
        margin-left: 15 * @rem;
        font-size: 14 * @rem;
      }
      .btn-NUM {
        margin-right: 15 * @rem;
        display: flex;
        align-items: center;
        .btn-j {
          font-size: 20 * @rem;
          width: 20 * @rem;
          height: 20 * @rem;
          border-top-left-radius: 5 * @rem;
          background: #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .btn-add {
          font-size: 20 * @rem;
          width: 20 * @rem;
          height: 20 * @rem;
          border-top-right-radius: 5 * @rem;
          background: #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .btn-ibox {
          width: 40 * @rem;
          height: 20 * @rem;
          margin: 0 4 * @rem;
          background-color: #ccc;
          overflow: hidden;
          .btn-input {
            display: inline-block;
            border: 0;
            background-color: #ccc;
            color: #000;
            outline: none;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 1;
          }
        }
      }
    }
    .buy-btn {
      width: 100%;
      padding: 0 15 * @rem 15 * @rem;
      box-sizing: border-box;
      .sub-btn {
        width: 100%;
        height: 40 * @rem;
        line-height: 40 * @rem;
        text-align: center;
        background-color: #a2313e;
        color: #fff;
        border-radius: 5 * @rem;
        font-size: 18 * @rem;
      }
    }
  }
}

.w100 {
  width: 100%;
  height: 100%;
}

/deep/ .mint-swipe-indicators {
  right: 0 !important;
  left: unset !important;
}
/deep/ .mint-swipe-indicator {
  background-color: #fff;
  border: 1px solid #333;
  // box-sizing: border-box;
}
/deep/ .mint-swipe-indicator.is-active {
  background-color: #333;
  border: 0;
}
</style>