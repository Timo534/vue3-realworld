import { createStore } from 'vuex'
import { get, set } from '@/utils/storage'

export default createStore({
  state () {
    return {
      user: get('user')
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      set('user', user)
    }
  },
  actions: {
  },
  modules: {
  }
})
