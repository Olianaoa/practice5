<script setup>
import { ref, reactive } from 'vue'

import useUsers from '../../composables/useUsers';
import { useRouter } from 'vue-router';
const router = useRouter()

const local = reactive({
    inp_name: '',
    password: '',

    error_name: '',
    error_password: '',

    error_user_not_found: '',
})

const active_user_id = useUsers().active_user_id.value

if (active_user_id != '') {
    router.push('/account_info')
}

function log_in() {
    let test_inp_data = true
    if (/^[А-Я][а-я]{3,9}$/.test(local.inp_name)) {
        local.error_name = ''
    } else {
        local.error_name = 'Ошибка! Только кириллица, с заглавной буквы, от 4-х до 10-ти символов'
        test_inp_data = false
    }
    if (local.password != '' && /^[А-Яа-яa-zA-Z0-9!?]{4,10}$/.test(local.password)) { //регулярное выражение для пробела
        local.error_password = ''
    } else {
        local.error_password = 'Ошибка! Пароль от 4-х до 10-ти символов. Пробелы не допускаются'
        test_inp_data = false
    }

    if (test_inp_data) {
        const find_user_in_array = useUsers().find_user_name(local.inp_name)
        if (find_user_in_array != undefined) {
            if (find_user_in_array.name === local.inp_name && find_user_in_array.password === local.password) {
                useUsers().log_in_user_acc(find_user_in_array.id)
                router.push('/account_info')
                local.error_user_not_found = ''
            } else {
                local.error_user_not_found = 'Неправильный логин или пароль.'
            }
        } else {
            local.error_user_not_found = 'Неправильный логин или пароль.'
        }

        local.inp_name = '';
        local.password = '';
    }
}



</script>

<template>
    <div class="log_in">
        <h2>ВОЙТИ</h2>
        <div class="login">
            <fieldset>
                <legend>Введите логин</legend>
                <input type="text" placeholder="Имя" v-model="local.inp_name" minlength="4" maxlength="10">
                <div class="error">{{ local.error_name }}</div>
            </fieldset>
            <fieldset>
                <legend>Введите пароль</legend>
                <input type="password" placeholder="Пароль" v-model="local.password" minlength="4" maxlength="10">
                <div class="error">{{ local.error_password }}</div>
            </fieldset><br>
            <button @click="log_in">Войти</button><br>
            <div class="error">{{ local.error_user_not_found }}</div>
        </div>
        <p>
            Еще нет аккаунта? <RouterLink :to="{ name: 'create_acc' }">Зарегистрироваться</RouterLink>
        </p>
    </div>
</template>

<style scoped>
.login {
    max-width: 600px;
    margin: 0 auto;
}

.error {
    color: red;
}
</style>