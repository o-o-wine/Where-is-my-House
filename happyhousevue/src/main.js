import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/toast";
import "@/api/font-icon.js";
import "@/api/vueBootstrap.js";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
    
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
