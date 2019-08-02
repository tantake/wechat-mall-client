<template>
  <div id="home" class="home">
    <header :style="{backgroundImage: 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')'}">
      <div class="glass-box">
        <img :src="avatar" />
        <p>{{name}}</p>
      </div>
    </header>
    <section>
      <div class="menu">
        <router-link to="/order/index/all">
          <icon-font icon-class="my-order" />
          <span>我的订单</span>
          <icon-font class="arrows" icon-class="arrow-right" />
        </router-link>
      </div>
      <ul>
        <li>
          <router-link to="/order/index/pendingPayment">
            <icon-font icon-class="wait-pay" />
            <p>待付款</p>
          </router-link>
        </li>
        <li>
          <router-link to="/order/index/pendingShip">
            <icon-font icon-class="wait-ship" />
            <p>待发货</p>
          </router-link>
        </li>
        <li>
          <router-link to="/order/index/pendingReceipt">
            <icon-font icon-class="wait-receipt" />
            <p>待收货</p>
          </router-link>
        </li>
        <li>
          <router-link to="/order/index/pendingShip">
            <icon-font icon-class="wait-evaluation" />
            <p>待评价</p>
          </router-link>
        </li>
      </ul>
      <div class="menu">
        <router-link to="/address/index">
          <icon-font icon-class="address" />
          <span>收货地址</span>
        </router-link>
      </div>
      <div class="menu">
        <router-link to="/home/address">
          <icon-font icon-class="contact-us" />
          <span>联系我们</span>
        </router-link>
      </div>
      <div class="menu last-menu">
        <router-link to="/home/address">
          <icon-font icon-class="about-us" />
          <span>关于我们</span>
        </router-link>
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
.home {
  position: absolute;
  width: 100%;
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
      height: 96px;
      box-sizing: border-box;
      font-size: 0;
      line-height: 96px;
      border-bottom: 1px solid #dddddd; /* no */
      a {
        display: block;
        color: #333;
        .icon-font {
          font-size: 36px;
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
}
</style>