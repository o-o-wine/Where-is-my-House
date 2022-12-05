<template>
  <v-div class="row-write">
    <v-div class="col-md-2"></v-div>
    <v-div class="col-md-8">
      <h2
        class="text-center"
        style="color: white; font-weight: bold"
        v-if="type === 'create'"
      >
        게시글 쓰기
      </h2>
      <h2 class="text-center" style="color: white; font-weight: bold" v-else>
        게시글 수정
      </h2>
      <table class="table table-striped">
        <tr style="color: white">
          <td>제목</td>
          <td>
            <input
              type="text"
              class="form-control"
              name="title"
              v-model="title"
              v-if="type == 'create'"
            />
            <input
              type="text"
              readonly
              class="form-control"
              name="title"
              v-model="title"
              v-else
            />
          </td>
        </tr>

        <tr style="color: white">
          <td>작성자</td>
          <td>
            <input
              type="text"
              readonly
              class="form-control"
              name="writer"
              :value="writer"
            />
          </td>
        </tr>

        <tr style="color: white">
          <td>글내용</td>
          <td>
            <textarea
              rows="10"
              cols="50"
              name="content"
              class="form-control"
              v-model="content"
            ></textarea>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="text-center">
            <v-btn
              color="transparent"
              dark
              class="writebtn"
              v-bind="attrs"
              v-on="on"
              @click="registBoard"
            >
              글쓰기 <v-icon>mdi-pen</v-icon>
            </v-btn>
            <br /><br />
            <v-btn
              color="transparent"
              dark
              class="writebtn"
              v-bind="attrs"
              v-on="on"
              @click="listboard"
            >
              글목록보기 <v-icon>mdi-ballot</v-icon>
            </v-btn>
          </td>
        </tr>
      </table>
    </v-div>
  </v-div>
</template>
<script>
export default {
  data: () => {
    return {
      bid: 0,
      title: "",
      content: "",
      writer: "",
      hit: 0,
    };
  },
  props: {
    type: { type: String },
    board: { type: Object },
  },

  created() {
    //2022-11-19 18:10:26
    let time = new Date();
    var month = time.getMonth();
    var date = time.getDate();

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    this.writer = this.$store.state.userInfo.id;
    if (this.type === "modify") {
      this.title = this.board.title;
      this.content = this.board.content;
      this.hit = this.board.hit;
      this.bid = this.board.bid;
    }

    this.time =
      time.getFullYear() +
      "-" +
      (month + 1) +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    this.no = this.$store.getters.pageCnt + 1;
  },
  methods: {
    async registBoard() {
      if (
        this.no == null ||
        this.title == null ||
        this.content == null ||
        this.time == null ||
        this.writer == null
      ) {
        this.$toast("모든 내용을 입력해주세요.", {
          timeout: 2000,
        });
      } else {
        let board = {
          title: this.title,
          content: this.content,
          writer: this.writer,
          hit: 1,
        };
        console.log(board);
        await this.$store.dispatch("createBoard", board);
        this.$toast("등록 성공!", {
          timeout: 2000,
        });
        this.$router.push({ name: "board-list" });
      }
    },
    updateBoard() {
      if (
        this.no == null ||
        this.title == null ||
        this.content == null ||
        this.time == null ||
        this.writer == null
      ) {
        this.$toast("모든 내용을 입력해주세요.", {
          timeout: 2000,
        });
      } else {
        let board = {
          title: this.title,
          content: this.content,
          writer: this.writer,
          hit: this.hit,
          bid: this.bid,
        };
        console.log(board);
        this.$store.dispatch("updateBoard", board);
        this.$toast("등록 성공!", {
          timeout: 2000,
        });
        this.$router.push({ name: "board-list" });
      }
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