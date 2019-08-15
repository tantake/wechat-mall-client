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
      <span>运费 ￥0.00</span>
      <span>库存 999件</span>
      <span>销量 5000件</span>
    </div>
    <div class="model-choose" @click="chooseProductModel">
      <span class="title">已选</span>
      <p class="model-details">
        <span v-for="item in checkedAttr" :key="item.goodAttrId">{{item.attrName}}:{{item.goodAttrVaule}}，</span>
        {{goodsNumber}}件
      </p>
      <span class="icon">
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
          <label v-if="carNumber !== 0">{{carNumber}}</label>
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
            <p class="inventory">库存999件</p>
          </div>
        </div>
        <div
          class="choose-classify"
          v-for="(type, typeIndex) in goodsDetail.attrList"
          :key="type.attrId"
        >
          <div class="classify-title">{{type.attrName}}</div>
          <div class="color-btn">
            <p
              v-for="attr in type.goodsAttrList"
              :key="attr.goodAttrId"
              :class="checkedAttrId[typeIndex]===attr.goodAttrId ? 'active color-item':'color-item'"
              @click="chooseModel(attr, typeIndex)"
            >{{attr.goodAttrVaule}}</p>
          </div>
        </div>
        <div class="choose-number">
          <p class="number-title">数量</p>
          <p class="btn-number">
            <span class="btn-reduce" @click="reduce">
              <icon-font icon-class="reduce" />
            </span>
            <span class="number-box">{{goodsNumber}}</span>
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
      showChoose: false,
      chooseType: "",
      productColor: "",
      checkedAttr: [],
      checkedAttrId: [],
      goodsNumber: 1,
      carInfo: {}
    };
  },
  computed: {
    carNumber() {
      return this.$store.getters.cartNumber;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    }
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
      this.showChoose = true;
      this.chooseType = "joinCart";
    },
    getCarInfo() {
      this.carInfo.userId = this.userInfo.userId;
      this.carInfo.attrIdList = this.checkedAttrId;
      this.carInfo.goodsId = this.goodsDetail.goodsId;
      this.carInfo.goodsNumber = this.goodsNumber;
      this.carInfo.goodsRetailPrice = this.goodsDetail.goodsRetailPrice;
      this.carInfo.goodsName = this.goodsDetail.goodsName;
      this.carInfo.goodsSn = this.goodsDetail.goodsSn;
      this.carInfo.imgUrl = this.goodsDetail.goodsAlbum.goodsShortPic;
      this.carInfo.selected = 0;
    },
    buyNow() {
      this.showChoose = true;
      this.chooseType = "buyNow";
    },
    goShopping() {
      this.$router.push("/index");
      this.$store.dispatch("setCheckedMenu", "index");
    },
    goCart() {
      this.$router.push("/cart");
      this.$store.dispatch("setCheckedMenu", "cart");
    },
    chooseModel(item, index) {
      this.checkedAttrId.splice(index, 1, item.goodAttrId);
      this.checkedAttr[index].goodAttrVaule = item.goodAttrVaule;
    },
    reduce() {
      if (this.goodsNumber <= 1) {
        this.goodsNumber = 1;
        return;
      }
      this.goodsNumber--;
    },
    add() {
      this.goodsNumber++;
    },
    finishChoose(type) {
      if (type === "joinCart") {
        this.getCarInfo();
        this.$api.goods.joinCar(this.carInfo).then(data => {
          console.log(data);
        });
        this.$store.dispatch("setCartNumber", this.carNumber + 1);
        this.showChoose = false;
      }
      if (type === "buyNow") {
        let goodsList = [];
        let goods = {
          goodsName: this.goodsDetail.goodsName,
          goodsSubtitle: this.goodsDetail.goodsSubtitle,
          goodsId: this.goodsDetail.goodsId,
          attrIdList: this.checkedAttrId,
          goodsAttr: this.checkedAttr,
          goodsNumber: this.goodsNumber,
          imgUrl: this.goodsDetail.goodsAlbum.goodsShortPic,
          goodsRetailPrice: this.goodsDetail.goodsRetailPrice
        };
        goodsList.push(goods);
        this.$store.dispatch("setBuyGoodsList", goodsList);
        this.$router.push("/common/checkOrder");
      }
    },
    async getGoodsInfo() {
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      const res = await this.$api.goods.goodsDetail({
        goodsId: this.$route.params.id
      });
      this.$indicator.close();
      if (res.code !== 200) {
        this.$messagebox("", "网络异常");
        return;
      }
      this.goodsDetail = res.data[0];
      this.$lodash.map(this.goodsDetail.attrList, (item, index) => {
        this.checkedAttr[index] = {
          attrName: item.attrName,
          goodAttrVaule: item.goodsAttrList[0].goodAttrVaule
        };
        this.checkedAttrId.push(item.goodsAttrList[0].goodAttrId);
      });
      console.log(this.goodsDetail);
      console.log(this.checkedAttr);
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
  min-height: 100%;
  .product-img {
    display: block;
    width: 100%;
    height: 750px;
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
      color: #f2270c;
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
    width: 100%;
    overflow: hidden;
    padding: 20px 4%;
    box-sizing: border-box;
    display: flex;
    background-color: #fff;
    font-size: 0;
    color: #333;
    .title,
    .icon {
      font-size: 28px;
    }
    .title {
      font-weight: bold;
    }
    .model-details {
      flex: 1;
      font-size: 28px;
      margin: 0 40px;
      overflow: hidden;
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
        position: relative;
        font-size: 24px;
        text-align: center;
        .icon-font {
          font-size: 42px;
        }
      }
      label {
        position: absolute;
        top: -10px;
        right: -10%;
        display: inline-block;
        line-height: 40px;
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        color: #fff;
        background-color: #f2270c;
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
            color: #f2270c;
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