<template>
  <div id="home">
    <header :style="{backgroundImage: 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')'}">
      <div class="glass-box">
        <img :src="avatar" />
        <p>{{name}}</p>
      </div>
    </header>
    <section>
      <div class="menu">
        <icon-font icon-class="icon-order" />
        <span>我的订单</span>
        <icon-font class="arrows" icon-class="icon-arrows" />
      </div>
      <ul>
        <li>
          <a href>
            <icon-font icon-class="icon-unpaid" />
            <p>待付款</p>
          </a>
        </li>
        <li>
          <a href>
            <icon-font icon-class="icon-notShipped" />
            <p>待发货</p>
          </a>
        </li>
        <li>
          <a href>
            <icon-font icon-class="icon-unreceived" />
            <p>待收货</p>
          </a>
        </li>
        <li>
          <a href>
            <icon-font icon-class="icon-notEvaluated" />
            <p>待评价</p>
          </a>
        </li>
      </ul>
      <div class="menu">
        <icon-font icon-class="icon-address" />
        <span>收货地址</span>
      </div>
      <div class="menu">
        <icon-font icon-class="icon-customerService" />
        <span>联系我们</span>
      </div>
      <div class="menu last-menu">
        <icon-font icon-class="icon-about" />
        <span>关于我们</span>
      </div>
    </section>
    <section></section>
  </div>
</template>

<script>
import userImg from "@/assets/images/user.jpg";
export default {
  data() {
    return {
      avatar: userImg,
      name: "胡卓",
      coverImgUrl: userImg,
      baseImg: userImg
    };
  },
  methods: {
    async banners() {
      try {
        let res = await this.$api.index.banners();

        console.log("​getMatches -> res", res);
      } catch (e) {
        console.log("​catch -> e", e);
      }
    }
  },
  created() {
    this.banners();
  }
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 400px;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  .glass-box {
    width: 100%;
    height: 400px;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    overflow: hidden;
    img {
      display: block;
      position: relative;
      z-index: 1;
      margin: 180px auto 20px;
      width: 124px;
      height: 124px;
      border-radius: 99px;
    }
    p {
      z-index: 1;
      color: white;
      position: relative;
      text-align: center;
      font-size: 32px;
    }
  }
  .glass-box::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    filter: blur(4px); /* no */
  }
  .glass-box::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.25);
  }
}
section {
  box-sizing: border-box;
  background-color: #ffffff;
  width: 100%;
  padding: 0 4%;
  .menu {
    width: 100%;
    padding: 0 10px;
    height: 96px;
    box-sizing: border-box;
    font-size: 0;
    line-height: 96px;
    border-bottom: 1px solid #dddddd; /* no */
    .icon-font {
      font-size: 32px;
      vertical-align: middle;
    }
    .arrows {
      float: right;
      margin-top: 32px;
    }
    span {
      display: inline-block;
      font-size: 28px;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .last-menu {
    border-bottom: 0;
  }
  ul {
    box-sizing: border-box;
    width: 100%;
    height: 140px;
    overflow: hidden;
    border-bottom: 1px solid #dddddd; /* no */
    li {
      width: 25%;
      float: left;
      font-size: 0;
      .icon-font {
        font-size: 50px;
        margin-bottom: 15px;
      }
      a {
        display: inline-block;
        margin-top: 23px;
        width: 100%;
        text-align: center;
        color: #2c3e50;
        .incon-font {
          font-size: 60px;
        }
        p {
          font-size: 24px;
        }
      }
    }
  }
}
</style>