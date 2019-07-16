const jq = {
  outerWidth(el) {
    return el.offsetWidth;
  },
  outerWidthWithMargin(el) {
    var width = el.offsetWidth;
    var style = getComputedStyle(el);
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
  },
  width(el) {
    return parseInt(el.style.width)
      ? parseInt(el.style.width)
      : parseInt(el.clientWidth);
  },
  findChildren(el, selector) {
    return el.querySelectorAll(selector);
  },
};

export default jq;
