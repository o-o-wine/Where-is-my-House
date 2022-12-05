<template>
  <div class="row-write">
    <h2 style="font-weight: bold; color: white">상 세 보 기</h2>
    <br />
    <div
      class=""
      style="border-radius: 10px; background-color: rgb(0, 0, 0, 0.5)"
    >
      <table
        class="table"
        style="border-radius: 10px; color: rgb(255, 255, 255, 0.9)"
      >
        <tr>
          <th
            width="20%"
            class="text-center"
            style="border-right: 1px solid rgb(255, 255, 255, 0.3)"
          >
            번호
          </th>
          <td
            width="30%"
            class="text-center"
            style="border-right: 1px solid rgb(255, 255, 255, 0.3)"
          >
            {{ board.bid }}
          </td>
          <th
            width="20%"
            class="text-center"
            style="border-right: 1px solid rgb(255, 255, 255, 0.3)"
          >
            작성일
          </th>
          <td width="30%" class="text-center">{{ board.date }}</td>
        </tr>
        <tr>
          <th
            width="20%"
            class="text-center"
            style="border-right: 1px solid rgb(255, 255, 255, 0.3)"
          >
            이름
          </th>
          <td
            width="30%"
            class="text-center"
            style="border-right: 1px solid rgb(255, 255, 255, 0.3)"
          >
            {{ board.writer }}
          </td>
          <th
            width="20%"
            class="text-center"
            style="border-right: 1px solid rgb(255, 255, 255, 0.3)"
          >
            조회수
          </th>
          <td width="30%" class="text-center">{{ board.hit }}</td>
        </tr>
        <tr>
          <th
            width="20%"
            class="text-center"
            style="border-right: 1px solid rgb(255, 255, 255, 0.3)"
          >
            제목
          </th>
          <td colspan="3">{{ board.title }}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-left" valign="top" height="200">
            <pre
              style="
                white-space: pre-wrap;
                border: none;
                color: white;
                background-color: rgb(0, 0, 0, 0);
              "
              >{{ board.content }}</pre
            >
          </td>
        </tr>
        <tr>
          <td colspan="4" class="text-right">
            <a
              href="#"
              class="btn btn-xs btn-info"
              v-show="board.writer === info.id"
              @click="modifyBoard"
              >수정</a
            >
            <a
              href="#"
              class="btn btn-xs btn-warning"
              v-show="board.writer === info.id"
              @click="deleteBoard"
              >삭제</a
            >
            <v-btn
              color="transparent"
              dark
              class="writebtn"
              v-bind="attrs"
              v-on="on"
              @click="movelist"
            >
              글목록 <v-icon>mdi-clipboard-text-outline</v-icon>
            </v-btn>
          </td>
        </tr>
      </table>
    </div>
    <v-div>
      <br />
      <v-div style="text-align: left">
        <h6 style="color: white; font-weight: bold">댓글</h6>
      </v-div>
      <v-divider dark></v-divider>
      <comment :bid="bid"></comment>
    </v-div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Comment from "./common/CommentVue.vue";

export default {
  data: () => {
    return {
      board: null,
      info: { name: "" },
    };
  },

  components: {
    Comment,
  },

  props: {
    bid: { type: Number },
    content: { type: String },
    date: { type: String },
    hit: { type: Number },
    title: { type: String },
    writer: { type: String },
  },
  created() {
    this.board = {
      bid: this.bid,
      content: this.content,
      date: this.date,
      hit: this.hit + 1,
      title: this.title,
      writer: this.writer,
    };
  },
  mounted() {
    this.info = this.userInfo;
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    modifyBoard() {
      console.log(this.board);
      this.$router.push({
        name: "board-modify",
        params: { board: this.board },
      });
    },
    async deleteBoard() {
      await this.$store.dispatch("deleteBoard", this.board);
      this.$toast("삭제 완료", {
        timeout: 2000,
      });
      this.$router.push({ name: "board-list" });
    },
    boardList() {
      this.$router.push({ name: "board-list" });
    },
    movelist() {
      this.$router.push({ name: "board-list" });
    },
  },
};
</script>

<style>
.row-write {
  width: 800px;
  height: 800px;
  display: inline-block;
  margin: auto;
}

.writebtn {
  border: 2px solid white;
}
</style>