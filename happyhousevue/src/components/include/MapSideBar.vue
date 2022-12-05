<template>
  <div class="side-bar-wrapper">
    <VueResizable class="resizable-side-bar" :width="1000" :max-width="Infinity" :height="550" :min-height="100"
      :active="['l']" z-index="999" v-if="isVisibleSideBar">
      <div class="side-bar">
        <v-div class="list-component" style="text-align:center">
          <v-data-table :headers="headers" :items="list" disable-sort :items-per-page="itemsPerPage" dark
            class="elevation-1 transparent" style="width:1000px" @click:row="clickRow">
            <template v-slot:top>
              <v-toolbar flat class="transparent" style="color:white; font-weight: bold;">
                <v-toolbar-title>선택 지역 부동산 정보</v-toolbar-title>
                <v-divider class="mx-4" dark inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="1000px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="transparent" dark class="mb-2" v-bind="attrs" v-on="on">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-div>
      </div>
    </VueResizable>
    <BButton class="side-bar-active-btn" size="sm" @click="showSideBar">
      {{ isVisibleSideBar ? '리스트 닫기' : '리스트 열기' }}
    </BButton>
  </div>
</template>

<script>
import VueResizable from 'vue-resizable';
import { mapState } from "vuex";

export default {
  name: 'MapSideBar',
  components: {
    VueResizable
  },
  data() {
    return {
      isVisibleSideBar: false,
      itemsPerPage: 7,
      list: [],
      headers: [
        { text: "주소", value: "address", width: "20%", align: "center" },
        { text: "아파트", value: "apartmentName", width: "15%", align: 'center' },
        { text: "층수", value: "floor", width: "10%", align: 'center' },
        { text: "건설년도", value: "buildYear", width: "10%", align: 'center' },
        { text: "면적", value: "area", width: "10%", align: 'center' },
        { text: "금액(천만)", value: "price", width: "10%", align: 'center' },
        { text: "거래일", value: "date", width: "25%", align: 'center' },

      ],
      defaultItem: {

      },
    }
  },

  watch: {
    'dealList': "changeList",
  },
  computed: {
    ...mapState(['dealList']),
  },
  methods: {
    showSideBar() {
      this.isVisibleSideBar = !this.isVisibleSideBar;
    },
    changeList() {
      this.list = []
      this.dealList.forEach((e, index) => {
        this.list.push({
          aptCode: e.aptCode,
          address: e.dong + " " + e.jibun + " " + e.roadName,
          apartmentName: e.apartmentName,
          floor: e.floor,
          buildYear: e.buildYear,
          area: e.area,
          date: e.dealYear + ". " + e.dealMonth + ". " + e.dealDay,
          price: e.price,
          lat: e.lat,
          lng: e.lng,
          idx: index,
        });
      })
    },
    clickRow(item) {
      this.$store.state.selectedHouse = item
    }
  },

}
</script>

<style lang="scss" scoped>
.side-bar-wrapper {
  z-index: "-1";
  display: flex;
  position: absolute;
  right: 0%;
  top: 20%;

  >.resizable-side-bar {
    >.side-bar {
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 10px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  >.side-bar-active-btn {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    padding: 0;
    border: none;
    border-radius: 10px;
    color: #fff;
    opacity: 1;
    width: 100px;
    height: 40px;
  }
}
</style>