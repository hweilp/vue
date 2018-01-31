import * as types from './mutation-events'

export const addToCart = ({commit}, product) => {
  if (product.inventory > 0) {
    commit(types.USER_LOGIN, {
      id: product.id
    })
  }
}
