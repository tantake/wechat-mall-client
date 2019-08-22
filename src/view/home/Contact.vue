<template>
  <div class="contact">
    <img class="banner-pic" src="../../assets/images/contact_banner.jpg" />
    <div class="content-information">
      <p class="title">联系我们</p>
      <p class="content">电话：</p>
      <p class="content bottom">028-81701726</p>
      <p class="content">e-mail：</p>
      <p class="content bottom">ilock@yikomii.com</p>
      <p class="content">地址：</p>
      <p class="content">成都市高新区天府大道北段1480号德商国际A座1105</p>
      <img src="../../assets/images/addr.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.contact {
  position: absolute;
  width: 100%;
  min-height: 100%;
  .banner-pic {
    width: 100%;
  }
  .content-information {
    box-sizing: border-box;
    width: 100%;
    padding: 40px 4%;
    text-align: left;
    .title {
      font-size: 36px;
      margin-bottom: 40px;
      text-align: center;
    }
    .content {
      font-size: 28px;
    }
    .bottom {
      margin-bottom: 20px;
    }
    .content:last-of-type {
      margin-bottom: 40px;
    }
    img {
      width: 100%;
    }
  }
}
</style>