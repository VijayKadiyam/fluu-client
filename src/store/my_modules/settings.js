export default {
    namespaced: true,
    state: {
      baseURL: null,
      mediaURL: null,
      rowsPerPage: 20,
      state: {
        value: '',
        text: '',
        logo_path: '',
      },
      site: {
      }
    },
    getters: {
      getBaseUrl(state) {
        return state.baseURL
      },
      getMediaUrl(state) {
        return state.mediaURL
      },
      getRowsPerPage(state) {
        return state.rowsPerPage
      },
      site(state) {
        return state.site;
      },
    },
    mutations: {
      SET_BASE_URL(state, data) {
        state.baseURL = data
      },
      SET_MEDIA_URL(state, data) {
        state.mediaURL = data
      },
      SET_SITE(state, site) {
        state.site = site
      },
    },
    actions: {
      setBaseUrl({ commit }, url) {
        commit('SET_BASE_URL', url)
      },
      setMediaUrl({ commit }, url) {
        commit('SET_MEDIA_URL', url)
      },
      setSite({commit}, site) {
        commit('SET_SITE', site);
      },
    }
  }