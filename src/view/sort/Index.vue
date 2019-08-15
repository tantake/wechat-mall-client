<template>
  <div id="sort" class="sort">
    <mt-navbar v-model="type">
      <mt-tab-item id="0">全部</mt-tab-item>
      <mt-tab-item id="9">520系列</mt-tab-item>
      <mt-tab-item id="10">530系列</mt-tab-item>
      <mt-tab-item id="11">550系列</mt-tab-item>
      <mt-tab-item id="12">580系列</mt-tab-item>
    </mt-navbar>
    <section class="goods-list">
      <div
        class="goods"
        v-for="(goods, index) in productList"
        :key="index"
        @click="buy(goods.goodsId)"
      >
        <img v-if="goods.goodsAlbum" :src="goods.goodsAlbum.goodsShortPic" class="goods-img" />
        <img v-else :src="goodsImg" class="goods-img" />
        <div class="goods-introduction">
          <p class="goods-name">{{goods.goodsName}}</p>
          <p class="goods-feature">{{goods.goodsSubtitle}}</p>
          <p class="goods-sale">
            <span class="discounted-price">￥{{goods.goodsRetailPrice}}</span>
            <span class="sale-number">已购{{goods.payTotal}}件</span>
            <span class="buy">去购买</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import goodsImg from "@/assets/images/520X.jpg";
export default {
  data() {
    return {
      type: "0",
      productList: [],
      goodsImg: goodsImg
    };
  },
  methods: {
    init() {
      this.getGoodsList();
    },
    async getGoodsList(val) {
      const type = val || this.type;
      console.log("获取" + val);
      try {
        this.$indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        const res = await this.$api.goods.goodsList({ type: Number(type) });
        console.log(res);
        this.productList = res;
        this.$indicator.close();
      } catch (e) {
        console.log("​catch -> e", e);
        this.$indicator.close();
        this.$messagebox("", "网络异常");
      }
    },
    buy(goodsId) {
      this.$router.push(`/common/detail/${goodsId}`);
    }
  },
  watch: {
    type: async function(val) {
      this.getGoodsList(val);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.sort {
  position: absolute;
  width: 100%;
  padding-bottom: 120px;
  .goods-list {
    background-color: #fff;
    margin-top: 20px;
    .goods {
      box-sizing: border-box;
      height: 249px;
      padding: 24px 4%;
      overflow: hidden;
      display: flex;
      border-bottom: 1px solid #d4d4d4; /* no */
      .goods-img {
        display: inline-block;
        width: 200px;
        height: 200px;
        margin-right: 20px;
      }
      .goods-introduction {
        flex: 1;
        position: relative;
        display: inline-block;
        height: 200px;
        overflow: hidden;
        p {
          font-size: 24px;
        }
        .goods-name {
          line-height: 36px;
          font-weight: bold;
        }
        .goods-feature {
          color: #999;
          line-height: 32px;
        }
        .goods-sale {
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
            background-color: #f20100;
            border-radius: 100px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>