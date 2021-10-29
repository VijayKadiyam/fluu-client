/* eslint-disable */
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: '',
    user: {},
    site: {},
    userPermissions: [],
  },
  getters: {
    authenticated (state) {
      return state.token ? true : false
    },
    user (state) {
      return state.user
    },
    site(state) {
      return state.site
    },
    userPermissions(state) {
      return state.userPermissions
    }
  },
  mutations: {
    SET_TOKEN (state, data) {
      state.token = data
    },
    SET_USER (state, data) {
      state.user = data
      let userSites = data ? data.sites : ''
      state.site = userSites.length ? userSites[0] : {}
      state.userPermissions = state.user ? (state.user.roles.length ? state.user.roles[0].permissions.map(p => p.id) : [] ) : []
    },
    SET_SITE(state, site) {
      state.site = site
      axios.defaults.headers.common['siteid'] = site.id
    },
  },
  actions: {
    async logIn ({ dispatch }, credentails) {
      const response = await axios.post('/login', credentails)
      dispatch('attempt', response.data.token)
      // dispatch('assignUser', response.data.data)
    },
    async attempt ({ state, commit, dispatch }, token) {
      if(token)
        commit('SET_TOKEN', token)

      if(!state.token)
        return

      try {
        const response = await axios.get('/me')
        dispatch('assignUser', response.data.data)
      } catch(e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },
    async assignUser({state, commit}, user) {
      commit('SET_USER', user)
    },
    logOut ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    },
    setSite({commit}, site) {
      commit('SET_SITE', site);
    },
  }
}