<template>
  <div id="index">
    <mt-swipe :auto="4000" ref="swiper">
      <mt-swipe-item class="swiper-item" v-for="(item) in banner" :key="item.id">
        <a :href="item.link">
          <img :src="item.img" ref="banner" />
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <ul>
      <li>
        <icon-font icon-class="icon-checked" />
        <span>官方体验店</span>
      </li>
      <li>
        <icon-font icon-class="icon-checked" />
        <span>无理由退款</span>
      </li>
      <li>
        <icon-font icon-class="icon-checked" />
        <span>24小时服务</span>
      </li>
    </ul>
    <article>
      <icon-font icon-class="icon-horn" />
      <Marquee :textInfo="bulletin" class="marquee"></Marquee>
    </article>
    <section class="recommend-product">
      <p class="section-title">推荐产品</p>
      <div class="product" v-for="(product, index) in recommendedProducts" :key="index">
        <img :src="product.productImg" class="product-img" />
        <div class="product-introduction">
          <p class="product-name">{{product.productName}}</p>
          <p class="product-feature">{{product.productFeature}}</p>
          <p class="product-sale">
            <span class="discounted-price">￥{{product.discountedPrice}}</span>
            <span class="original-price">￥{{product.originalPrice}}</span>
            <span class="sale-number">已购{{product.saleNumber}}件</span>
            <span class="buy">去购买</span>
          </p>
        </div>
      </div>
    </section>
    <div style="height:80px"></div>
  </div>
</template>

<script>
import img1 from "@/assets/images/banner1.jpg";
import img2 from "@/assets/images/banner2.jpg";
import img3 from "@/assets/images/banner3.jpg";
import productOne from "@/assets/images/520L.jpg";
import productTwo from "@/assets/images/520X.jpg";
import Marquee from "../../components/Marquee";
export default {
  data() {
    return {
      banner: [
        { id: 1, title: "banner1", img: img1, link: "#" },
        { id: 2, title: "banner2", img: img2, link: "#" },
        { id: 3, title: "banner3", img: img3, link: "#" }
      ],
      bulletin: "壹柯米科技，专注中国智能锁行业，守护你的安全",
      recommendedProducts: [
        {
          productImg: productOne,
          productName: "520L",
          productFeature: "简约大方，安全可靠",
          discountedPrice: 1299,
          originalPrice: 1399,
          saleNumber: 89
        },
        {
          productImg: productTwo,
          productName: "520X",
          productFeature: "一握即开，带来的不只是方便，还有内在的安全",
          discountedPrice: 1799,
          originalPrice: 1999,
          saleNumber: 159
        }
      ]
    };
  },
  components: {
    Marquee
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 370px;
  .swiper-item a img {
    width: 100%;
  }
}
ul {
  display: flex;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  li {
    flex: 1;
    text-align: center;
    font-size: 24px;
    height: 70px;
    span {
      display: inline-block;
      line-height: 70px;
      vertical-align: middle;
    }
    .icon-font {
      color: #fc2732;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
article,
.recommend-product .product {
  box-sizing: border-box;
  width: 100%;
  padding: 0 4%;
  background-color: #fff;
}
article {
  height: 70px;
  background-color: #fff9ec;
  .icon-font {
    float: left;
    color: #fc2732;
    font-size: 30px;
    margin: 18px 10px 0 0;
  }
}
.recommend-product {
  background-color: #fff;
  margin-top: 20px;
  .section-title {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    border-bottom: 1px solid #d4d4d4; /* no */
  }
  .product {
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