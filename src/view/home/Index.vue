<template>
  <div id="home" class="home">
    <header
      :style="{backgroundImage: 'url(' + (user.headimgurl ? user.headimgurl : baseImg) + ')'}"
    >
      <div class="glass-box">
        <img :src="user.headimgurl ? user.headimgurl : baseImg" />
        <p>{{user.nickname}}</p>
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
          <span v-if="orderNumber.waitPay !== 0" class="wait-pay">{{orderNumber.waitPay}}</span>
          <router-link to="/order/index/0">
            <icon-font icon-class="wait-pay" />
            <p>待付款</p>
          </router-link>
        </li>
        <li>
          <span
            v-if="orderNumber.waitReceipt !== 0"
            class="wait-receipt"
          >{{orderNumber.waitReceipt}}</span>
          <router-link to="/order/index/2">
            <icon-font icon-class="wait-receipt" />
            <p>待收货</p>
          </router-link>
        </li>
        <li>
          <router-link to="/order/index/5">
            <icon-font icon-class="wait-ship" />
            <p>已完成</p>
          </router-link>
        </li>
        <li>
          <router-link to="/order/index/-1">
            <icon-font icon-class="order-cancel" />
            <p>已取消</p>
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
        <a href="http://yikomii.com/mobile/contact.html">
          <icon-font icon-class="contact-us" />
          <span>联系我们</span>
        </a>
      </div>
      <div class="menu">
        <a href="http://yikomii.com">
          <icon-font icon-class="about-us" />
          <span>关于我们</span>
        </a>
      </div>
      <div class="menu last-menu" @click="showLogin = true">
        <a href="#">
          <icon-font icon-class="role" />
          <span>切换角色</span>
          <label>{{roleName}}</label>
        </a>
      </div>
    </section>
    <div v-if="showLogin" class="login-box">
      <div class="login">
        <span @click="showLogin = false" class="login-close">
          <icon-font icon-class="close" />
        </span>
        <p class="login-title">角色切换</p>
        <div class="login-input">
          <label>账号：</label>
          <input v-model="userName" type="text" placeholder="请输入账号" />
        </div>
        <div class="login-input">
          <label>密码：</label>
          <input v-model="passWord" type="password" placeholder="请输入密码" />
        </div>
        <span class="login-btn" @click="login()">切换</span>
      </div>
    </div>
  </div>
</template>

<script>
import userImg from "@/assets/images/user.jpg";
export default {
  data() {
    return {
      user: {},
      baseImg: userImg,
      roleName: "游客",
      showLogin: false,
      userName: "",
      passWord: "",
      orderNumber: {
        waitPay: 0,
        waitReceipt: 0
      }
    };
  },
  methods: {
    init() {
      this.getUserInfo();
      this.getOrderNumber();
    },
    getUserInfo() {
      this.user = this.$store.getters.userInfo;
    },
    async getOrderNumber() {
      const res = await this.$api.order.getOrderNumber({
        userId: this.user.userId
      });
      if (res.code === 200) {
        this.$lodash.assign(this.orderNumber, res.data);
        this.$store.dispatch("setOrderNumber", this.orderNumber);
      } else {
        this.$messagebox("提示", "网络异常");
      }
    },
    async login() {
      if (this.userName !== "" && this.passWord !== "") {
        const res = await this.$api.user.login({
          telephone: this.userName,
          password: this.passWord
        });
        this.roleName = res.roleValue;
        console.log(res);
      } else {
        this.$messagebox("切换角色", "请输入账号和密码");
      }
      this.showLogin = false;
    }
  },
  created() {
    this.init();
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
        label {
          display: block;
          font-size: 28px;
          float: right;
        }
      }
    }
    .last-menu {
      border-bottom: 0;
    }
    ul {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      height: 140px;
      overflow: hidden;
      border-bottom: 1px solid #dddddd; /* no */
      li {
        flex: 1;
        font-size: 0;
        position: relative;
        .wait-pay,
        .wait-receipt {
          position: absolute;
          font-size: 24px;
          top: 5%;
          right: 20%;
          display: inline-block;
          line-height: 40px;
          text-align: center;
          width: 36px;
          height: 36px;
          border-radius: 100%;
          color: #fff;
          background-color: #f2270c;
        }
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
  .login-box {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
      position: relative;
      box-sizing: border-box;
      width: 80%;
      background-color: #fff;
      padding: 20px 10% 40px;
      border-radius: 16px;
      .login-close {
        position: absolute;
        right: 3%;
        top: 3%;
        font-size: 32px;
      }
      .login-title {
        text-align: center;
        font-size: 30px;
        color: #333;
        line-height: 70px;
      }
      .login-input {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 50px 0;
        label {
          font-size: 28px;
          margin-right: 10px;
        }
        input {
          flex: 1;
          outline: none;
          border-bottom: 1px solid #333; /* no */
          font-size: 24px;
        }
      }
      .login-btn {
        display: block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-radius: 100px;
        color: #fff;
        font-size: 24px;
        background: linear-gradient(to right, #f20100, #ff4d17);
      }
    }
  }
}
</style>