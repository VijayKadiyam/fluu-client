import store from '@/store'

export default (to, from, next) => {
  // if (
  //   localStorage.getItem("userInfo") != null &&
  //   localStorage.getItem("userInfo").length > 0
  // ) {
  //   next();
  // } else {
  //   localStorage.removeItem("userInfo");
  //   next("/app/sessions/signIn");
  // }
  if (to.name === "Login" || to.name === "Register" || to.name === "ForgotPassword") {
    if (store.getters["auth/authenticated"]) {
      next();
    }
    next();
  } else if (!store.getters["auth/authenticated"]) {
    next("/app/sessions/signIn");
  } else if (to.name != "Settings") {
    if (store.getters["auth/authenticated"]) {
      if (Object.keys(store.getters["auth/site"]).length == 0) {
        next({
          name: "Settings",
        });
      }
    }
  }
  next();
};
