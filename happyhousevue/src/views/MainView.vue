<template>
  <v-app>
    <div id="fullpage">
      <div class="section">
        <main-form></main-form>
      </div>
    </div>
  </v-app>
</template>

<script>
import MainForm from "@/components/include/MainForm.vue";

export default {
  name: "MainView",
  components: {
    MainForm,
  },
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
  },
};
</script>

<style scoped>
.outer {
  margin: 0 auto;
  align-items: center;

  background-image: url(../assets/city-black.png);
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