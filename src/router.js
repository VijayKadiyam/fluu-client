import Vue from "vue";
import store from "./store";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import NProgress from "nprogress";
import authenticate from "./auth/authenticate";

Vue.use(Router);

// create new router

const routes = [
  {
    path: "/",
    component: () => import("./views/app"), //webpackChunkName app
    beforeEnter: authenticate,
    redirect: "/app/dashboards/dashboard.v5",

    children: [
      {
        path: "/app/dashboards",
        component: () => import("./views/app/dashboards"), //dashboard
        children: [
          {
            path: "dashboard.v1",
            name: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1"),
          },
          {
            path: "dashboard.v2",
            name: "dashboard.v2",
            component: () => import("./views/app/dashboards/dashboard.v2"),
          },
          {
            path: "dashboard.v3",
            name: "dashboard.v3",
            component: () => import("./views/app/dashboards/dashboard.v3"),
          },
          {
            path: "dashboard.v4",
            name: "dashboard.v4",
            component: () => import("./views/app/dashboards/dashboard.v4"),
          },
          {
            path: "dashboard.v5",
            name: "dashboard.v5",
            component: () => import("./views/app/dashboards/dashboard.v1"),
          },
          {
            path: "dashboard.v6",
            name: "dashboard.v6",
            component: () => import("./views/app/dashboards/dashboard.v6"),
          },
        ],
      },
      // Sites
      {
        path: "/app/sites",
        component: () => import("./views/app/sites"),
        redirect: "/app/sites/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/sites/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/sites/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/sites/id"),
          },
        ],
      },
      // Users
      {
        path: "/app/users",
        component: () => import("./views/app/users"),
        redirect: "/app/users/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/users/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/users/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/users/id"),
          },
        ],
      },
      // Settings
      {
        path: "/app/settings",
        component: () => import("./views/app/settings"),
        redirect: "/app/settings/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/settings/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/settings/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/settings/id"),
          },
        ],
      },
      // Permissions
      {
        path: "/app/permissions",
        component: () => import("./views/app/permissions"),
        redirect: "/app/permissions/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/permissions/list"),
          },
        ],
      },
      // Values
      {
        path: "/app/values",
        component: () => import("./views/app/values"),
        redirect: "/app/values/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/values/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/values/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/values/id"),
          },
        ],
      },
      // Value-Lists
      {
        path: "/app/value-lists",
        component: () => import("./views/app/value-lists"),
        redirect: "/app/value-lists/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/value-lists/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/value-lists/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/value-lists/id"),
          },
        ],
      },
      // Selfie Photo Samples
      {
        path: "/app/selfie-photo-samples",
        component: () => import("./views/app/selfie-photo-samples"),
        redirect: "/app/selfie-photo-samples/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/selfie-photo-samples/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/selfie-photo-samples/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/selfie-photo-samples/id"),
          },
        ],
      },
      // Login Questions
      {
        path: "/app/login-questions",
        component: () => import("./views/app/login-questions"),
        redirect: "/app/login-questions/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/login-questions/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/login-questions/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/login-questions/id"),
          },
        ],
      },
      // User Login Questions
      {
        path: "/app/user-login-questions",
        component: () => import("./views/app/user-login-questions"),
        redirect: "/app/user-login-questions/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/user-login-questions/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/user-login-questions/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/user-login-questions/id"),
          },
        ],
      },
      // User Notifications
      {
        path: "/app/user-notifications",
        component: () => import("./views/app/user-notifications"),
        redirect: "/app/user-notifications/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/user-notifications/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/user-notifications/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/user-notifications/id"),
          },
        ],
      },
      // User Stories
      {
        path: "/app/user-stories",
        component: () => import("./views/app/user-stories"),
        redirect: "/app/user-stories/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/user-stories/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/user-stories/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/user-stories/id"),
          },
        ],
      },
      // User Superlikes
      {
        path: "/app/user-superlikes",
        component: () => import("./views/app/user-superlikes"),
        redirect: "/app/user-superlikes/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/user-superlikes/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/user-superlikes/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/user-superlikes/id"),
          },
        ],
      },
      // User Swipes
      {
        path: "/app/user-swipes",
        component: () => import("./views/app/user-swipes"),
        redirect: "/app/user-swipes/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/user-swipes/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/user-swipes/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/user-swipes/id"),
          },
        ],
      },
      // User Matches
      {
        path: "/app/user-matches",
        component: () => import("./views/app/user-matches"),
        redirect: "/app/user-matches/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/user-matches/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/user-matches/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/user-matches/id"),
          },
        ],
      },
      // User Subscriptions
      {
        path: "/app/user-subscriptions",
        component: () => import("./views/app/user-subscriptions"),
        redirect: "/app/user-subscriptions/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/user-subscriptions/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/user-subscriptions/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/user-subscriptions/id"),
          },
        ],
      },
    ],
  },
  // sessions
  {
    path: "/app/sessions",
    component: () => import("./views/app/sessions"),
    redirect: "/app/sessions/signIn",
    children: [
      {
        path: "signIn",
        component: () => import("./views/app/sessions/signIn"),
      },
      {
        path: "signUp",
        component: () => import("./views/app/sessions/signUp"),
      },
      {
        path: "forgot",
        component: () => import("./views/app/sessions/forgot"),
      },
    ],
  },

  {
    path: "/vertical-sidebar",
    component: () => import("./containers/layouts/verticalSidebar"),
  },
  {
    path: "*",
    component: () => import("./views/app/pages/notFound"),
  },
];

const router = new Router({
  mode: "history",
  linkActiveClass: "open",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.path) {
    // Start the route progress bar.

    NProgress.start();
    NProgress.set(0.1);
  }
  next();
});

router.afterEach(() => {
  // Remove initial loading
  const gullPreLoading = document.getElementById("loading_wrap");
  if (gullPreLoading) {
    gullPreLoading.style.display = "none";
  }
  // Complete the animation of the route progress bar.
  setTimeout(() => NProgress.done(), 500);
  // NProgress.done();
  // if (isMobile) {
  if (window.innerWidth <= 1200) {
    // console.log("mobile");
    store.dispatch("changeSidebarProperties");
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    if (store.getters.getComsepactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch("changeCompactSidebarProperties");
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    // store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
  }
});

export default router;
