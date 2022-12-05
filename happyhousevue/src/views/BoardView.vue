<template>
  <v-app class="board-list-div">
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["boardList"]),
    ...mapGetters(["boardCnt"]),
  },
  created() {
    console.log("created");
    this.$store.dispatch("getBoardList");
  },
};
</script>

<style scoped>
.board-list-div {
  align-items: center;
  text-align: center;

  background-image: url(@/assets/board.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.9;

  width: 100%;
  height: 100%;
}
</style>