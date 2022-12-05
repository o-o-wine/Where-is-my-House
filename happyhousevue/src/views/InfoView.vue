<template>
  <v-app class="outer-info">
    <v-div class>
      <v-div class="align-info">
        <v-div class="info-inner">
          <hit-board-list></hit-board-list>
        </v-div>
        <v-div class="info-inner">
          <qna-list></qna-list>
        </v-div>
        <v-div class="info-inner">
          <hit-house-list></hit-house-list>
        </v-div>
      </v-div>
    </v-div>
  </v-app>
</template>

<script>
import HitBoardList from "@/components/list/HitBoardList.vue";
import QnaList from "@/components/list/QnaList.vue";
import HitHouseList from "@/components/list/HitHouseList.vue";

export default {
  name: "Info",
  components: {
    HitBoardList,
    QnaList,
    HitHouseList,
  },
};
</script>

<style scoped>
.outer-info {
  margin: 0 auto;
  align-items: center;

  background-image: url(../assets/info.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.9;

  width: 100%;
  height: 100%;
}

.align-info {
  text-align: center;
  margin: auto;
  width: 100%;
  position: absolute;
  top: 50%;
}

.info-inner {
  display: inline-block;
  text-align: center;
  width: 33%;
  height: 100%;
  padding: 50px;
}

.center-align {
  margin: 0 auto;
}
</style>


