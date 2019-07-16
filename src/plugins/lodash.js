import concat from "lodash/concat";
import debounce from "lodash/debounce";
import differenceWith from "lodash/differenceWith";
import extend from "lodash/extend";
import filter from "lodash/filter";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import forEach from "lodash/forEach";
import get from "lodash/get";
import has from "lodash/has";
import indexOf from "lodash/indexOf";
import isArray from "lodash/isArray";
import isEqual from "lodash/isEqual";
import isObject from "lodash/isObject";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import last from "lodash/last";
import remove from "lodash/remove";
import sortBy from "lodash/sortBy";
import orderBy from "lodash/orderBy";
import unset from "lodash/unset";
import upperFirst from "lodash/upperFirst";
import throttle from "lodash/throttle";
import reverse from "lodash/reverse";
import map from "lodash/map";
import pick from "lodash/pick";
import assign from "lodash/assign";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "clone-deep";
import set from "lodash/set";
import head from "lodash/head";
import mapValues from "lodash/mapValues";
import merge from "lodash/merge";
import keyBy from "lodash/keyBy";

const myLodash = {
  pick,
  assign,
  isEmpty,
  concat,
  isObject,
  isNumber,
  debounce,
  differenceWith,
  extend,
  filter,
  find,
  findIndex,
  forEach,
  get,
  has,
  indexOf,
  isArray,
  isEqual,
  isString,
  last,
  head,
  remove,
  keyBy,
  reverse,
  sortBy,
  orderBy,
  throttle,
  unset,
  upperFirst,
  map,
  cloneDeep,
  set,
  merge,
  mapValues
};
export default {
  install: (Vue, options) => {
    Vue.lodash = myLodash;
    window.lodash = myLodash;
    Object.defineProperties(Vue.prototype, {
      lodash: {
        get() {
          return myLodash;
        }
      },
      $lodash: {
        get() {
          return myLodash;
        }
      }
    });
  },
};
