import Vuex from "vuex";
import Vue from "vue";
import largeSidebar from "./modules/largeSidebar";
import compactSidebar from "./modules/compactSidebar";
import chat from "./modules/chat";
import config from "./modules/config";
import authData from "./modules/authData";
import invoice from "./modules/invoice";
import cart from "./modules/cart";
import verticalSidebar from "./modules/verticalSidebar";
import scrumboard from "./modules/scrumboard";

import auth from './my_modules/auth'
import errors from './my_modules/errors'
import settings from './my_modules/settings'

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    largeSidebar,
    compactSidebar,
    chat,
    config,
    authData,
    invoice,
    cart,
    verticalSidebar,
    scrumboard,

    auth,
    errors,
    settings,
  }
});
