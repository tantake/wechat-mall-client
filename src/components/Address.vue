<template>
  <div class="address-picker">
    <p
      @click="chooseAddress()"
      class="address-details"
    >{{address.province}}&nbsp;&nbsp;{{address.city}}&nbsp;&nbsp;{{address.district}}</p>
    <div v-show="isShow" class="picker-box">
      <div class="picker-city">
        <p class="confirm-btn" @click="addressPicker()">确定</p>
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
      address: {
        province: "",
        city: "",
        district: ""
      }
    };
  },
  watch: {
    userAddress: {
      handler: function(newValue, oldValue) {
        if (newValue.addressId) {
          this.address = newValue;
          this.pickerInit();
        }
      },
      deep: true
    }
  },
  methods: {
    addressPicker() {
      this.isShow = false;
      this.$emit("addressPicker", this.address);
    },
    AddressChange(picker, values) {
      if (address[values[0]]) {
        picker.setSlotValues(1, Object.keys(address[values[0]]));
        picker.setSlotValues(2, address[values[0]][values[1]]);
        this.address.province = values[0];
        this.address.city = values[1];
        this.address.district = values[2];
      }
    },
    chooseAddress() {
      this.isShow = true;
      this.$nextTick(() => {
        if (
          this.address.addressId === undefined &&
          this.address.province === ""
        ) {
          this.address.province = "北京市";
          this.address.city = "市辖区";
          this.address.district = "东城区";
        }
      });
    },
    addressInit() {
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
    },
    pickerInit() {
      this.$nextTick(() => {
        let province = this.address.province;
        let city = this.address.city;
        let county = this.address.district;
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
      });
    }
  },
  mounted() {
    this.addressInit();
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.address-picker {
  flex: 1;
  .address-details {
    color: #555;
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
        font-size: 28px;
        font-weight: bold;
        border-bottom: 1px solid #f1f1f1; /* no */
      }
      .picker {
        width: 100%;
        @{deep} .picker-slot {
          font-size: 28px;
        }
      }
    }
  }
}
</style>