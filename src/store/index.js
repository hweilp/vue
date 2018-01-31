import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let vuex = new Vuex.Store({

  modules: {
    User,
  },
  strict: debug,
})


export default vuex
