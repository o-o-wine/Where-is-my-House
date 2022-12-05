<template>
  <v-app>
    <v-div class="outer">
      <v-div class="intro">
        <v-div class="intro-ment">
          <h3 style="color: white">1학기 최종 프로젝트</h3>
          <br />
          <h1 style="color: white">Happy house 부동산 정보 시스템</h1>
          <br />
          <h6 style="color: white">구미 5반 박종건, 이건희</h6>
          <br />
        </v-div>
        <v-div class="btn">
          <v-btn id="leftbtn" @click="boardlistener">
            게시판 바로가기 <v-icon>mdi-arrow-right-thin</v-icon>
          </v-btn>
          &nbsp;&nbsp;
          <v-btn id="rightbtn" @click="houselistener">
            부동산 정보 조회하기 <v-icon>mdi-arrow-right-thin</v-icon>
          </v-btn>
        </v-div>
      </v-div>
    </v-div>
    <v-div class="content">
      <v-div class="content-el-intro">
        <h5 style="color: #3f51b5">F I N A L &nbsp; P R O J E C T</h5>
        <br />
        <h2 style="font-weight: bold">부동산 정보 조회</h2>
        <h2 style="color: #1a237e; font-weight: bold">&nbsp;HAPPY HOUSE</h2>
        <br />
        부동산 정보 제공 및 게시판 기능을 지원합니다.<br /><br />
        <v-btn id="git-btn" color="white">
          <v-icon>fab fa-github</v-icon> GIT
          <v-icon>mdi-arrow-right-thin</v-icon>
        </v-btn>
      </v-div>
      <v-div class="content-el">
        <h5 style="color: #3f51b5; font-weight: light">01</h5>
        <v-btn id="circle-btn" color="white" @click="houselistener">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <br /><br />
        <h4 style="color: #3f51b5">부동산 정보</h4>
        <br />
        <h6>
          OpenApi를 활용하여<br />사용자에게<br />부동산 정보를 제공합니다.
        </h6>
      </v-div>
      <v-div class="content-el">
        <h5 style="color: #3f51b5; font-weight: light">02</h5>
        <v-btn id="circle-btn" color="white" @click="boardlistener">
          <v-icon>mdi-bulletin-board</v-icon>
        </v-btn>
        <br /><br />
        <h4 style="color: #3f51b5">게시판</h4>
        <br />
        <h6>DB를 활용하여<br />사용자에게<br />소통 수단을 제공합니다.</h6>
      </v-div>
      <v-div class="content-el">
        <h5 style="color: #3f51b5; font-weight: light">03</h5>
        <v-btn id="circle-btn" color="white" @click="newslistener">
          <v-icon>mdi-help</v-icon>
        </v-btn>
        <br /><br />
        <h4 style="color: #3f51b5">부동산 뉴스</h4>
        <br />
        <h6>최근 부동산 관련 뉴스를<br />제공합니다.</h6>
      </v-div>
    </v-div>
  </v-app>
</template>

<script>
export default {
  name: "MainView",
  props: {
    msg: String,
  },
  methods: {
    houselistener: function () {
      this.$router.push({ name: "house-map" });
    },
    boardlistener: function () {
      this.$router.push({ name: "board-list" });
    },
    newslistener: function () {
      this.$router.push({ name: "news-list" });
    },
  },
};
</script>

<style scoped>
.outer {
  margin: 0 auto;
  align-items: center;

  background-image: url(@/assets/city-black.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.9;

  width: 100%;
  height: 65%;
}

#circle-btn {
  border: 1px solid rgb(47, 40, 144);
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 24px;
  line-height: 1.33;
}

#leftbtn {
  border: 1px solid white;
  background-color: rgb(0, 0, 0, 0);
  color: white;
  font-weight: lighter;
  width: 200px;
  height: 50px;
  font-size: 15px;
  font-family: sans-serif;
}

#rightbtn {
  border: 1px solid white;
  background-color: rgba(77, 77, 77, 0.4);
  color: white;
  font-weight: lighter;
  width: 200px;
  height: 50px;
  font-size: 15px;
  font-family: sans-serif;
}

.content {
  margin: auto;
  width: 80%;
  height: 35%;
}

.content-el-intro {
  float: left;
  text-align: left;
  width: 40%;
  height: 100%;
  border-left: 1px solid rgb(228, 228, 228);
  border-right: 1px solid rgb(228, 228, 228);
  padding-top: 40px;
  padding-left: 40px;
}

.content-el {
  float: left;
  text-align: center;
  width: 20%;
  height: 100%;
  border-right: 1px solid rgb(228, 228, 228);
  padding-top: 40px;
}

.intro {
  position: absolute;
  left: 10%;
  top: 20%;
}
</style>