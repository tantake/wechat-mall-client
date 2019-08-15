<template>
  <div class="address">
    <div class="address-box">
      <span class="address-title">收货人</span>
      <input type="text" v-model="address.uname" placeholder="请输入收货人姓名" />
    </div>
    <div class="address-box">
      <span class="address-title">手机号码</span>
      <input type="text" v-model="address.mobile" placeholder="请输入手机号码" />
    </div>
    <div class="address-box">
      <span class="address-title">所在地区</span>
      <Address :userAddress="address" @addressPicker="picker"></Address>
    </div>
    <div class="address-box">
      <span class="address-title">详细地址</span>
      <input type="text" v-model="address.address" placeholder="请输入详细地址" />
    </div>
    <div class="address-box">
      <span class="address-title">默认地址</span>
      <mt-switch v-model="isDefault"></mt-switch>
    </div>
    <div @click="saveAddress" class="confirm-btn">提交</div>
  </div>
</template>

<script>
import Address from "../../components/Address";
export default {
  data() {
    return {
      address: {},
      isDefault: false,
      isUpdate: true
    };
  },
  computed: {
    defaultAddres() {
      return this.isDefault ? 1 : 0;
    }
  },
  methods: {
    init() {
      this.getAddress();
    },
    picker(address) {
      this.$lodash.assign(this.address, address)
    },
    async getAddress() {
      let addressId = this.$route.params.id;
      this.isUpdate = addressId !== undefined;
      if (this.isUpdate) {
        try {
          this.$indicator.open({
            text: "加载中...",
            spinnerType: "fading-circle"
          });
          const res = await this.$api.address.getAddressById({
            addressId: addressId
          });
          this.address = res;
          if (this.address.isDefault === 1) {
            this.isDefault = true;
          }
          this.$indicator.close();
        } catch (e) {
          console.log("​catch -> e", e);
          this.address = {};
          this.$indicator.close();
          this.$messagebox("", "网络异常");
        }
      }
    },
    async saveAddress() {
      if (this.isUpdate) {
        try {
          this.$indicator.open({
            text: "加载中...",
            spinnerType: "fading-circle"
          });
          this.address.isDefault = this.defaultAddres;
          console.log(this.address);
          await this.$api.address.updateAddress(this.address);
          this.$indicator.close();
          this.$messagebox("", "更新成功");
          this.$router.push("/address/index");
        } catch (e) {
          console.log("​catch -> e", e);
          this.address = {};
          this.$indicator.close();
          this.$messagebox("", "网络异常");
        }
      } else {
        try {
          this.$indicator.open({
            text: "加载中...",
            spinnerType: "fading-circle"
          });
          this.address.isDefault = this.defaultAddres;
          const user = this.$store.getters.userInfo;
          this.address.userId = user.userId;
          this.address.country = "中国";
          let res = await this.$api.address.addAddress(this.address);
          console.log(res);
          this.$indicator.close();
          this.$messagebox("", "添加成功");
          this.$router.push("/address/index");
        } catch (e) {
          console.log("​catch -> e", e);
          this.address = {};
          this.$indicator.close();
          this.$messagebox("", "网络异常");
        }
      }
    }
  },
  components: {
    Address
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.address {
  box-sizing: border-box;
  padding: 0 4%;
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  .address-box {
    display: flex;
    align-items: center;
    height: 100px;
    font-size: 28px;
    color: #333;
    border-bottom: 1px solid #f0f0f0; /* no */
    .address-title {
      width: 150px;
    }
    input {
      flex: 1;
      color: #555;
    }
  }
  .confirm-btn {
    position: absolute;
    width: 92%;
    height: 76px;
    left: 4%;
    bottom: 40px;
    color: #fff;
    text-align: center;
    line-height: 76px;
    background: linear-gradient(to right, #f20100, #ff4d17);
    font-size: 28px;
    border-radius: 100px;
  }
}
</style>