<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
      ref="myData"
      class="sidebar-left rtl-ps-none ps scroll"
    >
      <div>
        <ul class="navigation-left">
          <!-- Dashboard -->
          <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'dashboards' }"
            class="nav-item"
            data-item="dashboards"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(1) != -1"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Bar-Chart"></i>
              <span class="nav-text">{{ $t("dashboard") }}</span>
            </a>

            <div class="triangle"></div>
          </li>
          <!-- Settings -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'sites' }"
            :data-submenu="false"
            v-if="this.userPermissions.indexOf(2) != -1"
          >
            <router-link tag="a" class="nav-item-hold" to="/app/settings/list">
              <i class="nav-icon i-File-Clipboard-File--Text"></i>
              <span class="nav-text">Settings</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- Site -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'sites' }"
            data-item="sites"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(2) != -1"
          >
            <router-link tag="a" class="nav-item-hold" to="/app/sites/list">
              <i class="nav-icon i-File-Clipboard-File--Text"></i>
              <span class="nav-text">Sites</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- Users -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'users' }"
            data-item="users"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(3) != -1"
          >
            <router-link class="nav-item-hold" to="/app/users/list">
              <i class="nav-icon i-File-Clipboard-File--Text"></i>
              <span class="nav-text">Users</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- Permissions -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'permissions' }"
            data-item="permissions"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(4) != -1"
          >
            <router-link class="nav-item-hold" to="/app/permissions/list">
              <i class="nav-icon text-20 i-Check"></i>
              <span class="nav-text">Permissions</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- Values -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'values' }"
            data-item="values"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(5) != -1"
          >
            <router-link class="nav-item-hold" to="/app/values/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">Values</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- value Lists -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'value-lists' }"
            data-item="value-lists"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link class="nav-item-hold" to="/app/value-lists/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">Value Lists</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- Selfie Photo Sample -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'selfie-photo-samples' }"
            data-item="selfie-photo-samples"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link
              class="nav-item-hold"
              to="/app/selfie-photo-samples/list"
            >
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">Selfie Photo Samples</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- login questions -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'login-questions' }"
            data-item="login-questions"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link class="nav-item-hold" to="/app/login-questions/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">login Questions</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- user login questions -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'user-login-questions' }"
            data-item="user-login-questions"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link
              class="nav-item-hold"
              to="/app/user-login-questions/list"
            >
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">User login Questions</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- user notifications -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'user-notifications' }"
            data-item="user-notifications"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link
              class="nav-item-hold"
              to="/app/user-notifications/list"
            >
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">User Notifications</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- user Stories -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'user-stories' }"
            data-item="user-stories"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link class="nav-item-hold" to="/app/user-stories/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">User Stories</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- user SuperLike -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'user-superlikes' }"
            data-item="user-superlikes"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link class="nav-item-hold" to="/app/user-superlikes/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">User Superlikes</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- user Swipe -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'user-swipes' }"
            data-item="user-swipes"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link class="nav-item-hold" to="/app/user-swipes/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">User Swipes</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- user Match -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'user-matches' }"
            data-item="user-matches"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link class="nav-item-hold" to="/app/user-matches/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">User Matches</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- user Subscription -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'user-subscriptions' }"
            data-item="user-subscriptions"
            :data-submenu="true"
            v-if="this.userPermissions.indexOf(6) != -1"
          >
            <router-link class="nav-item-hold" to="/app/user-subscriptions/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">User Subscriptions</span>
            </router-link>
            <div class="triangle"></div>
          </li>
        </ul>
      </div>
    </vue-perfect-scrollbar>

    <vue-perfect-scrollbar
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      class="sidebar-left-secondary ps rtl-ps-none"
    >
      <div ref="sidebarChild">
        <!-- Submenu Dashboards -->
        <ul
          class="childNav d-none"
          data-parent="dashboards"
          :class="{ 'd-block': selectedParentMenu == 'dashboards' }"
        >
          <!-- <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v1">
              <i class="nav-icon i-Clock-3"></i>
              <span class="item-name">{{
                $t("dashboardItems.versionOne")
              }}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v2">
              <i class="nav-icon i-Clock-4"></i>
              <span class="item-name">{{
                $t("dashboardItems.versionTwo")
              }}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v3">
              <i class="nav-icon i-Over-Time"></i>
              <span class="item-name">{{
                $t("dashboardItems.versionThree")
              }}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v4">
              <i class="nav-icon i-Clock"></i>
              <span class="item-name">{{
                $t("dashboardItems.versionFour")
              }}</span>
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v5">
              <i class="nav-icon i-Clock"></i>
              <span class="item-name">Dashboard</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu Sites -->
        <ul
          class="childNav d-none"
          data-parent="sites"
          :class="{ 'd-block': selectedParentMenu == 'sites' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/sites/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/sites/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New Site</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu Users -->
        <ul
          class="childNav d-none"
          data-parent="users"
          :class="{ 'd-block': selectedParentMenu == 'users' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/users/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/users/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New User</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu Permissions -->
        <ul
          class="childNav d-none"
          data-parent="permissions"
          :class="{ 'd-block': selectedParentMenu == 'permissions' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/permissions/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu Values -->
        <ul
          class="childNav d-none"
          data-parent="values"
          :class="{ 'd-block': selectedParentMenu == 'values' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/values/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/values/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New Value</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu Value-Lists -->
        <ul
          class="childNav d-none"
          data-parent="value-lists"
          :class="{ 'd-block': selectedParentMenu == 'value-lists' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/value-lists/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu Selfie Photo Samples -->
        <ul
          class="childNav d-none"
          data-parent="selfie-photo-samples"
          :class="{ 'd-block': selectedParentMenu == 'selfie-photo-samples' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/selfie-photo-samples/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/selfie-photo-samples/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New Selfie Photo Samples</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu Login Question -->
        <ul
          class="childNav d-none"
          data-parent="login-questions"
          :class="{ 'd-block': selectedParentMenu == 'login-questions' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/login-questions/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/login-questions/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New Login Question</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu User Login Question -->
        <ul
          class="childNav d-none"
          data-parent="user-login-questions"
          :class="{ 'd-block': selectedParentMenu == 'user-login-questions' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-login-questions/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-login-questions/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New User Login Question</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu User Notification -->
        <ul
          class="childNav d-none"
          data-parent="user-notifications"
          :class="{ 'd-block': selectedParentMenu == 'user-notifications' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-notifications/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-notifications/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New User Notification</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu User Stories -->
        <ul
          class="childNav d-none"
          data-parent="user-stories"
          :class="{ 'd-block': selectedParentMenu == 'user-stories' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-stories/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-stories/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New User Story</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu User Superlikes -->
        <ul
          class="childNav d-none"
          data-parent="user-superlikes"
          :class="{ 'd-block': selectedParentMenu == 'user-superlikes' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-superlikes/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-superlikes/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New User Superlike</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu User Swipes -->
        <ul
          class="childNav d-none"
          data-parent="user-swipes"
          :class="{ 'd-block': selectedParentMenu == 'user-swipes' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-swipes/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-swipes/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New User Swipe</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu User matches -->
        <ul
          class="childNav d-none"
          data-parent="user-matches"
          :class="{ 'd-block': selectedParentMenu == 'user-matches' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-matches/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-matches/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New User Matches</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu User Subscriptions -->
        <ul
          class="childNav d-none"
          data-parent="user-subscriptions"
          :class="{ 'd-block': selectedParentMenu == 'user-subscriptions' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-subscriptions/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/user-subscriptions/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New User Subscription</span>
            </router-link>
          </li>
        </ul>
      </div>
    </vue-perfect-scrollbar>
    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
    ></div>
  </div>
  <!--=============== Left side End ================-->
</template>

<script>
// import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    // Topnav,
  },

  data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isStyle: true,
      selectedParentMenu: "",
      isMobile,
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
  },

  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties"]),
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSecondarySidebarPropertiesViaMenuItem",
      "changeSecondarySidebarPropertiesViaOverlay",
      "changeSidebarProperties",
    ]),

    handleWindowResize() {
      //  console.log('not working is Mobile');
      if (window.innerWidth <= 1200) {
        if (this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
        if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
          this.changeSecondarySidebarProperties();
        }
      } else {
        if (!this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
      }
    },
    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter((x) => x !== "")[1];

      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboards";
      }
    },
    toggleSubMenu(e) {
      let hasSubmenu = e.target.dataset.submenu;
      let parent = e.target.dataset.item;
      if (hasSubmenu) {
        this.selectedParentMenu = parent;

        this.changeSecondarySidebarPropertiesViaMenuItem(true);
      } else {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(false);
      }
    },

    removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },

    toggleSidebarDropdwon(event) {
      let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

      event.currentTarget.classList.toggle("open");

      dropdownMenus.forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    },
  },
};
</script>

<style lang="" scoped></style>
