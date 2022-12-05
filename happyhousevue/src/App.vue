<template>
  <v-app>
    <the-header></the-header>
    <router-view />
    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TheHeader from "@/components/include/Header";
import TheFooter from "@/components/include/Footer";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
  created: {},
};
</script>

<style lang="scss">
</style>