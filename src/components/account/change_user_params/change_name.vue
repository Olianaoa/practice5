<script setup>
import { reactive } from 'vue'
import useUsers from '../../../composables/useUsers';

const local = reactive({
    newName: '',
    er_mes_name: '',
    error_acc_name: '',
})

function change_name() {
    let test_inp_data = true
    if (/^[А-Я][а-я]{3,9}$/.test(local.newName)) {
        local.er_mes_name = ''
    } else {
        test_inp_data = false
        local.er_mes_name = 'Ошибка! Только кириллица, с заглавной буквы, от 4-х до 10-ти символов'
    }
    if (test_inp_data) {
        const find_user_in_array = useUsers().find_user_name(local.newName)
        if (find_user_in_array === undefined) {
            useUsers().change_name(active_user_id, local.newName)
            local.error_acc_name = ''
            local.newName=''
        } else {
            local.error_acc_name = 'Пользователь с таким именем уже существует. Выберите другое'
        }
    }
}

const active_user_id = useUsers().active_user_id.value

</script>

<template>
    <div class="box">
        <fieldset>
            <legend>Введите новое имя</legend>
            <input type="text" placeholder="введите новое имя" v-model="local.newName"><br>
            <div class="error">{{ local.er_mes_name }}</div>
        </fieldset>
        <div class="error">{{ local.error_acc_name }}</div>
        <button @click="change_name()"> Изменить</button>
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