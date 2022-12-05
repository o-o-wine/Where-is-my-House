<template>
  <!--메인 div-->
  <v-div class="outer1">
    <v-div
      class="list-component"
      style="border: 1px solid white; border-radius: 10px"
    >
      <v-data-table
        :headers="headers"
        :items="article"
        disable-sort
        dark
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1 transparent"
        style="width: 1000px"
        @click:row="clickRow"
      >
        <template v-slot:top>
          <v-toolbar
            flat
            dark
            class="transparent"
            style="color: black; font-weight: bold"
          >
            <v-toolbar-title style="color: white"
              >부동산 관련 뉴스</v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1000px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="transparent"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
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
  </v-div>
</template>

<script>
import Http from "@/api/http.js";
export default {
  data: () => ({
    itemsPerPage: 7,
    headers: [
      { text: "제목", value: "title", width: "20%", align: "center" },
      { text: "내용", value: "description", width: "70%", align: "center" },
      { text: "작성일", value: "pubDate", width: "10%", align: "center" },
    ],
    defaultItem: {
      title: "",
      description: "",
      pubDate: "",
    },
    article: [],
  }),

  methods: {
    clickRow(item) {
      console.log(item);
      window.open(item.link);
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  async created() {
    await Http.get("fetch/news").then((res) => {
      if (res.status != 200) {
        console.log("SERVER ERROR");
      } else {
        this.article = res.data.items;
      }
    });
  },
};
</script>

<style scoped>
.list-component {
  position: absolute;
  top: 10%;
  left: 30%;
}

.outer1 {
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
</style>