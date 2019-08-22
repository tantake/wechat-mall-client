<template>
  <div class="about">
    <img class="banner-pic" src="../../assets/images/aboutus-banner.jpg" />
    <div class="introduction">
      <p>成都壹柯米科技有限公司，简称壹柯米科技，成立于2019年4月，致力于打造年轻人喜爱和信赖的智能产品。</p>
      <p>公司产品主要围绕智能安防展开，目前拥有智能锁品牌壹柯米，主要针对年轻家用市场。</p>
      <p>目前，壹柯米主推1000—2000的高性价比市场，充分满足年轻人对智能锁快捷、时尚、安全、不贵的心理诉求。作为成都本土新锐智能锁品牌，壹柯米iLOCK系列520X、550X，一上市即刻收到众多企业及个人的追捧，一跃成为成都智能锁界的一颗闪耀的新星。</p>
      <p>壹柯米团队平均年龄30+，员工来自CSLP、BAT、华为、中兴、Alcatel-Lucent、NCS、Wipro等顶尖智能锁、互联网及通讯电子公司。创始人牟谦，85后海归，科技产品的追慕者，“较劲”与“执着”的川妹子，立志打破行业当下价格与质量的矛盾体以及千锁一面的窘境，通过跨界整合，不断打破产品形态，带领团队打造出一系列彰显年轻化、个性化、艺术化、差异化的智能锁及周边产品，与80、90后消费者碰撞出最美共鸣，从而获得他们的极度认同。</p>
    </div>
    <div class="culture">
      <p class="title">企业文化</p>
      <p class="content">开放、忠诚、极致、担当</p>
      <p class="title">企业愿景</p>
      <p class="content">做年轻人喜爱和信赖的智能产品</p>
      <p class="title">企业使命</p>
      <p class="content">让年轻人更出色</p>
    </div>
    <div class="activity">
      <p class="title">户外拓展</p>
      <p class="content">
        2019年4月21日，壹柯米公司组织全体员工在团结镇举行了为期１天的团队户外拓展培训活动。此次活动旨在熔练团队，加强员工与员工之间、员工与
        公司之间的沟通配合，从而激发出团队更高昂的工作热诚和拼搏创新的动力，使团队更富凝聚力和战斗力。
      </p>
      <img src="../../assets/images/phonto.jpg" />
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
.about {
  position: absolute;
  width: 100%;
  min-height: 100%;
  .banner-pic {
    width: 100%;
  }
  .introduction {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 4%;
    font-size: 24px;
    line-height: 40px;
    color: #333;
    text-align: justify;
    p {
      padding: 10px 0;
    }
  }
  .culture {
    box-sizing: border-box;
    width: 100%;
    padding: 40px 4%;
    text-align: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1); /* no */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* no */
    .title {
      font-size: 36px;
      margin-bottom: 40px;
    }
    .content {
      font-size: 30px;
      margin-bottom: 60px;
    }
    .content:last-of-type {
      margin-bottom: 0;
    }
  }
  .activity {
    box-sizing: border-box;
    width: 100%;
    padding: 40px 4%;
    text-align: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1); /* no */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* no */
    .title {
      font-size: 36px;
      margin-bottom: 40px;
    }
    .content {
      line-height: 40px;
      font-size: 24px;
      color: #333;
      text-align: justify;
      margin-bottom: 20px;
    }
    img {
      width: 100%;
    }
  }
}
</style>