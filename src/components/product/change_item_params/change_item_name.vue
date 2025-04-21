<script setup>
import { reactive } from 'vue'

import useUsers from '../../../composables/useUsers';
import { useRoute } from 'vue-router';
const route = useRoute()

const local = reactive({
    description: '',
})

const local_item_id = route.params.id

function change_item_name() {
    useUsers().change_item_name(local_item_id, local.description)
}

</script>

<template>
    <div class="box">
        <fieldset>
            <legend>Введите новое название</legend>
            <input type="text" placeholder="Новое название" v-model="local.description" >
            <div class="error">{{ local.er_mes_name }}</div>
        </fieldset>
        <button @click="change_item_name()"> Изменить</button>
    </div>
</template>

<style scoped>
fieldset {
    text-align: left;
    margin-bottom: 10PX;
    max-width: 300px;
    margin: 10px auto;
    padding: 10px;
}

.error {
    color: red;
}
</style>