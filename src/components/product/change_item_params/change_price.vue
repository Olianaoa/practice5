<script setup>
import { reactive, computed } from 'vue'

import useUsers from '../../../composables/useUsers';
import { useRoute } from 'vue-router';
const route = useRoute()

const local = reactive({
    price: '',
})

const local_item_id = route.params.id

function change_price() {
    
    useUsers().change_price(local_item_id, local.price)
}

</script>

<template>
    <div class="box">
        <fieldset>
            <legend>Введите новую цену</legend>
            <input type="number" placeholder="Новую цену" v-model="local.price" >
        </fieldset>
        <button @click="change_price()"> Изменить</button>
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