import Vue from "vue";
import Vuex from "vuex";
import Http from "@/api/http.js";
import jwtDecode from "jwt-decode";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    boardList: [],
    board: [],
    hotboard: [],
    areaList: [],
    dealList: [],
    isLogin: false,
    userInfo: null,
    isValidToken: false,
    adminboard: [],
    selectedHouse: null,
    comments: [],
  },
  getters: {
    pageCnt: (state) => {
      return parseInt(state.boardList.length / 10) + 1;
    },
    checkUserInfo: (state) => {
      return state.userInfo;
    },
    checkToken: (state) => {
      return state.isValidToken;
    },
  },
  mutations: {
    GET_BOARD_LIST: (state, list) => {
      state.boardList = list.data;
    },
    UPDATE_BOARD: (state, board) => {
      state.boardList.forEach((e) => {
        if (e.bid === board.bid) {
          e = board;
        }
      });
    },
    DELETE_BOARD: (state, board) => {
      state.boardList.forEach((e, i) => {
        if (e.bid === board.bid) {
          state.boardList.splice(i, 1);
        }
      });
    },
    GET_HOT_BOARD: (state, list) => {
      state.hotboard = list.data;
    },
    GET_ADMIN_BOARD: (state, list) => {
      state.adminboard = list.data;
      console.log(state.adminboard);
    },
    READ_BOARD: (state, board) => {
      state.boardList.forEach((e) => {
        if (e.bid === board.bid) {
          e.hit = e.hit + 1;
        }
      });
    },
    GET_COMMENT: (state, data) => {
      state.comments = [];
      state.comments = data.data;
      console.log(state.comments);
    },
    ///////////////////////////////////////////////////////
    GET_AREA_LIST: (state, list) => {
      state.areaList = list.data;
    },

    GET_HOUSE_DEAL: (state, list) => {
      state.dealList = list.data;
      console.log(state.dealList);
    },

    //////////////////////////////////////////////////////
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo.data;
    },
    SET_LOGOUT: (state) => {
      state.isLogin = false;
      state.isValidToken = false;
      state.userInfo = null;
    },
  },
  actions: {
    createBoard: async ({ commit }, board) => {
      console.log(commit);
      await Http.post(`board/regist`, null, { params: board })
        .then((res) => {
          if (res.status != 200) {
            console.log("SERVER_ERROR");
          } else {
            return res;
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    readBoard: async ({ commit }, board) => {
      await Http.put(`board/read`, null, { params: board })
        .then((data) => {
          if (data.status == "200") {
            console.log("success");
            commit("READ_BOARD", board);
          } else {
            console.log("SERVER ERROR");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBoardList: async ({ commit }) => {
      await Http.get(`board/list`)
        .then((res) => {
          if (res.status != "200") {
            console.log("SERVER_ERROR");
          } else {
            return res;
          }
        })
        .then((data) => {
          commit("GET_BOARD_LIST", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getComment: async ({ commit }, bid) => {
      console.log(commit);
      await Http.get(`board/comment?bid=` + bid).then((res) => {
        if (res.status != 200) {
          console.log("SERVER_ERROR");
        } else {
          commit("GET_COMMENT", res);
        }
      });
    },
    // getBoardDetail: ({ commit }, bid) => {
    //   Http.get(`localhost:8080/myhouse/book/detail?bid=${bid}`).then(res => res.json())
    //   .then(data => {commit(`GET_BOARD_DETAIL`,data)})
    // } 컴포넌트에서 작성

    updateBoard: async ({ commit }, newBoard) => {
      await Http.put(`board/update`, null, { params: newBoard })
        .then((res) => {
          if (res.status != 200) {
            console.log("SERVER_ERROR");
          } else {
            return res;
          }
        })
        .then((data) => {
          console.log(data);
          commit("UPDATE_BOARD", newBoard);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteBoard: async ({ commit }, board) => {
      await Http.delete(`board/delete?bid=${board.bid}`)
        .then((res) => {
          if (res.status != "200") {
            console.log("SERVER_ERROR");
          } else {
            commit("DELETE_BOARD", board);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHotBoard: async ({ commit }) => {
      await Http.get(`board/hot`)
        .then((res) => {
          if (res.status != 200) {
            console.log("SERVER ERROR");
          } else {
            commit("GET_HOT_BOARD", res);
          }
        })
        .catch((err) => {
          console.log(err);
          commit("GET_HOT_BOARD", ["에러가 발생했습니다."]);
        });
    },

    getAdminBoard: async ({ commit }) => {
      await Http.get(`board/admin`)
        .then((res) => {
          if (res.status == 200) {
            commit("GET_ADMIN_BOARD", res);
          } else {
            console.log("SERVER ERROR");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ////////////////////////////////////////////////////////////////////////////
    getAreaList: async ({ commit }) => {
      await Http.get(`house/dong`)
        .then((res) => {
          if (res.status != 200) {
            console.log("SERVER ERROR");
          } else {
            return res;
          }
        })
        .then((data) => {
          commit("GET_AREA_LIST", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHouseDeal: async ({ commit }, data) => {
      await Http.get(`house/deal?code=${data.code}&year=${data.year}`)
        .then((res) => {
          if (res.status != 200) {
            console.log("SERVER ERROR");
          } else {
            return res;
          }
        })
        .then((data) => {
          commit("GET_HOUSE_DEAL", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //////////////////////////////////////////////////////////////////
    registToken: async ({ commit }, data) => {
      if (data.data.message === "SUCCESS") {
        commit("SET_IS_LOGIN", true);
        commit("SET_IS_LOGIN_ERROR", false);
        commit("SET_IS_VALID_TOKEN", true);
        console.log("success");
        sessionStorage.setItem("access-token", data.data.accessToken);
        sessionStorage.setItem("refresh-token", data.data.refreshToken);
      } else {
        console.log("fail");
        commit("SET_IS_LOGIN", false);
        commit("SET_IS_LOGIN_ERROR", true);
        commit("SET_IS_VALID_TOKEN", false);
      }
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      Http.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
      console.log(sessionStorage.getItem("access-token"));
      await Http.get(`user/info/${decodeToken.userid}`)
        .then((data) => {
          console.log(data);
          if (data != null) {
            commit("SET_USER_INFO", data);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        })
        .catch(async (error) => {
          console.log(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        });
    },
    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      Http.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token");
      await Http.post(`user/refresh`, JSON.stringify(state.userInfo))
        .then((data) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        })
        .catch(async (err) => {
          if (err.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await Http.get(`user/logout?userId=${state.userInfo.userid}`)
              .then((data) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                this.$router.push({ name: "login" });
              })
              .catch((err) => {
                console.log(err);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              });
          }
        });
      // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
    },
    async userLogout({ commit }, userId) {
      await Http.get(`user/logout?userId=${userId}`)
        .then((data) => {
          console.log(data);
          if (data.data.message === "SUCCESS") {
            commit("SET_LOGOUT");
          } else {
            console.log("유저 정보 없음!!!!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
