<template>
  <!--메인 div-->
  <v-div class="list-component">
    <v-data-table
      :headers="headers"
      :items="HouseList"
      disable-sort
      :items-per-page="itemsPerPage"
      hide-default-footer
      dark
      class="elevation-1 transparent"
      style="width: 690px"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          class="transparent"
          style="color: white; font-weight: bold"
        >
          <v-toolbar-title>인기 부동산 정보</v-toolbar-title>
          <v-divider class="mx-4" dark inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
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
</template>

<script>
export default {
  data: () => ({
    itemsPerPage: 5,
    headers: [
      { text: "시도", value: "sidoName", width: "17%", align: "center" },
      { text: "구군", value: "gugunName", width: "17%", align: "center" },
      { text: "동", value: "DongName", width: "16%", align: "center" },
      {
        text: "아파트이름",
        value: "apartmentName",
        width: "30%",
        align: "center",
      },
      { text: "가격", value: "price", width: "20%", align: "center" },
    ],
    HouseList: [],
    defaultItem: {
      sidoName: "",
      gugunName: "",
      DongName: "",
      apartmentName: "",
      price: 0,
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.HouseList = [
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
        {
          sidoName: "서울특별시",
          gugunName: "성북구",
          DongName: "삼선로",
          apartmentName: "자이",
          price: 1110,
        },
      ];
    },
  },
};
</script>

<style scoped>
</style>