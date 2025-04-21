<script setup>
//АККАУНТ ВСЕ ПАРАМЕТРЫ
import { reactive } from 'vue'

import { useRoute } from 'vue-router';
import { useRouter } from "vue-router"


import useUsers from '../../../composables/useUsers';

const router = useRouter()

const local = reactive({
    del_index: '',
    users: useUsers().users.value
})

function del_us(index) {
    local.del_index = index
    useUsers().delete_active_user(local.del_index)
    router.push('/')
}

const active_user_id = useUsers().active_user_id.value
</script>


<template>
    <div class="box">
        <button @click="del_us(active_user_id)"> Удалить пользователя</button>
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
