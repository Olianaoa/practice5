<script setup>
import { reactive } from 'vue'

import { useRoute } from 'vue-router';
import { useRouter } from "vue-router"

import useUsers from '../../composables/useUsers';

const router = useRouter()
const users = useUsers().users.value

const local = reactive({
    item_name: '',
    item_price: '',
    item_description: '',

    er_mes: '',
    er_price: '',
    er_description: '',
    error_item_name: "",
})
///^[A-zА-яЁё0-9 ]+$/
function add_item() {
    let test_inp_data = true

    if (!/^[A-Za-zА-яЁё0-9 ]+$/.test(local.item_name)) {
        local.er_mes = 'Ошибка! У товара должно быть название'
        test_inp_data = false
    } else {
        local.er_mes = ''
    }
    if (local.item_description === '') {
        local.er_description = 'Ошибка! У товара должно быть описание'
    } else {
        local.er_description = ''
    }
    if (local.item_price === '') {
        local.er_price = 'Ошибка! У товара должна быть цена'
    } else {
        local.er_price = ''
    }

    if (test_inp_data) {
        const find_item_in_array = useUsers().find_item_name(local.item_name)
        
        if (find_item_in_array != undefined) {
            local.error_item_name = 'Товар с таким названием уже существует. Выберите другое'
        } else {
            useUsers().add_item(active_user_name, local.item_name, local.item_description, local.item_price)
        }
    }
    local.item_name = ''
    local.item_description = ''
    local.item_price = ''
}

const active_user_id = useUsers().active_user_id.value
const active_user = useUsers().find_user(active_user_id)
const active_user_name = active_user.name
</script>

<template>
    <div class="box">
        <fieldset>
            <legend>Введите название товара</legend>
            <input type="text" v-model="local.item_name"><br>
            <div class="error"> {{ local.er_mes }}</div>
        </fieldset>
        <fieldset>
            <legend>Введите описание товара</legend>
            <input type="text" v-model="local.item_description"><br>
            <div class="error"> {{ local.er_description }}</div>
        </fieldset>
        <fieldset>
            <legend>Введите цену товара</legend>
            <input type="number" v-model="local.item_price"><br>
            <div class="error"> {{ local.er_price }}</div>
        </fieldset>
        <div class="error">
            {{ local.error_item_name }}
        </div>
        <button @click="add_item"> Добавить товар</button>
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

.box {
    place-items: center;
    width: 300px;
    min-height: 250px;
    border-radius: 10%;
    border: 1px solid black;
    text-align: left;
    margin: 10px auto;
}

.error {
    color: red;
}
</style>