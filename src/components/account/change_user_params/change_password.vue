<script setup>
import { reactive } from 'vue'

import useUsers from '../../../composables/useUsers';

const local = reactive({
    old_password: '',
    new_password: '',
    password_again: '',

    error_old_password: '',
    error_password: '',
    pass_dont_match: '',

})

const active_user_id = useUsers().active_user_id.value
const active_user = useUsers().find_user(active_user_id)
const user_password = active_user.password

function change_password() {
    if (local.old_password === user_password) {
        local.error_old_password = ''
        let test_inp_data = true
        if (local.new_password != '' && /^[А-Яа-яa-zA-Z0-9!?]{4,10}$/.test(local.new_password)) { //регулярное выражение для пробела
            local.error_password = ''
        } else {
            local.error_password = 'Ошибка! Пароль должен содержать от 4-х до 10-ти символов'
            test_inp_data = false
        }
        if (local.new_password != local.password_again) {
            local.pass_dont_match = 'Ошибка! Пароли не совпадают.'
            test_inp_data = false
        } else {
            local.pass_dont_match = ''
        }

        if (test_inp_data) {
            useUsers().change_password(active_user_id, local.new_password)
            local.old_password = ''
            local.new_password = ''
            local.password_again = ''
        }
    } else {
        local.error_old_password = 'Неправильный текущий пароль'
    }
}
</script>

<template>
    <div class="box">
        <fieldset>
            <legend>Введите пароль</legend>
            <input type="password" placeholder="Пароль" v-model="local.old_password" minlength="4" maxlength="10">
            <div class="error">{{ local.error_old_password }}</div>
        </fieldset>
        <fieldset>
            <legend>Введите новый пароль</legend>
            <input type="password" placeholder="Пароль" v-model="local.new_password" minlength="4" maxlength="10">
            <div class="error">{{ local.error_password }}</div>
        </fieldset>
        <fieldset>
            <legend>Повторите новый пароль</legend>
            <input type="password" placeholder="Пароль" v-model="local.password_again" minlength="4" maxlength="10">
            <div class="error">{{ local.pass_dont_match }}</div>
        </fieldset>
        <button @click="change_password()"> Изменить</button>
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