<template>
    <v-div class="board-list">
        <v-div class="align-v">
            <v-div style="border-radius:20px; height:270px; background-color: rgb(1,1,1,0.7);">
                <hit-notice-list></hit-notice-list>
            </v-div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-divider style="padding:10 10 10 10" vertical dark></v-divider>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-div style="border-radius:20px; height:270px; background-color: rgb(1,1,1,0.7);">
                <hit-board-list></hit-board-list>
            </v-div>
        </v-div>
        <v-divider dark></v-divider>
        <br />
        <v-div>
            <v-div>
                <v-data-table :headers="headers" :items="boardList" disable-sort :items-per-page="itemsPerPage" dark
                    class="" style="border-radius:20px; weight:1100px; height:520px; background-color: rgb(1,1,1,0.7);"
                    @click:row="clickRow">
                    <template v-slot:top>
                        <v-toolbar flat class="transparent" style="color:white; font-weight: bold;">
                            <v-toolbar-title>전체글보기</v-toolbar-title>
                            <v-divider class="mx-4" dark inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="1180px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="transparent" dark class="mb-2" v-bind="attrs" v-on="on"
                                        @click="writeboard"> 글쓰기 <v-icon>mdi-plus</v-icon>
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
        </v-div>
    </v-div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import HitBoardList from "@/components/list/HitBoardList.vue";
import HitNoticeList from "@/components/list/HitNoticeList.vue";

export default {
    name: "BoardList",
    components: {
        HitBoardList,
        HitNoticeList
    },
    data: () => ({
        itemsPerPage: 7,
        headers: [
            { text: "글제목", value: "title", width: "40%", align: "center" },
            { text: "작성자", value: "writer", width: "20%", align: 'center' },
            { text: "작성일", value: "date", width: "20%", align: 'center' },
            { text: "조회수", value: "hit", width: "20%", align: 'center' },
        ],
        defaultItem: {
            name: "",
            writer: 0,
            date: 0,
            hit: 0,
        },
        BoardList: [],
    }),
    computed: {
        ...mapState(["boardList"]),
        ...mapGetters(["pageCnt"]),
    },
    props: {
        type: String,
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
        this.$store.dispatch("getBoardList");
    },

    methods: {
        writeboard: function () {
            this.$router.push({ name: 'board-create' });
        },
        clickRow(board) {
            this.$store.dispatch("readBoard", { bid: board.bid, title: board.title, writer: board.writer, hit: board.hit, content: board.content, date: board.date });
            this.$router.push({ name: "board-detail", params: { bid: board.bid, title: board.title, writer: board.writer, hit: board.hit, content: board.content, date: board.date } })
        }
    }
}
</script>

<style scoped>
.align-v {
    margin: auto;
    display: flex;
    padding-right: 20px;
}

.board-list {
    height: 100%;
    width: 900px;
    height: 800px;
    position: absolute;
    text-align: center;
    width: 65%;
    position: absolute;
    top: 10%;
    right: 5%;
}

.sub_news,
.sub_news th,
.sub_news td {
    border: 0;
}

.sub_news thead {
    color: blue;
}

.sub_news a {
    color: #f2baff;
    font-weight: bold;
    font-size: 14px;
    text-decoration: none
}

.sub_news {
    width: 100%;
    border-bottom: 1px solid rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    font-size: 14px;
    table-layout: fixed;
    max-height: 450px;
}

.sub_news caption {
    display: none
}

.sub_news th {
    padding: 5px 0 6px;
    border-top: solid 1px #999;
    border-bottom: solid 1px #b2b2b2;
    background-color: #f1f1f4;
    color: #333;
    font-weight: bold;
    line-height: 20px;
    vertical-align: top
}

.sub_news td {
    padding: 8px 0 9px;
    border-bottom: solid 1px #d2d2d2;
    text-align: center;
    line-height: 18px;
}

.sub_news .date,
.sub_news .hit {
    padding: 0;
    font-family: Tahoma;
    font-size: 11px;
    line-height: normal
}

.sub_news .title {
    text-align: left;
    padding-left: 15px;
    font-size: 11px;
}

.sub_news .title .pic,
.sub_news .title .new {
    margin: 0 0 2px;
    vertical-align: middle
}

.sub_news .title a.comment {
    padding: 0;
    background: none;
    color: #f00;
    font-size: 12px;
    font-weight: bold
}

.sub_news tr.reply .title a {
    padding-left: 16px;
    background: 0 1px no-repeat
}

.sub_news .item {
    background-color: #ffffff;
}

.sub_news .content_title {
    vertical-align: middle;
}

.pageBar {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 200px;

}

.pageBar a {
    padding-right: 20px;
}
</style>
