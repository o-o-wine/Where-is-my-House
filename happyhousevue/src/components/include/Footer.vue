<template>
  <v-footer
    dark
    padless
    style = "width:100%"
  >
    <v-card
      flat
      tile
      class="blue-grey darken-4 white--text text-center"
      style = "width:100%"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        구미 5반 2조 1학기 최종 프로젝트 - 아파트 부동산 정보, 게시판, 부동산 지도, 로그인 기능 구현<br>&copy; SSAFY 8th 박종건, 이건희
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>SSAFY 8TH</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
};
</script>
<style scoped>
  footer {
    height: 0px;
    position : absolute;
    bottom : 0;
    width:100%
  }
</style>
