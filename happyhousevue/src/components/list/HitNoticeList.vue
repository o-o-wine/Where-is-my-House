<template>
  <!--메인 div-->
  <v-div class="list-component">
    <v-data-table :headers="headers" :items="adminboard" disable-sort :items-per-page="itemsPerPage" hide-default-footer
      dark class="elevation-1 transparent" style="width:590px" @click:row="clickRow">
      <template v-slot:top>
        <v-toolbar flat class="transparent" style="color:white; font-weight: bold;">
          <v-toolbar-title>공지사항</v-toolbar-title>
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
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    itemsPerPage: 3,
    headers: [
      { text: "공지사항", value: "title", width: "40%", align: "center" },
      { text: "작성자", value: "writer", width: "20%", align: 'center' },
      { text: "작성일", value: "date", width: "20%", align: 'center' },
      { text: "조회수", value: "hit", width: "20%", align: 'center' },
    ],
    BoardList: [],
    defaultItem: {
      title: "",
      writer: 0,
      date: 0,
      hit: 0,
    },
  }),

  computed: {
    ...mapState(['adminboard']),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.$store.dispatch("getAdminBoard");
  },
  methods: {
    clickRow(board) {

      this.$store.dispatch("readBoard", { bid: board.bid, title: board.title, writer: board.writer, hit: board.hit, content: board.content, date: board.date });
      this.$router.push({ name: "board-detail", params: { bid: board.bid, title: board.title, writer: board.writer, hit: board.hit, content: board.content, date: board.date } })

    }
  }


};
</script>

<style scoped>
.v-card {
  white-space: nowrap;
}
</style>