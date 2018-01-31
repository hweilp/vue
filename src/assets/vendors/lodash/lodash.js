/**
 * Created by fangjiahui on 17/5/10.
 */
import lodash from 'lodash'


export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$_', {value: lodash})
  }
}
