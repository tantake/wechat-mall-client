<template>
  <div v-show="$route.meta.navShow==undefined||$route.meta.navShow">
    <ul class="footer">
      <li
        v-for="item in menu"
        :key="item.id"
        :class="{active:item.title === checked}"
        @click="jump(item.ref, item.title)"
      >
        <icon-font :icon-class="item.img" />
        {{item.name}}
        <span v-if="number!==0 && item.title === 'cart'" class="carNumber">{{number}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "index",
      menu: [
        { id: 1, name: "首页", img: "menu-index", ref: "/index", title: "index" },
        { id: 2, name: "分类", img: "menu-sort", ref: "/sort", title: "sort" },
        { id: 3, name: "购物车", img: "menu-car", ref: "/cart", title: "cart" },
        { id: 4, name: "我的", img: "menu-home", ref: "/home", title: "home" }
      ]
    };
  },
  computed: {
    number() {
      return this.$store.getters.cartNumber;
    },
    checked() {
      return this.$store.getters.checkedMenu;
    }
  },
  methods: {
    jump(path, name) {
      this.$router.push(path);
      this.$store.dispatch("setCheckedMenu", name);
    },
  },
  created() {}
};
</script>
<style lang="less" coped>
.footer {
  position: fixed;
  z-index: 99999999;
  display: flex;
  height: 110px;
  width: 100%;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  li {
    flex: 1;
    position: relative;
    display: block;
    box-sizing: border-box;
    padding: 14px 0;
    width: 100%;
    height: 100%;
    font-size: 24px;
    text-align: center;
    color: #333;
    .icon-font {
      font-size: 48px;
      display: block;
      margin: 0 auto 8px;
    }
  }
  .active {
    background-color: #eaeaea;
    color: #26a2ff;
  }
  .carNumber {
    position: absolute;
    top: 5%;
    right: 24%;
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
</style>