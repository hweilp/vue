export default {
  data: function () {
    return {
      FG_syncLuck: {}
    }
  },
  created: function () {
    this.FG_initLock(this.FG_syncLuck);
  },
  methods: {
    FG_initLock: function (locker) {
      if (typeof locker !== 'object') {
        throw Error('Locker must be an Object ,' + typeof locker + ' given!')
      }

      this.$set(locker, 'isLocked', false)
      this.$set(locker, 'lastLockTime', new Date())

      locker.getLock = function () {
        if (this.isLocked) {
          return false
        } else {
          this.isLocked = true;
          return true
        }
      }

      locker.releaseLock = function () {
        this.isLocked = false
      }

      locker.getLockState = function () {
        return this.isLocked
      }
    }
  }
}


//
//
// var Locker = {
//   initLock: function (locker) {
//     if (typeof locker !== 'object') {
//       throw Error('Locker must be an Object ,' + typeof locker + ' given!')
//     }
//
//     console.log(this)
//   },
// }
//
// function install(Vue, options) {
//   Object.defineProperty(Vue.prototype, '$locker', {value: Locker})
// }
//
//
// export default {
//   install
// }
