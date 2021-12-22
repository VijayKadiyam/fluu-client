<template>
  <div
    :style="{ backgroundImage: 'url(' + bgImage + ')' }"
  >
    
    <router-view></router-view>

    <customizer></customizer>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      bgImage: require("@/assets/images/photo-wide-4.jpg"),
    };
  },
  computed: {
    ...mapGetters(["getThemeMode"]),
    themeName() {
      return this.getThemeMode.dark ? "dark-theme" : " ";
    },
    rtl() {
      return this.getThemeMode.rtl ? "rtl" : " ";
    }
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "FLUU",
      // all titles will be injected into this template
      titleTemplate: "%s | FLUU",
      bodyAttrs: {
        class: [this.themeName, "text-left"]
      },
      htmlAttrs: {
        dir: this.rtl
      }
    };
  }
};
</script>

<style>
  .main-content-wrap {
    background: transparent !important;
  }
</style>


