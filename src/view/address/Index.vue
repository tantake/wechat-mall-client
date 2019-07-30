<template>
  <div class="address">
    <mt-cell-swipe
      v-for="(item, index) in address"
      :key="index"
      :right="[
    {
      content: `删除`,
      style: { background: 'red', color: '#fff',fontSize:'0.4rem', display:'flex', alignItems:'center', justifyContent:'center', padding:'0 30px'},
      handler: () => deleteAddress(item.id)
    }
  ]"
    >
      <div slot="title" class="address-details">
        <p class="user-info">
          <span>{{item.name}}</span>
          {{item.phoneNumber}}
        </p>
        <div class="address-info">
          <span
            class="info"
          >{{item.province}}{{item.city}}{{item.county}}&nbsp;&nbsp;{{item.details}}</span>
          <span @click="edit(item.id)">
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
export default {
  data() {
    return {
      address: [
        {
          id: "123",
          name: "胡卓",
          phoneNumber: "182****7302",
          province: "重庆市",
          city: "市辖区",
          county: "九龙坡区",
          details: "保利狮子湖香樟郡6栋二单元"
        },
        {
          id: "13",
          name: "徐渊鸿",
          phoneNumber: "159****5264",
          province: "北京市",
          city: "市辖区",
          county: "西城区",
          details: "聚金万佳苑"
        },
        {
          id: "23",
          name: "欧阳潇潇",
          phoneNumber: "136****7552",
          province: "北京市",
          city: "市辖区",
          county: "西城区",
          details: "叽里呱啦小区7栋9-9"
        },
        {
          id: "1234",
          name: "李四买买提啊",
          phoneNumber: "139****6666",
          province: "北京市",
          city: "市辖区",
          county: "西城区",
          details: "大渡口政府"
        }
      ]
    };
  },
  methods: {
    deleteAddress(addressID) {
      console.log(addressID);
      this.$messagebox.alert("删除成功");
    },
    edit(addressID) {
      this.$router.push(`/address/edit/${addressID}`);
    },
    newAddress() {
      this.$router.push(`/address/edit`);
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.address {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
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
    border-bottom: 1px solid #f0f0f0;
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
  .add-btn {
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
    .icon-font {
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
}
</style>