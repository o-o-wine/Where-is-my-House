<template>
  <v-app class="outer-info">
    <v-div class="map-wrap" style="z-index: 0">
      <br /><br /><br />
      <h2 style="color: white; font-weight: bold">부동산 정보 검색</h2>
      <br /><br />
      <v-div class="align-map-el">
        <v-div class="sitem">
          <v-div class="select-items">
            <h5 style="color: white">City</h5>
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
            <h5 style="color: white">Ward</h5>
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
            <select
              id="dongType"
              class="items"
              v-model="selectedDong"
              @change="getYear"
            >
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

        <v-div class="search-v">
          <v-div
            style="display: flex; justify-content: center; align-items: center"
          >
            <v-div style="float: left">
              <h5 style="color: white; font-weight: bold">편의점</h5>
            </v-div>
            <v-checkbox
              class=""
              color="red"
              v-model="convenienceCheck"
              @click="displaySearchConvenience()"
              v-if="select"
              >편의점
            </v-checkbox>
          </v-div>
          <br /><br />
          <v-div
            style="display: flex; justify-content: center; align-items: center"
          >
            <v-div style="float: left">
              <h5 style="color: white; font-weight: bold">카페</h5></v-div
            >
            <v-checkbox
              color="success"
              v-model="cafeCheck"
              @click="displaySearchCafe()"
              v-if="select"
              >카페
            </v-checkbox>
          </v-div>
          <br /><br />
          <v-div
            style="display: flex; justify-content: center; align-items: center"
          >
            <v-div style="float: left">
              <h5 style="color: white; font-weight: bold">음식점</h5></v-div
            >
            <v-checkbox
              color="orange"
              v-model="restaurantCheck"
              @click="displaySearchRestaurant()"
              v-if="select"
              >음식점
            </v-checkbox>
          </v-div>
          <br /><br />
          <v-div
            style="display: flex; justify-content: center; align-items: center"
          >
            <v-div style="float: left">
              <h5 style="color: white; font-weight: bold">은행</h5></v-div
            >
            <v-checkbox
              color="secondary"
              v-model="bankCheck"
              @click="displaySearchBank()"
              v-if="select"
              >은행
            </v-checkbox>
          </v-div>
        </v-div>
        <div id="map"></div>
      </v-div>
      <MapSideBar class="side-bar" />
    </v-div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import MapSideBar from "@/components/include/MapSideBar";

export default {
  name: "KakaoMap",
  components: {
    MapSideBar,
  },
  data() {
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
      select: false,
      markers: [],
      marker: null,
      selectHouse: null,
      convenience: [],
      convenienceCheck: false,
      bank: [],
      bankCheck: false,
      cafe: [],
      cafeCheck: false,
      restaurant: [],
      restaurantCheck: false,
    };
  },
  computed: {
    ...mapState(["areaList"]),
    ...mapState(["dealList"]),
    ...mapState(["selectedHouse"]),
  },
  watch: {
    selectedHouse: "moveLocation",
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
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=a89d13932147a2bb213d1a03666f02b8&autoload=false&libraries=services,clusterer,drawing";
      script.onload = () => kakao.maps.load(this.initMap);
      document.head.appendChild(script);
    }
  },

  methods: {
    displaySearchBank() {
      if (this.bankCheck) {
        var ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다

        if (this.bank.length > 0) {
          this.bank.forEach((marker) => marker.setMap(null));
        }

        ps.keywordSearch(
          `${this.selectedGugun} ${this.selectedDong} 은행`,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              var imageSrc = require("@/assets/black_marker.png"), // 마커이미지의 주소입니다
                imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
                imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

              // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
              var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
              );

              for (var i = 0; i < data.length; i++) {
                this.bank.push(
                  new kakao.maps.Marker({
                    map: this.map,
                    position: new kakao.maps.LatLng(data[i].y, data[i].x),
                    image: markerImage,
                  })
                );
              }
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            }
          }
        );
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      } else {
        this.bank.forEach((e) => {
          e.setMap(null);
        });
      }
    },
    displaySearchRestaurant() {
      if (this.restaurantCheck) {
        var ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다

        if (this.restaurant.length > 0) {
          this.restaurant.forEach((marker) => marker.setMap(null));
        }

        ps.keywordSearch(
          `${this.selectedGugun} ${this.selectedDong} 맛집`,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              var imageSrc = require("@/assets/yellow_marker.png"), // 마커이미지의 주소입니다
                imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
                imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

              // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
              var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
              );

              for (var i = 0; i < data.length; i++) {
                this.restaurant.push(
                  new kakao.maps.Marker({
                    map: this.map,
                    position: new kakao.maps.LatLng(data[i].y, data[i].x),
                    image: markerImage,
                  })
                );
              }
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            }
          }
        );
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      } else {
        this.restaurant.forEach((e) => {
          e.setMap(null);
        });
      }
    },
    displaySearchConvenience() {
      if (this.convenienceCheck) {
        var ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다

        if (this.convenience.length > 0) {
          this.convenience.forEach((marker) => marker.setMap(null));
        }

        ps.keywordSearch(
          `${this.selectedGugun} ${this.selectedDong} 편의점`,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              var imageSrc = require("@/assets/red_marker.png"), // 마커이미지의 주소입니다
                imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
                imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

              // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
              var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
              );

              for (var i = 0; i < data.length; i++) {
                this.convenience.push(
                  new kakao.maps.Marker({
                    map: this.map,
                    position: new kakao.maps.LatLng(data[i].y, data[i].x),
                    image: markerImage,
                  })
                );
              }
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            }
          }
        );
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      } else {
        this.convenience.forEach((e) => {
          e.setMap(null);
        });
      }
    },
    displaySearchCafe() {
      if (this.cafeCheck) {
        var ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다

        if (this.cafe.length > 0) {
          this.cafe.forEach((marker) => marker.setMap(null));
        }

        ps.keywordSearch(
          `${this.selectedGugun} ${this.selectedDong} 카페`,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              var imageSrc = require("@/assets/green_marker.png"), // 마커이미지의 주소입니다
                imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
                imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

              // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
              var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
              );

              for (var i = 0; i < data.length; i++) {
                this.cafe.push(
                  new kakao.maps.Marker({
                    map: this.map,
                    position: new kakao.maps.LatLng(data[i].y, data[i].x),
                    image: markerImage,
                  })
                );
              }
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            }
          }
        );
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      } else {
        this.cafe.forEach((e) => {
          e.setMap(null);
        });
      }
    },
    moveLocation() {
      console.log(this.selectedHouse);
      // 이동할 위도 경도 위치를 생성합니다
      var moveLatLon = new kakao.maps.LatLng(
        this.selectedHouse.lat,
        this.selectedHouse.lng
      );

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      this.map.panTo(moveLatLon);
      // this.markers = [];
      var markerPosition = new kakao.maps.LatLng(
        this.selectedHouse.lat,
        this.selectedHouse.lng
      );
      // 마커를 생성합니다
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      if (this.marker != null) {
        this.marker.setMap(null);
      }
      this.marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      // 마커가 지도 위에 표시되도록 설정합니다

      this.marker.setMap(this.map);

      // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    },
    showSideBar() {
      this.isVisibleSideBar = !this.isVisibleSideBar;
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      this.displayMarker();
      this.map.relayout();
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker() {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      this.markers = [];
      const positions = [];
      const latlng = [];

      this.dealList.forEach((e) => {
        latlng.push({ name: e.apartmentName, lat: e.lat, lng: e.lng });
      });

      const getUniqueArrayByKey = function (data, key) {
        return [...new Map(data.map((item) => [item[key], item])).values()];
      };

      const set = Array.from(getUniqueArrayByKey(latlng, "lat"));

      set.map((e) => {
        positions.push(new kakao.maps.LatLng(e.lat, e.lng));
      });

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }

      this.markers.forEach((e, idx) => {
        // 마커에 마우스오버 이벤트를 등록합니다
        var iwContent = `<div style="padding:5px;">${set[idx].name}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        kakao.maps.event.addListener(e, "mouseover", () => {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(this.map, e);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        kakao.maps.event.addListener(e, "mouseout", () => {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          infowindow.close();
        });

        kakao.maps.event.addListener(e, "click", () => {
          const lat = e.getPosition().La;
          const lng = e.getPosition().Ma;
          alert(`https://map.kakao.com/link/map/${lat},${lng}`);
          window.location.href = `https://map.kakao.com/link/to/카카오판교오피스,${lat},${lng}`;
        });
      });
    },

    getGugun(sido) {
      let val = sido.currentTarget.value;
      this.gugun = new Set();
      this.select = false;
      this.selectedGugun = "구/군선택";
      this.gugun.add("구/군선택");
      this.dong = new Set();
      this.dong.add("동선택");
      this.selectedDong = "동선택";
      this.year = [
        `거래년도 선택`,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
      ];
      this.selectedYear = "거래년도 선택";
      this.areaList.forEach((e) => {
        if (e.sidoName === val) {
          if (e.gugunName !== null) this.gugun.add(e.gugunName);
        }
      });
    },
    getDong(gugun) {
      let val = gugun.currentTarget.value;
      this.select = false;
      this.dong = new Set();
      this.dong.add("동선택");
      this.year = [
        `거래년도 선택`,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
      ];
      this.selectedYear = "거래년도 선택";
      this.selectedDong = "동선택";
      this.areaList.forEach((e) => {
        if (e.gugunName === val) {
          if (e.dongName !== null) this.dong.add(e.dongName);
        }
      });
    },
    getYear() {
      this.select = false;
      this.year = [
        `거래년도 선택`,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
      ];
      this.selectedYear = "거래년도 선택";
    },

    async getHouseDeal() {
      let val = this.selectedDong;
      let code = 0;

      this.areaList.forEach((e) => {
        if (e.dongName === val) {
          code = e.dongCode;
        }
      });
      this.select = true;
      let data = { code: code, year: this.selectedYear };
      await this.$store.dispatch("getHouseDeal", data);
      this.displayMarker();
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  z-index: 2;
}

.side-bar {
  z-index: 999;
}

#map {
  z-index: 2;
  width: 1000px;
  height: 600px;
  border-radius: 20px;
  outline-style: ridge;
  outline-color: rgb(255, 255, 255);
}

.align-map-el {
  text-align: center;
  margin: 0 auto;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

.outer-info {
  margin: 0 auto;
  align-items: center;

  background-image: url(@/assets/city-black.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.9;

  width: 100%;
  height: 100%;
}

.map-wrap {
  margin: auto;
  text-align: center;
}

.map-list {
  display: flex;
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
  width: 60%;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  height: 40px;
  font-size: 15px;
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

.search-v {
  position: absolute;
  left: 15%;
  top: 40%;
  margin: auto;
  text-align: center;
}
</style>
