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
            component: () => import("./views/app/dashboards/dashboard.v5"),
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
      // Vessels
      {
        path: "/app/vessels",
        component: () => import("./views/app/vessels"),
        redirect: "/app/vessels/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/vessels/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/vessels/create"),
          },
          {
            path: "view/:id",
            component: () => import("./views/app/vessels/view"),
          },
          {
            path: ":id",
            component: () => import("./views/app/vessels/id"),
          },
        ],
      },
      
      // PSC Inspection
      {
        path: "/app/vessels/:vessel_id/psc-inspections",
        component: () => import("./views/app/psc-inspections"),
        redirect: "/app/vessels/:vessel_id/psc-inspections/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/psc-inspections/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/psc-inspections/create"),
          },
          {
            path: "view/:id",
            component: () => import("./views/app/psc-inspections/view"),
          },
          {
            path: ":id",
            component: () => import("./views/app/psc-inspections/id"),
          },
        ],
      },
      // Terminal Inspection
      {
        path: "/app/vessels/:vessel_id/terminal-inspections",
        component: () => import("./views/app/terminal-inspections"),
        redirect: "/app/vessels/:vessel_id/terminal-inspections/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/terminal-inspections/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/terminal-inspections/create"),
          },
          {
            path: "view/:id",
            component: () => import("./views/app/terminal-inspections/view"),
          },
          {
            path: ":id",
            component: () => import("./views/app/terminal-inspections/id"),
          },
        ],
      },
       // Charterer Inspection
       {
        path: "/app/vessels/:vessel_id/charterer-inspections",
        component: () => import("./views/app/charterer-inspections"),
        redirect: "/app/vessels/:vessel_id/charterer-inspections/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/charterer-inspections/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/charterer-inspections/create"),
          },
          {
            path: "view/:id",
            component: () => import("./views/app/charterer-inspections/view"),
          },
          {
            path: ":id",
            component: () => import("./views/app/charterer-inspections/id"),
          },
        ],
      },
      // FSC Inspection
      {
        path: "/app/vessels/:vessel_id/fsc-inspections",
        component: () => import("./views/app/fsc-inspections"),
        redirect: "/app/vessels/:vessel_id/fsc-inspections/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/fsc-inspections/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/fsc-inspections/create"),
          },
          {
            path: "view/:id",
            component: () => import("./views/app/fsc-inspections/view"),
          },
          {
            path: ":id",
            component: () => import("./views/app/fsc-inspections/id"),
          },
        ],
      },
      // CDI Inspection
      {
        path: "/app/vessels/:vessel_id/sire-inspections",
        component: () => import("./views/app/sire-inspections"),
        redirect: "/app/vessels/:vessel_id/sire-inspections/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/sire-inspections/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/sire-inspections/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/sire-inspections/id"),
          },
          {
          path: "view/:id",
            component: () => import("./views/app/sire-inspections/view"),
          }
        ],
      },
      // {
      //   path: "/app/vessels/:vessel_id/sire-inspections-view/",
      //   component: () => import("./views/app/sire-inspections"),
      //   redirect: "/app/vessels/:vessel_id/sire-inspections-view/",
      //   children: [
      //     {
            
      //     },
          
      //   ],
      // },
      // Near Misses
      {
        path: "/app/near-misses",
        component: () => import("./views/app/near-misses"),
        redirect: "/app/near-misses/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/near-misses/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/near-misses/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/near-misses/id"),
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
      // Viq Chapters
      {
        path: "/app/viq-chapters",
        component: () => import("./views/app/viq-chapters"),
        redirect: "/app/viq-chapters/list",
        children: [
          {
            path: "list",
            component: () => import("./views/app/viq-chapters/list"),
          },
          {
            path: "create",
            component: () => import("./views/app/viq-chapters/create"),
          },
          {
            path: ":id",
            component: () => import("./views/app/viq-chapters/id"),
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

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
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
