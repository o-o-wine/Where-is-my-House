<template>
    <div>
        <write-form :board="board" type="modify"></write-form>
    </div>
</template>

<script>
import WriteForm from '@/components/board/common/WriteForm.vue'
export default {
    props: {
        board: { type: Object }
    }
    ,
    components: {
        WriteForm
    },
}
</script>

<style>

</style>