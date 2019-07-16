<template>
  <div id="sort">
    <mt-navbar v-model="type">
      <mt-tab-item id="all">全部</mt-tab-item>
      <mt-tab-item id="520">520系列</mt-tab-item>
      <mt-tab-item id="550">550系列</mt-tab-item>
      <mt-tab-item id="580">580系列</mt-tab-item>
      <mt-tab-item id="other">其他</mt-tab-item>
    </mt-navbar>
    <section class="recommend-product">
      <div class="product" v-for="(product, index) in productList" :key="index" @click="productDetails">
        <img :src="product.productImg" class="product-img" />
        <div class="product-introduction">
          <p class="product-name">{{product.productName}}</p>
          <p class="product-feature">{{product.productFeature}}</p>
          <p class="product-sale">
            <span class="discounted-price">￥{{product.discountedPrice}}</span>
            <span class="sale-number">已购{{product.saleNumber}}件</span>
            <span class="buy">去购买</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import productOne from "@/assets/images/520L.jpg";
import productTwo from "@/assets/images/520X.jpg";
export default {
  data() {
    return {
      type: "all",
      productList: [
        {
          productImg: productOne,
          productName: "520L",
          productFeature: "简约大方，安全可靠",
          discountedPrice: 1299,
          saleNumber: 89
        },
        {
          productImg: productTwo,
          productName: "520X",
          productFeature: "一握即开，带来的不只是方便，还有内在的安全",
          discountedPrice: 1799,
          saleNumber: 159
        }
      ]
    };
  },
  methods: {
    productDetails() {
      this.$router.push("details");
    }
  }
};
</script>

<style lang="less" scoped>
.recommend-product {
  background-color: #fff;
  margin-top: 20px;
  .product {
    box-sizing: border-box;
    height: 249px;
    padding: 24px 4%;
    overflow: hidden;
    display: flex;
    border-bottom: 1px solid #d4d4d4; /* no */
    .product-img {
      display: inline-block;
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }
    .product-introduction {
      flex: 1;
      position: relative;
      display: inline-block;
      height: 200px;
      overflow: hidden;
      p {
        font-size: 24px;
      }
      .product-name {
        line-height: 36px;
        font-weight: bold;
      }
      .product-feature {
        color: #999;
        line-height: 32px;
      }
      .product-sale {
        position: absolute;
        height: 50px;
        width: 100%;
        overflow: hidden;
        line-height: 50px;
        bottom: 0;
        .discounted-price {
          font-size: 28px;
          color: #fc2732;
        }
        .original-price {
          text-decoration: line-through;
        }
        .sale-number {
          color: #999;
          margin-left: 30px;
        }
        .buy {
          position: absolute;
          right: 0;
          top: 0;
          width: 140px;
          height: 50px;
          text-align: center;
          background-color: #75b6b8;
          color: #fff;
        }
      }
    }
  }
}
</style>