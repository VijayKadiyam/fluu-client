// import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueRouter from "vue-router";
import GullKit from "./plugins/gull.kit";
import axios from "axios";

// import "babel-polyfill";
// import es6Promise from "es6-promise";
// es6Promise.polyfill();
import store from "./store";
import Breadcumb from "./components/breadcumb";
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseSettings} from "@/data/config";
import i18n from "./lang/lang";
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";
 
//defined as global component
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);

Vue.component("breadcumb", Breadcumb);
import InstantSearch from 'vue-instantsearch';
// Vue.use(VueRouter);
 


Vue.use(InstantSearch);
Vue.use(GullKit);
Vue.use(axios);

firebase.initializeApp(firebaseSettings);

require('@/store/my_modules/subscriber')

require('./mixin.js')
require('./axios.js')
require('./directives.js')
require('./filters.js')



Vue.config.productionTip = false;

// new Vue({
//   store,
//   router,
//   i18n,
//   render: h => h(App)
// }).$mount("#app");

store.dispatch('auth/attempt', localStorage.getItem('token'))
  .then(() => {
    new Vue({
      store,
      router,
      i18n,
      render: h => h(App)
    }).$mount('#app')
  })

