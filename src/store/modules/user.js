import {SET_USER_SESSION,REMOVE_USER_SESSION, INIT_USER_MENU,INIT_USER_INFO,INIT_USER_POWER,INIT_USER_BRAND,INIT_USER_UNIT,INIT_USER_SUPPLIER,INIT_USER_CATEGORY} from "../mutation-events"
import Storage from "@/libs/storage"
const User = {
  namespaced: true,
  state: {
    sessionId: Storage.get('MSSID') ? Storage.get('MSSID') : null,
    created_at: null,
    merchantID:Storage.get('MERCHANTID') ? Storage.get('MERCHANTID') : null,
    merchantMID:Storage.get('MERCHANTMID') ? Storage.get('MERCHANTMID') : null,
    merchantName:Storage.get('MERCHANTNAME') ? Storage.get('MERCHANTNAME') : null,
    menu: Storage.get('MENU') ? Storage.get('MENU') : null,
    power:Storage.get('POWER') ? Storage.get('POWER') : [],
    brand:null,
    unit : null,
    supplier : null,
    category : null,
  },
  mutations: {
    [SET_USER_SESSION](state, sessionId) {
      state.sessionId = sessionId;
      state.created_at = (new Date()).getTime();

      Storage.set('MSSID', sessionId, 3600)
    },
    [REMOVE_USER_SESSION](state, response) {

      state.sessionId = null;
      state.created_at = null;
      state.merchantID = null;
      state.merchantMID = null;
      state.merchantName = null;
      state.menu = null;
      state.power = null;
      Storage.remove('MERCHANTID')
      Storage.remove('MERCHANTMID')
      Storage.remove('MERCHANTNAME')
      Storage.remove('MSSID')
      Storage.remove('MENU')
      Storage.remove('POWER')
    },

    [INIT_USER_MENU](state, menu) {
      state.menu = menu;
      Storage.set('MENU', menu, 3600)
    },

    [INIT_USER_INFO](state,info){
      state.merchantName = info.merchantName;
      state.merchantID = info.merchantID;
      state.merchantMID =  info.merchantMID;
      Storage.set('MERCHANTNAME', info.merchantName, 3600)
      Storage.set('MERCHANTID', info.merchantID, 3600)
      Storage.set('MERCHANTMID', info.merchantMID, 3600)
    },
    [INIT_USER_POWER](state,power){
      state.power = power;
      Storage.set('POWER', power, 3600)
    },
    [INIT_USER_BRAND](state,brand){
      state.brand = brand;
    },
    [INIT_USER_UNIT](state,unit){
      state.unit = unit;
    },
    [INIT_USER_SUPPLIER](state,supplier){
      state.supplier = supplier;
    },
    [INIT_USER_CATEGORY](state,category){
      state.category = category;
    },
  },
  actions: {
    userLogin({state, commit, dispatch}, response) {
      commit(SET_USER_SESSION, response.body.sessionId)

    },
    userLogout({state, commit, dispatch}, response) {
      commit(REMOVE_USER_SESSION, response)
    },
    userInfo({state, commit,dispatch}, response) {
      commit(INIT_USER_INFO,{merchantName:response.body.name,merchantID:response.body.empNo,merchantMID:response.body.id})
    },

    initMenu({state, commit}, response) {
      commit(INIT_USER_MENU, {menu: response})
    },
    userPower({state, commit}, response) {
      commit(INIT_USER_POWER, response)
    },

    userBrand({state, commit}, response) {
      commit(INIT_USER_BRAND, response)
    },
    userUnit({state, commit}, response) {
      commit(INIT_USER_UNIT, response)
    },
    userSupplier({state, commit}, response) {
      commit(INIT_USER_SUPPLIER, response)
    },
    userCategory({state, commit}, response) {
      commit(INIT_USER_CATEGORY, response)
    },


  },
  getters: {}
}


export default User
