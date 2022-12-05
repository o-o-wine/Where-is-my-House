import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import BoardView from "@/views/BoardView.vue";
import BoardList from "@/components/board/BoardListVue.vue";
import BoardCreate from "@/components/board/BoardCreateVue.vue";
import BoardDetail from "@/components/board/BoardDetailVue.vue";
import BoardModify from "@/components/board/BoardModifyVue.vue";
import store from "@/store";
Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["checkUserInfo"];
  const checkToken = store.getters["checkToken"];

  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (checkToken == false || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/fetch/news",
    name:"news-list",
    component: () => import("@/components/list/NaverNewsList"),
  },
  {
    path: "/temp",
    component: () => import("@/views/LoadingView"),
  },
  {
    path: "/board",
    name: "board",
    component: BoardView,
    children: [
      {
        path: "",
        name: "board-list",
        component: BoardList,
      },
      {
        path: "create",
        name: "board-create",
        component: BoardCreate,
        beforeEnter: onlyAuthUser,
      },
      {
        path: "modify",
        name: "board-modify",
        component: BoardModify,
        beforeEnter: onlyAuthUser,
        props: true,
      },
      {
        path: "detail",
        name: "board-detail",
        component: BoardDetail,
        props: true,
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/LoginView"),
    children: [
      {
        path: "regist",
        name: "regist",
        component: () => import("@/components/user/RegistUser"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/components/user/LoginUser"),
      },
    ],
  },
  {
    path: "/house",
    name: "house",
    component: () => import("@/views/HouseView"),
    children: [
      {
        path: "dong",
        name: "house-dong",
        component: () => import("@/components/house/DongVue"),
      },
      {
        path: "deal",
        name: "house-deal",
        component: () => import("@/components/house/HouseDealVue"),
      },
      {
        path: "map",
        name: "house-map",
        component: () => import("@/components/house/MapVue"),
      },
    ],
  },
  {
    path: "/info",
    name: "info-view",
    component: () => import("@/views/InfoView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
