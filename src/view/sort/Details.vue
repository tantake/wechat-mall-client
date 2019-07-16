<template>
  <div id="index">
    <img :src="product.productImg" class="product-img" />
    <div class="goods-details">
      <p class="title">{{product.title}}</p>
      <p class="price">￥{{product.price}}</p>
    </div>
    <div class="goods-Info">
      <span>运费 ￥0.00</span>
      <span>库存 6000</span>
      <span>销量 5000件</span>
    </div>
    <div class="color-box" @click="sColor">
      <div class="color-select">选择</div>
      <div class="color-details">
        <div class="color-size">
          <span>选择 颜色分类，尺寸</span>
          <icon-font icon-class="icon-arrows" @click=" showColor=false" />
        </div>
        <div class="color-type">
          <span class="color-tItem"></span>
          <span class="color-tItem"></span>
          <span class="color-tItems">共2种颜色分类可选</span>
        </div>
      </div>
    </div>
    <div class="body">
      <img :src="product.productIntroduce" />
    </div>
    <footer class="footer">
      <div class="goShopping">
        <span>
          <icon-font icon-class="menu-index" />
          <br />店铺
        </span>
        <span>
          <icon-font icon-class="menu-car" />
          <br />购物车
        </span>
      </div>
      <div class="join-car" @click="showBuy = true">加入购物车</div>
      <div class="buy-now" @click="showBuy = true">立刻购买</div>
    </footer>
    <div class="choose-type" v-if="showColor">
      <div class="c-content">
        <span class="close-choose" @click="showColor = false">
          <icon-font icon-class="icon-close" />
        </span>
        <div class="c-title">
          <div class="c-imgbox">
            <img src alt style="width:100%;height:100%" />
          </div>
          <div class="c-right">
            <p class="price">￥1999.00</p>
            <p class="inventory">库存1500件</p>
            <p class="s-color">选择 颜色</p>
          </div>
        </div>
        <div class="c-classify">颜色 分类</div>
        <div class="c-btn">
          <p :class="active==1?'active btn-item':'btn-item'" @click="active=1">
            <span class="bc-box"></span>
            <span>黑色</span>
          </p>
          <p :class="active==2?'active btn-item':'btn-item'" @click="active=2">
            <span class="bc-box"></span>
            <span>玫瑰金</span>
          </p>
        </div>
        <div class="c-classify">购买数量</div>
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
      num: 1,
      showBuy: false,
      showColor: false,
      active: ""
    };
  },
  methods: {
    subtract() {
      if (this.num <= 1) {
        this.num = 1;
        return;
      }
      this.num--;
    },
    sColor() {
      this.showColor = true;
    },
    sBuy() {
      this.showBuy = true;
      this.showColor = false;
    },
    byMoney() {
      this.showBuy = false;
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
.goods-Info {
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
.color-box {
  padding: 0 4%;
  box-sizing: border-box;
  display: flex;
  background-color: #fff;
  .color-select {
    font-size: 28px;
    color: #9e9e9e;
    margin-right: 15px;
  }
  .color-details {
    flex: 1;
    .color-size {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      color: #1e1e1e;
      padding-right: 10px;
      box-sizing: border-box;
    }
    .color-type {
      display: flex;
      height: 66px;
      margin: 20px 0;
      .color-tItem {
        height: 66px;
        width: 66px;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 15px;
        background-color: #ddd;
      }
      .color-tItems {
        padding: 0 15 * @rem;
        line-height: 40 * @rem;
        font-size: 12 * @rem;
        color: #bbb;
        background-color: #2f2f2f;
        border-radius: 5 * @rem;
      }
    }
  }
}
.body {
  img {
    width: 100%;
  }
}
.footer {
  width: 100%;
  height: 90px;
  display: flex;
  position: fixed;
  bottom: 0;
  .goShopping {
    box-sizing: border-box;
    width: 260px;
    padding: 0 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .c-content {
    .close-choose {
      position: absolute;
      right: 25px;
      top: 15px;
      .icon-font {
        font-size: 42px;
      }
    }
    text-align: left;
    width: 100%;
    background-color: #fff;
    padding: 15 * @rem;
    box-sizing: border-box;
    border-radius: 8 * @rem;
    position: absolute;
    left: 0;
    bottom: 0;
    .c-title {
      width: 100%;
      height: 90 * @rem;
      display: flex;
      .c-imgbox {
        width: 90 * @rem;
        height: 90 * @rem;
        background: red;
        margin-right: 15 * @rem;
        border-radius: 5 * @rem;
        overflow: hidden;
      }
      .c-right {
        flex: 1;
        text-align: left;
        padding-top: 10 * @rem;
        box-sizing: border-box;
        .price {
          color: #a2313e;
          font-weight: bold;
          font-size: 16 * @rem;
          margin-bottom: 10 * @rem;
        }
        .inventory {
          font-size: 12 * @rem;
          color: #5e5e5e;
          margin-bottom: 10 * @rem;
        }
        .s-color {
          font-size: 12 * @rem;
          color: #9e9e9e;
        }
      }
    }
    .c-classify {
      font-size: 14 * @rem;
      color: #9e9e9e;
      margin: 15 * @rem 0;
    }
    .c-btn {
      display: flex;
      flex-wrap: wrap;
      .btn-item {
        width: 80 * @rem;
        height: 30 * @rem;
        margin-right: 15 * @rem;
        border-radius: 3 * @rem;
        background-color: #ccc;
        line-height: 30 * @rem;
        display: flex;
        align-items: center;
        padding: 0 5 * @rem;
        box-sizing: border-box;
        justify-content: space-between;
        .bc-box {
          width: 25 * @rem;
          height: 20 * @rem;
          background: #a2313e;
        }
        span {
          font-size: 24px;
        }
      }
      .btn-item.active {
        border: 1 * @rem solid red;
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