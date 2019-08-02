<template>
  <div class="product-details">
    <img
      v-if="goodsDetail.goodsAlbum && goodsDetail.goodsAlbum.goodsMainPic"
      :src="goodsDetail.goodsAlbum.goodsMainPic"
      alt="商品图片"
      class="product-img"
    />
    <div class="goods-details">
      <p class="title">{{goodsDetail.goodsName}}</p>
      <p class="price">￥{{goodsDetail.goodsRetailPrice}}</p>
    </div>
    <div class="goods-info">
      <span>运费 ￥{{goodsDetail.shipAmount}}.00</span>
      <span>库存 {{goodsDetail.goodsStock}}件</span>
      <span>销量 5000件</span>
    </div>
    <div class="model-choose" @click="chooseProductModel">
      <span>已选</span>
      <span class="model-details">{{buyNowInfo.activeColor}}，{{buyNowInfo.number}}件</span>
      <span>
        <icon-font icon-class="arrow-right" />
      </span>
    </div>
    <div class="product-introduce">
      <img v-if="goodsDetail.goodsAlbum" :src="goodsDetail.goodsAlbum.goodsLongPic" />
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
      <div class="join-car" @click="joinCart">加入购物车</div>
      <div class="buy-now" @click="buyNow">立刻购买</div>
    </footer>
    <div class="choose-box" v-if="showChoose">
      <div class="choose-content">
        <span class="close-choose" @click="showChoose = false">
          <icon-font icon-class="close" />
        </span>
        <div class="choose-title">
          <div class="choose-imgbox">
            <img
              v-if="goodsDetail.goodsAlbum"
              :src="goodsDetail.goodsAlbum.goodsShortPic"
              alt="商品图片"
            />
          </div>
          <div class="choose-product-info">
            <p class="price">￥{{goodsDetail.goodsRetailPrice}}</p>
            <p class="inventory">库存{{goodsDetail.goodsStock}}件</p>
          </div>
        </div>
        <div class="choose-classify">
          <div class="classify-title">颜色</div>
          <div class="color-btn">
            <p
              v-for="(item, index) in goodsDetail.attrVal"
              :key="index"
              :class="buyNowInfo.color===item ? 'active color-item':'color-item'"
              @click="chooseColor(item)"
            >{{item}}</p>
          </div>
        </div>
        <div class="choose-number">
          <p class="number-title">数量</p>
          <p class="btn-number">
            <span class="btn-reduce" @click="reduce">
              <icon-font icon-class="reduce" />
            </span>
            <span class="number-box">{{buyNowInfo.number}}</span>
            <span class="btn-add" @click="add">
              <icon-font icon-class="add" />
            </span>
          </p>
        </div>
        <div></div>
        <div
          v-if="chooseType !== 'choose'"
          class="finish-choose"
          @click="finishChoose(chooseType)"
        >确认</div>
        <div v-if="chooseType === 'choose'" class="choose-buy-or-join">
          <p @click="finishChoose('joinCart')" class="cart">加入购物车</p>
          <p @click="finishChoose('buyNow')" class="buy">立即购买</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsDetail: {},
      number: 1,
      showChoose: false,
      chooseType: "",
      productColor: "",
      buyNowInfo: {
        color: "",
        number: 1,
      }
    };
  },
  methods: {
    init() {
      this.getGoodsInfo();
    },
    chooseProductModel() {
      this.showChoose = true;
      this.chooseType = "choose";
    },
    joinCart() {
      alert("购物车功能暂未开放");
      /* this.showChoose = true;
      this.chooseType = "joinCart"; */
    },
    buyNow() {
      this.showChoose = true;
      this.chooseType = "buyNow";
    },
    goShopping() {
      this.$router.push("/index");
    },
    goCart() {
      alert("购物车功能暂未开放");
    },
    chooseColor(item) {
      this.buyNowInfo.color = item;
    },
    reduce() {
      if (this.buyNowInfo.number <= 1) {
        this.buyNowInfo.number = 1;
        return;
      }
      this.buyNowInfo.number--;
    },
    add() {
      if (this.buyNowInfo.number >= this.goodsDetail.goodsStock) {
        this.buyNowInfo.number = this.goodsDetail.goodsStock;
        return;
      }
      this.buyNowInfo.number++;
    },
    finishChoose(type) {
      if (type === "joinCart") {
        // this.showChoose = false;
        alert("购物车功能暂未开放");
      }
      if (type === "buyNow") {
        this.$store.dispatch("setBuyNowGoodsInfo", this.buyNowInfo);
        this.$router.push(`/common/checkOrder/${this.goodsDetail.goodsId}`);
      }
    },
    async getGoodsInfo() {
      try {
        this.$indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        const res = await this.$api.goods.goodsDetail({
          goodsId: this.$route.params.id
        });
        this.goodsDetail = res;
        this.$lodash.assign(this.buyNowInfo, this.goodsDetail);
        console.log(this.buyNowInfo);
        this.buyNowInfo.activeColor = this.goodsDetail.attrVal[0];
        this.$indicator.close();
      } catch (e) {
        this.$indicator.close();
        this.$messagebox("", "网络异常");
        console.log("​catch -> e", e);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.product-details {
  position: absolute;
  width: 100%;
  .product-img {
    display: block;
    width: 100%;
    height: 750px;
    background-color: red;
  }
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
    align-items: center;
    background-color: #fff;
    font-size: 28px;
    color: #333;
    span {
      display: flex;
    }
    span:first-of-type {
      font-weight: bold;
    }
    .model-details {
      flex: 1;
      margin: 0 40px;
      text-align: justify;
    }
    .icon-font {
      font-size: 32px;
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
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 90px;
    }
    .join-car {
      background: linear-gradient(to right, #f20100, #ff4d17);
    }
    .buy-now {
      background: linear-gradient(to right, #ffa600, #ffbc00);
    }
  }
  .choose-box {
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
      .finish-choose {
        width: 100%;
        height: 76px;
        margin-top: 40px;
        border-radius: 100px;
        text-align: center;
        line-height: 76px;
        background: linear-gradient(to right, #f20100, #ff4d17);
        color: #fff;
        font-size: 28px;
      }
      .choose-buy-or-join {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 76px;
        margin-top: 40px;
        border-radius: 100px;
        text-align: center;
        color: #fff;
        font-size: 28px;
        p {
          width: 48.5%;
          line-height: 76px;
          border-radius: 100px;
        }
        .cart {
          background: linear-gradient(to right, #f20100, #ff4d17);
        }
        .buy {
          background: linear-gradient(to right, #ffa600, #ffbc00);
        }
      }
    }
  }
}
</style>