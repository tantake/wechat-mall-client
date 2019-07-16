<template>
  <svg class="icon-font" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-font',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon${this.iconClass}`
    }
  }
}
</script>

<style lang="less" scoped>
.icon-font {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>