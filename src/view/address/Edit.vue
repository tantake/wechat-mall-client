<template>
  <div class="address">
    <div class="address-box">
      <span class="address-title">收货人</span>
      <input type="text" v-model="this.address.name" />
    </div>
    <div class="address-box">
      <span class="address-title">手机号码</span>
      <input type="text" v-model="this.address.phoneNumber" />
    </div>
    <div class="address-box">
      <span class="address-title">所在地区</span>
      <address-picker :userAddress="address"></address-picker>
    </div>
    <div class="address-box">
      <span class="address-title">详细地址</span>
      <input type="text" v-model="this.address.details" />
    </div>
    <div @click="saveAddress" class="confirm-btn">提交</div>
  </div>
</template>

<script>
import address from "../../components/Address";
export default {
  data() {
    return {
      address: {
        id: "123",
        name: "胡卓",
        phoneNumber: "182****7302",
        province: "重庆市",
        city: "市辖区",
        county: "九龙坡区",
        details: "保利狮子湖香樟郡6栋二单元"
      }
    };
  },
  methods: {
    saveAddress(addressID) {
      console.log(addressID);
      this.$messagebox.alert("成功");
      this.$router.push("/address/index");
    }
  },
  created() {},
  components: {
    "address-picker": address
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
    border-bottom: 1px solid #f0f0f0;/* no */
    .address-title {
      width: 150px;
    }
    input {
      font-weight: bold;
      flex: 1;
    }
  }
  .confirm-btn{
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