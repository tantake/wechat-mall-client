<template>
  <div class="address">
    <mt-cell-swipe
      v-for="(item) in address"
      :key="item.addressId"
      :right="[{
          content: `删除`,
          handler: () => deleteAddress(item.addressId)
          }]"
    >
      <div slot="title" class="address-details">
        <p class="user-info">
          <span>{{item.uname}}</span>
          {{item.mobile}}
        </p>
        <div class="address-info">
          <span
            class="info"
          >{{item.province}}{{item.city}}{{item.district}}&nbsp;&nbsp;{{item.address}}</span>
          <span @click="edit(item.addressId)">
            <icon-font icon-class="edit" />
          </span>
        </div>
      </div>
    </mt-cell-swipe>
    <div @click="newAddress" class="add-btn">
      <icon-font icon-class="add" />
      <span>新建收货地址</span>
    </div>
  </div>
</template>

<script>
// import api from "../../api/util";
export default {
  data() {
    return {
      address: []
    };
  },
  methods: {
    init() {
      this.getAddressList();
    },
    async getAddressList() {
      try {
        this.$indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        const res = await this.$api.address.addressList({ userId: "1" });
        console.log(res);
        this.address = res;
        this.$indicator.close();
      } catch (e) {
        console.log("​catch -> e", e);
        this.address = [];
        this.$indicator.close();
        this.$messagebox("", "网络异常");
      }
    },
    async deleteAddress(addressID) {
      try {
        this.$indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        await this.$api.address.deleteAddress({ addressId: addressID });
        const res = await this.$api.address.addressList({ userId: "1" });
        console.log(res);
        this.address = res;
        this.$indicator.close();
        this.$messagebox.alert("删除成功");
      } catch (e) {
        console.log("​catch -> e", e);
        this.address = [];
        this.$indicator.close();
        this.$messagebox("", "网络异常");
      }
    },
    edit(addressID) {
      this.$router.push(`/address/edit/${addressID}`);
    },
    newAddress() {
      this.$router.push(`/address/edit`);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.address {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-bottom: 20%;
  header {
    box-sizing: border-box;
    padding: 0 4%;
    height: 90px;
    display: flex;
    align-items: center;
    font-size: 32px;
    a {
      color: #2e2d2d;
    }
    span {
      flex: 1;
      display: inline-block;
      text-align: center;
      line-height: 90px;
    }
    .icon-font {
      font-size: 36px;
      height: 90px;
    }
    .iconDelete {
      visibility: hidden;
    }
  }
  .address-details {
    border-bottom: 1px solid #f0f0f0; /* no */
    padding: 30px 0;
    .user-info {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
      span {
        display: inline-block;
        width: 20%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .address-info {
      display: flex;
      align-items: center;
      .info {
        flex: 1;
        font-size: 24px;
        color: #555;
        margin-right: 30px;
      }
      .icon-font {
        font-size: 30px;
      }
    }
  }
  /deep/.mint-cell-wrapper {
    background-size: 0 0;
  }
  /deep/.mint-cell:last-child {
    background-size: 0 0;
  }
  .add-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 92%;
    height: 76px;
    left: 4%;
    bottom: 3%;
    color: #fff;
    background: linear-gradient(to right, #f20100, #ff4d17);
    font-size: 28px;
    border-radius: 100px;
    span {
      margin-left: 1%;
    }
  }
  /deep/.mint-cell-swipe-button {
    background: red;
    color: #fff;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
  }
}
</style>