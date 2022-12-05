<template>
  <v-div style="height: 100px; background-color: rgb(1, 1, 1, 0.5)">
    <v-data-table :headers="headers" :items="comments" :items-per-page="itemsPerPage" disable-sort item-key="name" dark
      width:400px class="elevation-1 transparent"></v-data-table>
  </v-div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({


    itemsPerPage: 3,
    headers: [
      { text: "작성자", value: "writer", width: "20%", align: "center" },
      { text: "내용", value: "content", width: "60%", align: "center" },
      { text: "날짜", value: "date", width: "20%", align: "center" },
    ],

    defaultItem: {
      writer: "",
      comment: "",
    },
  }),

  props: {
    bid: Number,
  },
  computed: {
    ...mapState(['comments']),
  },
  async created() {
    await this.$store.dispatch("getComment", this.bid);
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    clickRow(board) {
      this.$store.dispatch("readBoard", {
        bid: board.bid,
        title: board.title,
        writer: board.writer,
        hit: board.hit,
        content: board.content,
        date: board.date,
      });
      this.$router.push({
        name: "board-detail",
        params: {
          bid: board.bid,
          title: board.title,
          writer: board.writer,
          hit: board.hit,
          content: board.content,
          date: board.date,
        },
      });
    },
  },
};
</script>

<style scoped>

</style>
