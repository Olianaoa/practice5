<script setup>
import { reactive } from 'vue'

import { useRoute } from 'vue-router';
import { useRouter } from "vue-router"

import useUsers from '../../../composables/useUsers';

const route = useRoute()
const router = useRouter()

function del_us(index) {
    useUsers().delete_item(index)
    router.push('/catalog')
}

const local_item_id = route.params.id
</script>


<template>
    <div class="box">
        <button @click="del_us(local_item_id)"> Удалить товар</button>
    </div>
</template>

<style scoped>
.box {
    display: flex;
    place-items: center;
}

button {
    margin: 0 auto;
}
</style>
