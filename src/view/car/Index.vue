<template>
  <div id="car" class="car">
    <div class="goods-box">
      <span class="mint-checkbox">
        <input type="checkbox" class="mint-checkbox-input" value="选项A" />
        <span class="mint-checkbox-core"></span>
      </span>
      <div class="goods-details">
        <img
          v-if="goodsInfo.goodsAlbum"
          :src="goodsInfo.goodsAlbum.goodsShortPic"
          class="goods-img"
          alt
        />
        <div class="goods-description">
          <p class="goods-name">{{goodsInfo.goodsSubtitle}}</p>
          <p class="goods-feature">{{buyNowInfo.activeColor}}</p>
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
                <span class="number-box">{{buyNowInfo.number}}</span>
                <span class="btn-add" @click="add">
                  <icon-font icon-class="add" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      car: [{ id: "123", goodsName: "" }]
    };
  }
};
</script>

<style lang="less" scoped>
.car {
  position: absolute;
  width: 100%;
}
</style>