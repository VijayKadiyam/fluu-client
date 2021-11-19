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
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Bar-Chart"></i>
              <span class="nav-text">{{ $t("dashboard") }}</span>
            </a>

            <div class="triangle"></div>
          </li>
          <!-- Site -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'sites' }"
            data-item="sites"
            :data-submenu="true"
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
          >
            <router-link class="nav-item-hold" to="/app/value-lists/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">Value Lists</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- viq chapters -->
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'viq-chapters' }"
            data-item="viq-chapters"
            :data-submenu="true"
          >
            <router-link class="nav-item-hold" to="/app/viq-chapters/list">
              <i class="nav-icon text-20 i-Diploma-2"></i>
              <span class="nav-text">Viq Chapters</span>
            </router-link>
            <div class="triangle"></div>
          </li>
          <!-- Vessels -->
          <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'vessels' }"
            class="nav-item"
            data-item="vessels"
            :data-submenu="true"
          >
            <router-link class="nav-item-hold" to="/app/vessels/list">
              <i class="nav-icon i-Bar-Chart"></i>
              <span class="nav-text">Vessels</span>
            </router-link>

            <div class="triangle"></div>
          </li>
          <!-- Near Misses -->
          <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'near-misses' }"
            class="nav-item"
            data-item="near-misses"
            :data-submenu="true"
          >
            <router-link class="nav-item-hold" to="/app/near-misses/list">
              <i class="nav-icon i-Bar-Chart"></i>
              <span class="nav-text">Near Misses</span>
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
          <li class="nav-item">
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
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v5">
              <i class="nav-icon i-Clock"></i>
              <span class="item-name">Dashboard Five</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/dashboards/dashboard.v6">
              <i class="nav-icon i-Clock"></i>
              <span class="item-name">Dashboard Six</span>
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
        <!-- Submenu Vessel -->
        <ul
          class="childNav d-none"
          data-parent="vessels"
          :class="{ 'd-block': selectedParentMenu == 'vessels' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/vessels/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/vessels/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New Vessel</span>
            </router-link>
          </li>
        </ul>
        <!-- Submenu Near Misses -->
        <ul
          class="childNav d-none"
          data-parent="near-misses"
          :class="{ 'd-block': selectedParentMenu == 'near-misses' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/near-misses/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/near-misses/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New Near Miss</span>
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
        <!-- Submenu Viq chapters -->
        <ul
          class="childNav d-none"
          data-parent="viq-chapters"
          :class="{ 'd-block': selectedParentMenu == 'viq-chapters' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/viq-chapters/list">
              <i class="nav-icon i-File-Clipboard-Text--Image"></i>
              <span class="item-name">Listing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/viq-chapters/create">
              <i class="nav-icon i-Split-Vertical"></i>
              <span class="item-name">Add New Viq Chapters</span>
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
