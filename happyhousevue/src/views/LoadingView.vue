<template>
    <div class="loading_div">

    </div>
</template>

<script>
import Http from '@/api/http.js'
export default {

    created() {
        const code = this.$route.query.code
        Http.get(`user/login?code=${code}`)
            .then(data => {
                this.$store.dispatch("registToken", data)
            })

        this.$router.push("/");
    }
}
</script>

<style>
.loading_div {
    margin: 0 auto;
    align-items: center;

    background-image: url(../assets/city-black.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: 0.9;

    width: 100%;
    height: 100%;
}
</style>