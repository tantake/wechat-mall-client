<template>
  <div id="tab-bar" v-show="$route.meta.navShow==undefined||$route.meta.navShow">
    <mt-tabbar v-model="selected" v-show="isShow" fixed class="border-1px-top">
      <mt-tab-item id="index">
        <icon-font icon-class="menu-index" />首页
      </mt-tab-item>
      <mt-tab-item id="sort">
        <icon-font icon-class="menu-sort" />分类
      </mt-tab-item>
      <mt-tab-item id="car">
        <icon-font icon-class="menu-car" />购物车
      </mt-tab-item>
      <mt-tab-item id="home">
        <icon-font icon-class="menu-home" />我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "index"
    };
  },
  computed: {
    isShow: function() {
      return true;
    }
  },
  watch: {
    selected: {
      handler() {
        this.$router.push(`/${this.selected}`);
      }
    }
  }
};
</script>
<style lang="less" coped>
.mint-tab-item-label {
  font-size: 24px;
  .icon-font {
    font-size: 48px;
    display: block;
    margin: 0 auto 8px;
  }
}
</style>