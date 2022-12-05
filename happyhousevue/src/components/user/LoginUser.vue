<template>
  <v-app id="inspire">
    <v-div class="login-div">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-12">
                <v-window v-model="step">
                  <v-window-item :value="1" align="center">
                    <v-row>
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="text-center display-2 text--accent-3" style="color:#0e0c32">Login
                          </h1>

                          <br><br>
                          <h4 class="text-center mt-4">아이디와 비밀번호를 입력해주세요</h4>
                          <br>

                          <v-form class="loginform">
                            <v-text-field label="id" name="id" prepend-icon="email" type="text" color="indigo darken-3"
                              style="width:400px;" v-model="id" />
                            <v-text-field id="password" label="Password" name="password" prepend-icon="lock"
                              type="password" color="indigo darken-3" style="width:400px;" v-model="pwd" />
                          </v-form>
                          <h3 class="text-center mt-4"></h3>
                          <v-btn rounded color="indigo darken-3 " dark @click="login">SIGN IN</v-btn>
                          <br /><br />
                          <b-img :src="require('@/assets/kakao_login.png')" id="kakaoLoginBtn"
                            class="d-inline-block align-top" alt="kakaoLoginBtn" scale:0.5 z-index:6
                            @click="kakaoLogin"></b-img>
                          <br>
                        </v-card-text>

                      </v-col>
                      <v-col cols="12" md="4" class="indigo darken-4 accent-3">
                        <v-card-text class="white--text mt-12">
                          <h1 class="text-center display-1">Happyhouse</h1>
                          <br>
                          <v-img max-height="150" max-width="150" src="@/assets/logo3.png"></v-img>
                          <br>
                          <h6 class="text-center">부동산 정보 조회 시스템<br>게시판<br>로그인<br>QnA<br><br>&copy; 구미 5반 2조</h6>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded outlined dark @click=movePage>SIGN UP</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-div>
  </v-app>
</template>

<script>
import Http from '@/api/http'
export default {
  name: "LoginUser",
  data() {
    return {
      isLoginError: false,
      user: {
        id: null,
        pwd: null,
      },
    };
  },
  created() {
    if (window.Kakao.isInitialized !== true)
      window.Kakao.init('304a13f50940ae3f59d453b859a1920c')
  },
  methods: {
    login: function () {
      Http.post(`http://localhost:9999/user/login`, { id: this.id, pwd: this.pwd })
        .then(res => {
          if (res.data.message == "SUCCESS") {
            this.$store.dispatch("registToken", res)
            this.$router.push("/")
            this.$toast("로그인성공!", {
              timeout: 2000
            })
          } else {
            this.$toast("아이디 혹은 비밀번호가 틀렸습니다.", {
              timeout: 2000
            })
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast("잠시후에 다시 시도해주세요.", {
            timeout: 2000
          })
        });

    },

    movePage() {
      this.$router.push({ name: "regist" });
    },

    kakaoLogin() {
      // window.Kakao.Api.login();

      // window.Kakao.Auth.authorize({
      //   redirectUri: 'http://localhost:9999/user/login',
      //   scope: "profile_nickname, profile_image, account_email, gender, birthday",
      // })

      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:8080/temp' // 인가토큰을 받는다. 이를 통해 server측에서 이를 받아 access token을 요청하고 kakao측에서 받아 이를 user에게 전달하면 유저는 이를 이용해 로그인을 유지.
      });

    }
  }
}
</script>

<style>
.mylabel {
  font-weight: bold;
}

.login-div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(@/assets/login.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.9;
}

.loginform {
  display: inline-block;
  text-align: center;
}
</style>
