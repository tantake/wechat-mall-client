<template>
  <div class="address-picker">
    <p @click="isShow = true" class="address-details">{{province}}{{city}}{{county}}</p>
    <div v-show="isShow" class="picker-box">
      <div class="picker-city">
        <p class="confirm-btn" @click="isShow = false">确定</p>
        <mt-picker :slots="addressSlots" @change="AddressChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import address from "../assets/city.json";
export default {
  name: "",
  props: {
    userAddress: Object
  },
  data() {
    return {
      isShow: false,
      addressSlots: [],
      province: "",
      city: "",
      county: ""
    };
  },
  created() {
    // console.log(Object.keys(address));
  },
  methods: {
    AddressChange(picker, values) {
      if (address[values[0]]) {
        picker.setSlotValues(1, Object.keys(address[values[0]]));
        picker.setSlotValues(2, address[values[0]][values[1]]);
        this.province = values[0];
        this.city = values[1];
        this.county = values[2];
      }
    },
    pickerInit() {}
  },
  mounted() {
    this.$nextTick(() => {
      if (this.userAddress) {
        let province = this.userAddress.province;
        let city = this.userAddress.city;
        let county = this.userAddress.county;
        this.province = province;
        this.city = city;
        this.county = county;
        this.addressSlots = [
          {
            flex: 1,
            defaultIndex: Object.keys(address).indexOf(province),
            values: Object.keys(address),
            className: "slot1",
            textAlign: "center",
            fontSize: "15px"
          },
          {
            divider: true,
            content: "-",
            className: "slot2"
          },
          {
            flex: 1,
            defaultIndex: Object.keys(address[province]).indexOf(city),
            values: Object.keys(address[province]),
            className: "slot3",
            textAlign: "center"
          },
          {
            divider: true,
            content: "-",
            className: "slot4"
          },
          {
            flex: 1,
            defaultIndex: address[province][city].indexOf(county),
            values: address[province][city],
            className: "slot5",
            textAlign: "center"
          }
        ];
      } else {
        this.addressSlots = [
          {
            flex: 1,
            defaultIndex: 0,
            values: Object.keys(address),
            className: "slot1",
            textAlign: "center",
            fontSize: "15px"
          },
          {
            divider: true,
            content: "-",
            className: "slot2"
          },
          {
            flex: 1,
            defaultIndex: 0,
            values: Object.keys(address["北京市"]),
            className: "slot3",
            textAlign: "center"
          },
          {
            divider: true,
            content: "-",
            className: "slot4"
          },
          {
            flex: 1,
            defaultIndex: 0,
            values: address["北京市"]["市辖区"],
            className: "slot5",
            textAlign: "center"
          }
        ];
      }
    });
  }
};
</script>

<style lang="less">
@import "../assets/css/myMint.less";
</style>

<style lang="less" scoped>
.address-picker {
  flex: 1;
  .address-details {
    font-weight: bold;
    font-size: 28px;
  }
  .picker-box {
    width: 100%;
    height: 100%;
    background-color: rgba(158, 158, 158, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 666;
    .picker-city {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: #fff;
      .confirm-btn {
        box-sizing: border-box;
        padding: 0 4%;
        width: 100%;
        line-height: 90px;
        text-align: right;
        color: red;
        font-size: 32px;
        border-bottom: 1px solid #f1f1f1; /* no */
      }
      .picker {
        width: 100%;
      }
    }
  }
}
</style>