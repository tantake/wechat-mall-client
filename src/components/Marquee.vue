<template>
  <div class="ov-marquee" ref="container" style="white-space: nowrap; overflow: hidden;">
    <div class="marquee-text" ref="textWrap" style="display: inline-block;" :style="textWrapCss">
      <span style="display: inline-block;" ref="text" class="marquee-text-span">
        {{textToRender}}
        <span style="color:transparent">>>>>>>>></span>
      </span>
      <span style="display: inline-block;" ref="text" class="marquee-text-span">
        {{textToRender}}
        <span style="color:transparent">>>>>>>>></span>
      </span>
    </div>
  </div>
</template>
<script>
import jq from "../util/my-jquery.js";
export default {
  name: "Marquee", // 组件名称，必填项
  props: ["textInfo", "url"],
  data() {
    return {
      marqueeTimer: null,
      $container: null,
      $text: null,
      $textWrap: null,
      textWrapCss: {
        transform: "translateX(0)",
        transition: "none"
      },
      defaultText: "这里可以放滚动公告，还可以设置跳转",
      textToRender: ""
    };
  },
  methods: {
    renderAtMounted() {
      this.$container = this.$refs["container"];
      this.$text = jq.findChildren(this.$container, ".marquee-text-span");
      this.$textWrap = this.$refs["textWrap"];
      this.textToRender = this.textInfo || this.defaultText;
      this.reset();
    },
    reset: function() {
      this.$nextTick(() => {
        this.textWrapCss = {
          transform: "translateX(0)",
          transition: "none"
        };
        let textWidth = jq.width(this.$text[0]);
        let containerWidth = jq.width(this.$container);
        if (textWidth > containerWidth) {
          this.startAnimation();
        } else {
          this.$lodash.forEach(this.$text, element => {
            element.style["min-width"] = containerWidth + "px";
          });
          this.startAnimation();
        }
      });
    },
    transitionendFunc: function() {
      this.marqueeTimer = setTimeout(this.reset, 1000);
    },
    startAnimation: function() {
      this.marqueeTimer && clearTimeout(this.marqueeTimer);
      var _this = this;
      if (jq.width(this.$textWrap) / 2 > jq.width(this.$container)) {
        this.$textWrap.addEventListener(
          "transitionend",
          this.transitionendFunc
        );
        this.marqueeTimer = setTimeout(function() {
          var style = {
            transform: "translateX(" + -_this.$textWrap.offsetWidth / 2 + "px)"
          };
          style.transition =
            "transform " +
            (1200 * _this.$textWrap.offsetWidth) / 200 +
            "ms linear";
          _this.textWrapCss = style;
        }, 0);
      }
    }
  },
  mounted() {
    this.renderAtMounted();
  }
};
</script>
<style lang="less" scoped>
.ov-marquee {
  font-size: 24px;
  line-height: 70px;
  font-weight: bold;
}
</style>
