<template>
  <v-app style="height: 0px">
    <v-fab-transition>
      <v-btn
        bottom
        right
        fixed
        fab
        dark
        small
        v-show="btnShow"
        @click="$vuetify.goTo('#header')"
      >
        <v-icon>fas fa-angle-double-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-app-bar app class="transparent" dark>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'main' }" class="link">
          <v-icon>mdi-home</v-icon>
        </router-link>

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <router-link :to="{ name: 'main' }" class="link">
          <v-img
            alt="ssafy Logo"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="@/assets/ssafy-logo.png"
            width="100"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <b-navbar-nav>
        <b-nav-item-dropdown v-if="!this.isLogin" style="align: center">
          <template #button-content>
            <v-btn text>
              <span class="mr-2">User</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <b-dropdown-item href="#">
            <v-icon color="#000000">mdi-account-arrow-right</v-icon>
            &nbsp;
            <v-btn id="loginbtn" @click="loginlistener">Login</v-btn>
          </b-dropdown-item>
          <br />
          <b-dropdown-item href="#">
            <v-icon color="#000000">mdi-account-credit-card</v-icon>
            &nbsp;
            <v-btn id="registbtn" @click="registlistener">Regist</v-btn>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown v-else style="align: center">
          <template #button-content>
            <v-btn text>
              <span class="mr-2">{{ userInfo.name }}</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <b-dropdown-item href="#">
            <v-icon color="#000000">mdi-account-credit-card</v-icon>
            &nbsp;
            <v-btn id="registbtn" @click="logoutlistener">Logout</v-btn>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <br /><br /><br />
          <h3>내 정보</h3>
          <br /><br />
          <div v-if="userInfo">
            <v-img
              v-if="userInfo.image"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="250"
              max-width="250"
              :src="userInfo.image"
              style="border-radius: 35%"
            >
            </v-img>
            <v-img
              v-else
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="250"
              max-width="250"
              style="border-radius: 50%"
              src="@/assets/user.png"
            >
            </v-img>
          </div>
          <div v-if="userInfo">
            <v-list-item v-if="userInfo.name">
              <v-list-item-title>이름</v-list-item-title>
              <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userInfo.gender">
              <v-list-item-title>성별</v-list-item-title>
              <v-list-item-title v-if="userInfo.gender == 'male'"
                >남자</v-list-item-title
              >
              <v-list-item-title v-else>여자</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userInfo.birthday">
              <v-list-item-title>생일</v-list-item-title>
              <v-list-item-title>{{ userInfo.birthday }}</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userInfo.id">
              <v-list-item-title>e-mail</v-list-item-title>
              <v-list-item-title>{{ userInfo.id }}</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userInfo.address">
              <v-list-item-title>주소</v-list-item-title>
              <v-list-item-title>{{ userInfo.address }}</v-list-item-title>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item>
              <v-list-item-title>로그인을 해주세요</v-list-item-title>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TheHeaderNavbar",
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
    isLogin: "getUserInfo",
  },

  methods: {
    loginlistener: function () {
      this.$router.push({ name: "login" });
    },
    registlistener: function () {
      this.$router.push({ name: "regist" });
    },
    mypagelistener: function () {},
    logoutlistener: function () {
      this.$store.dispatch("userLogout");
      this.$router.push("/");
      this.$toast("로그아웃 하였습니다.", {
        timeout: 2000,
      });
    },
    getUserInfo() {
      if (this.isLogin) {
        this.$store.dispatch(
          "getUserInfo",
          sessionStorage.getItem("access-token")
        );
      }
    },
  },
  computed: {
    ...mapState(["isLogin", "userInfo", "isValidToken"]),
  },
};
</script>

<style scoped>
.v-app-bar {
  color: rgb(0, 0, 0, 0);
}
</style>
