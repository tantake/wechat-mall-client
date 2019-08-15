<template>
  <div id="car" class="car">
    <div v-if="cartNumber !== 0">
      <div class="goods-box" v-for="item in car" :key="item.recId">
        <label :for="item.recId" class="checkbox">
          <input
            type="checkbox"
            class="checkbox-input"
            :value="item.recId"
            v-model="checkedList"
            :id="item.recId"
          />
          <span class="checkbox-core"></span>
        </label>
        <div class="goods-details">
          <span class="delete" @click="deleteGoods(item.recId)">
            <icon-font icon-class="delete" />
          </span>
          <img :src="item.imgUrl" class="goods-img" alt />
          <div class="goods-description">
            <p class="goods-name">{{item.goodsSubtitle}}</p>
            <p class="goods-feature">{{item.attrValue}}</p>
            <div class="goods-choose">
              <span class="goods-price">
                ￥
                <label>{{item.goodsRetailPrice}}</label>
              </span>
              <div class="choose-number">
                <p class="btn-number">
                  <span class="btn-reduce" @click="reduce(item.recId)">
                    <icon-font icon-class="reduce" />
                  </span>
                  <span class="number-box">{{item.goodsNumber}}</span>
                  <span class="btn-add" @click="add(item.recId)">
                    <icon-font icon-class="add" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="settlement">
        <div class="settlement-info">
          <label for="all" class="checkbox" @click.prevent="checkedAll">
            <input type="checkbox" class="checkbox-input" v-model="checked" id="all" />
            <span class="checkbox-core"></span>
            <span class="checkbox-title">全选</span>
          </label>
          <span class="total-price">
            合计:
            <label>￥{{totalPrice}}</label>
          </span>
        </div>
        <span class="goPay" @click.stop="goPay">去结算</span>
      </div>
    </div>
    <div v-else>
      <div class="no-info">
        <img :src="emptyCart" alt />
        <p class="no-goods">购物车空空如也~</p>
        <p class="go-index" @click="goIndex">去逛逛</p>
      </div>
    </div>
  </div>
</template>

<script>
import emptyCart from "@/assets/images/empty-shopping-cart.png";
export default {
  data() {
    return {
      car: [
        {
          recId: 1,
          imgUrl: "",
          goodsSubtitle: "",
          attrValue: "",
          goodsRetailPrice: 0,
          goodsNumber: 1
        }
      ],
      checkedList: [],
      checkedGoodsList: [],
      checked: false,
      totalPrice: 0,
      emptyCart: emptyCart
    };
  },
  computed: {
    idList() {
      let chooseList = [];
      this.$lodash.map(this.car, item => {
        chooseList.push(item.recId);
      });
      return chooseList;
    },
    cartNumber() {
      return this.$store.getters.cartNumber;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  watch: {
    checkedList: function(val) {
      if (this.checkedList.length !== this.idList.length) {
        this.checked = false;
      } else {
        this.checked = true;
      }
      this.calculationPrice();
    },
    car: function() {
      this.calculationPrice();
    }
  },
  methods: {
    async init() {
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      const res = await this.$api.goods.cartList({ userId: this.userInfo.userId });
      this.$indicator.close();
      this.car = res;
      console.log(res);
    },
    checkedAll() {
      this.checked = !this.checked;
      if (!this.checked) {
        this.checkedList = [];
      } else {
        this.checkedList = this.idList;
      }
    },
    async deleteGoods(id) {
      const res = await this.$api.goods.deleteCart({ recId: id });
      console.log(res);
      let deleteIndex = 0;
      this.$lodash.map(this.car, (item, index) => {
        if (item.recId === id) {
          deleteIndex = index;
        }
      });
      this.car.splice(deleteIndex, 1);
      console.log("shanchu");
      console.log(this.car);
      const number = await this.$api.goods.cartNumber({ userId: this.userInfo.userId });
      this.$store.dispatch("setCartNumber", number);
    },
    reduce(id) {
      this.$lodash.map(this.car, item => {
        if (item.recId === id) {
          if (item.goodsNumber > 1) {
            item.goodsNumber--;
          } else {
            item.goodsNumber = 1;
          }
        }
      });
      this.calculationPrice();
    },
    add(id) {
      this.$lodash.map(this.car, item => {
        if (item.recId === id) {
          item.goodsNumber++;
        }
      });
      this.calculationPrice();
    },
    calculationPrice() {
      this.totalPrice = 0;
      this.checkedGoodsList = this.$lodash.filter(this.car, item => {
        if (this.$lodash.indexOf(this.checkedList, item.recId) !== -1) {
          return item;
        }
      });
      this.$lodash.map(this.checkedGoodsList, item => {
        this.totalPrice +=
          Number(item.goodsNumber) * Number(item.goodsRetailPrice);
      });
    },
    goPay() {
      if (this.checkedList.length === 0) {
        this.$messagebox("购物车", "您还没有选择任何商品");
      } else {
        this.$store.dispatch("setBuyGoodsList", this.checkedGoodsList);
        this.$router.push("/common/checkOrder");
      }
    },
    goIndex() {
      this.$router.push("/index");
      this.$store.dispatch("setCheckedMenu", "index");
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.car {
  position: absolute;
  width: 100%;
  min-height: 100%;
  .goods-box {
    box-sizing: border-box;
    padding: 20px 4%;
    background-color: #fff;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .goods-details {
      position: relative;
      display: flex;
      flex: 1;
      .delete {
        position: absolute;
        right: 0;
        top: 0;
        text-align: right;
        width: 80px;
        height: 50px;
        font-size: 0;
        .icon-font {
          font-size: 34px;
          color: #333;
        }
      }
      .goods-img {
        width: 174px;
        height: 174px;
        margin-right: 20px;
        background-color: #f2270c;
      }
      .goods-description {
        flex: 1;
        overflow: hidden;
        .goods-name {
          font-size: 28px;
          color: #333;
          margin-bottom: 14px;
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .goods-feature {
          font-size: 24px;
          color: #909090;
          margin-bottom: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .goods-choose {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .goods-price {
            font-size: 24px;
            font-weight: bold;
            color: #f2270c;
            label {
              font-size: 32px;
            }
          }
          .choose-number {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .btn-number {
              display: flex;
              align-items: center;
              .btn-reduce {
                color: #2e2d2d;
                display: flex;
                .icon-font {
                  font-size: 24px;
                }
              }
              .btn-add {
                color: #2e2d2d;
                display: flex;
                .icon-font {
                  font-size: 24px;
                }
              }
              .number-box {
                width: 90px;
                height: 50px;
                line-height: 50px;
                margin: 0 20px;
                font-size: 24px;
                text-align: center;
                background-color: #f2f2f2;
              }
            }
          }
        }
      }
    }
  }
  .checkbox {
    padding: 20px 10px 20px 0;
    display: flex;
    align-items: center;
    .checkbox-input {
      display: none;
    }
    .checkbox-input:checked + .checkbox-core {
      background-color: #f2270c;
      border-color: #f2270c;
    }
    .checkbox-core {
      box-sizing: border-box;
      display: inline-block;
      background-color: #fff;
      border-radius: 100%;
      border: 1px solid #ccc; /* no */
      position: relative;
      width: 32px;
      height: 32px;
      vertical-align: middle;
      box-sizing: border-box;
    }
    .checkbox-input:checked + .checkbox-core:after {
      border-color: #fff;
      transform: rotate(45deg) scale(1);
    }
    .checkbox-core:after {
      border: 4px solid transparent;
      border-left: 0;
      border-top: 0;
      content: " ";
      position: absolute;
      top: 4px;
      left: 8px;
      width: 7px;
      height: 14px;
      transform: rotate(45deg) scale(0);
      transition: transform 0.2s;
    }
    .checkbox-title {
      margin-left: 10px;
      font-size: 24px;
      color: #7a7a7a;
    }
  }
  .settlement {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 4%;
    left: 0;
    bottom: 110px;
    background-color: #fff;
    border-top: 1px solid #d9d9d9; /* no */
    border-bottom: 1px solid #d9d9d9; /* no */
    display: flex;
    justify-content: space-between;
    align-items: center;
    .settlement-info {
      display: flex;
      flex: 1;
      align-items: center;
      .checkbox {
        padding: 10px 0;
      }
      .total-price {
        margin-left: 4%;
        font-size: 30px;
        color: #333;
        label {
          font-size: 30px;
          color: #f2270c;
        }
      }
    }
    .goPay {
      line-height: 50px;
      padding: 0 30px;
      font-size: 24px;
      color: #fff;
      border-radius: 100px;
      background: linear-gradient(to right, #f20100, #ff4d17);
    }
  }
  .no-info {
    box-sizing: border-box;
    padding: 40px 4%;
    width: 100%;
    img {
      display: block;
      margin: 0 auto;
      width: 40%;
    }
    .no-goods {
      font-size: 24px;
      color: #7a7a7a;
      width: 100%;
      text-align: center;
    }
    .go-index {
      width: 60%;
      height: 60px;
      margin: 80px auto;
      border-radius: 100px;
      text-align: center;
      line-height: 60px;
      background: linear-gradient(to right, #f20100, #ff4d17);
      color: #fff;
      font-size: 28px;
    }
  }
}
</style>