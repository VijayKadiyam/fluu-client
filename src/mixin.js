
import { mapGetters } from 'vuex'
import Vue from 'vue' 

const mixin = {
  install (Vue) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          authenticated: 'auth/authenticated',
          user: 'auth/user',
          site: 'auth/site',
          errors: 'errors/getErrors',
          status: 'errors/getStatus',
          baseUrl: 'settings/getBaseUrl',
          mediaUrl: 'settings/getMediaUrl',
          rowsPerPage: 'settings/getRowsPerPage',
          employee: 'employee/getEmployee',
          userPermissions: 'auth/userPermissions'
        })
      }
    })
  }
}

Vue.use(mixin)