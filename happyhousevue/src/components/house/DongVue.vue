<template>
  <v-app>
    <v-div class="dong-div">
      <v-div class="intro-to">
        <h3 style="color: white">
          <v-icon color="white" size="70">mdi-home</v-icon><br /><br />부동산
          정보 조회 시스템<br /><br /><br />
        </h3>
      </v-div>
      <v-div class="sitem">
        <v-div class="select-items">
          <h3 style="color: white">City</h3>
          <select
            id="sidoType"
            class="items"
            v-model="selectedSido"
            @change="getGugun"
          >
            <option
              v-for="(item, index) in sido"
              :key="index"
              style="color: black"
            >
              {{ item }}
            </option>
          </select>
        </v-div>

        <v-div class="select-items">
          <h3 style="color: white">Ward</h3>
          <select
            id="gugunType"
            class="items"
            @change="getDong"
            v-model="selectedGugun"
          >
            <option
              v-for="(item, index) in gugun"
              :key="index"
              style="color: black"
            >
              {{ item }}
            </option>
          </select>
        </v-div>

        <v-div class="select-items">
          <h5 style="color: white">Dong</h5>
          <select id="dongType" class="items" v-model="selectedDong">
            <option
              v-for="(item, index) in dong"
              :key="index"
              style="color: black"
            >
              {{ item }}
            </option>
          </select>
          <br /><br />
        </v-div>

        <v-div class="select-items">
          <h5 style="color: white">거래년도</h5>
          <select
            id="yaerType"
            class="items"
            v-model="selectedYear"
            @change="getHouseDeal"
          >
            <option
              v-for="(item, index) in year"
              :key="index"
              style="color: black"
            >
              {{ item }}
            </option>
          </select>
          <br /><br />
        </v-div>
      </v-div>
    </v-div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      isVisibleSideBar: true,
      sido: null,
      gugun: null,
      dong: null,
      year: [`거래년도 선택`, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
      selectedSido: "시/도선택",
      selectedGugun: "구/군선택",
      selectedDong: "동선택",
      selectedYear: "거래년도 선택",
      markers: [],
    };
  },
  computed: {
    ...mapState(["areaList"]),
  },
  async created() {
    await this.$store.dispatch("getAreaList");
    this.sido = new Set();
    this.selectedSido = "시/도선택";
    this.sido.add("시/도선택");
    this.gugun = new Set();
    this.selectedGugun = "구/군선택";
    this.gugun.add("구/군선택");
    this.dong = new Set();
    this.selectedDong = "동선택";
    this.dong.add("동선택");
    this.areaList.forEach((e) => {
      this.sido.add(e.sidoName);
    });
  },
  methods: {
    getGugun(sido) {
      let val = sido.currentTarget.value;
      this.gugun = new Set();
      this.selectedGugun = "구/군선택";
      this.gugun.add("구/군선택");
      this.dong = new Set();
      this.dong.add("동선택");
      this.selectedDong = "동선택";
      this.areaList.forEach((e) => {
        if (e.sidoName === val) {
          if (e.gugunName !== null) this.gugun.add(e.gugunName);
        }
      });
    },
    getDong(gugun) {
      let val = gugun.currentTarget.value;
      this.dong = new Set();
      this.dong.add("동선택");
      this.selectedDong = "동선택";
      this.areaList.forEach((e) => {
        if (e.gugunName === val) {
          if (e.dongName !== null) this.dong.add(e.dongName);
        }
      });
    },
    async getHouseDeal() {
      let val = this.selectedDong;
      let code = 0;

      this.areaList.forEach((e) => {
        if (e.dongName === val) {
          code = e.dongCode;
        }
      });
      let data = { code: code, year: this.selectedYear };
      await this.$store.dispatch("getHouseDeal", data);
      this.$router.push({ name: "house-deal" });
    },
  },
};
</script>

<style scoped>
.dong-div {
  text-align: center;
  display: flex;
  justify-content: center;
  background-image: url(@/assets/dong.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.9;
}

.sitem {
  align-items: center;
  width: 70%;
  height: 0%;
  margin: auto;
}

.select-items {
  align-items: center;
  float: left;
  width: 25%;
}

.items {
  align-items: center;
  width: 70%;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  height: 70px;
  font-size: 20px;
  color: white;
  line-height: 20px;
  text-align: center;
}

.items:focus {
  border: 1px solid #6274bd;
  box-sizing: border-box;
  border-radius: 10px;
  outline: 3px solid #f8e4ff;
  border-radius: 10px;
}

.intro-to {
  position: absolute;
  margin-top: 10%;
  display: flex;
}
</style>
