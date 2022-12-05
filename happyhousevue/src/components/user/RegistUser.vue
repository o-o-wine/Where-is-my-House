<template>
  <v-app id="inspire">
    <v-div class="regist-div">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-12">
                <v-window v-model="step">
                  <v-window-item :value="1" align="center">
                    <v-row class="fill-height">
                      <v-col cols="12" md="4" class="light-blue darken-4">
                        <v-card-text class="white--text mt-12">
                          <h1 class="text-center display-1">Regist</h1>
                          <br><br>
                          <v-img max-height="150" max-width="150" src="@/assets/logo3.png"></v-img>
                          <br><br>
                          <h6 class="text-center">부동산 정보 조회 시스템<br>게시판<br>로그인<br>QnA<br><br><br>&copy; 구미 5반 2조</h6>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                        </div>
                      </v-col>

                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="text-center display-2 text--accent-3" style="color:#01579B">Create Account</h1>
                          <br><br>
                          <h4 class="text-center mt-4">회원가입을 위해 회원정보를 입력해주세요</h4>
                          <br>
                          <v-form>
                            <v-text-field label="Name" name="Name" prepend-icon="person" type="text"
                              color="light-blue darken-4" style="width:400px;" v-model="name" />
                            <v-text-field label="Email" name="Email" prepend-icon="email" type="text"
                              color="light-blue darken-4" style="width:400px;" v-model="id" />
                            <v-text-field id="password" label="Password" name="password" prepend-icon="lock"
                              type="password" color="light-blue darken-4" style="width:400px;" v-model="password" />
                            <v-text-field id="address" label="address" name="address" prepend-icon="home" type="text"
                              color="light-blue darken-4" style="width:400px;" v-model="address" />
                          </v-form>
                        </v-card-text>
                        <div class="text-center mt-n5">
                          <v-btn rounded color="light-blue darken-4" dark @click="signup">SIGN UP</v-btn>
                        </div>
                        <div>
                          <br>
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
import Http from '@/api/http.js';

export default {
  name: 'RegistUser',
  data() {
    return {
      id: '',
      password: '',
      name: '',
      address: '',

    };
  },
  methods: {
    signup() {

      const data = {
        id: this.id,
        name: this.name,
        pwd: this.password,
        address: this.address,
      }
      if (this.id == null || this.password == null || !this.name == null || !this.address == null) {
        alert('모든 빈칸을 채워주세요!')
      }

      Http.post('user/regist', data)
        .then(res => {
          if (res.status === 200) {
            // 성공적으로 회원가입이 되었을 경우
            this.$toast("성공적으로 가입하였습니다.", {
              timeout: 2000
            })
            this.$router.push({ name: 'login' });
          }
        });
    }
  }
};
</script>

<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.btn-lg {
  width: 100%;
}

.regist-div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(@/assets/regist.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.9;
}
</style>
