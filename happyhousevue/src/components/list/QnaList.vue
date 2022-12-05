<template>
  <!--메인 div-->
  <v-div class="list-component">
    <v-data-table
      :headers="headers"
      :items="QnAList"
      disable-sort
      :items-per-page="itemsPerPage"
      hide-default-footer
      dark
      class="elevation-1 transparent"
      style="width: 590px"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          class="transparent"
          style="color: white; font-weight: bold"
        >
          <v-toolbar-title>QnA 게시판</v-toolbar-title>
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
      { text: "문의사항", value: "name", width: "40%", align: "center" },
      { text: "작성자", value: "writer", width: "20%", align: "center" },
      { text: "작성일", value: "date", width: "20%", align: "center" },
      { text: "조회수", value: "hit", width: "20%", align: "center" },
    ],
    QnAList: [],
    defaultItem: {
      name: "",
      writer: 0,
      date: 0,
      hit: 0,
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
      this.QnAList = [
        {
          name: "버튼이 안되요",
          writer: "asd123",
          date: "22.11.21",
          hit: 24,
        },
        {
          name: "집에 갈래요",
          writer: "Lee",
          date: "22.11.21",
          hit: 28,
        },
        {
          name: "프로젝트 굿,,,",
          writer: "Lee",
          date: "22.11.21",
          hit: 42,
        },
        {
          name: "삶이 힘들어요",
          writer: "Lee",
          date: "22.11.21",
          hit: 27,
        },
        {
          name: "님들 머함?",
          writer: "Lee",
          date: "22.11.21",
          hit: 31,
        },
        {
          name: "알빠노",
          writer: "Lee",
          date: "22.11.21",
          hit: 57,
        },
      ];
    },
  },
};
</script>

<style scoped>
</style>