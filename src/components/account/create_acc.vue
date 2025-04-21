<script setup>
import { ref, reactive } from 'vue'

import useUsers from '../../composables/useUsers';
import { useRouter } from 'vue-router';
const router = useRouter()

const local = reactive({
    inp_name: '',
    password: '',
    password_again: '',

    error_name: '',
    error_password: '',
    pass_dont_match: '',
    error_acc_name: '',
})

const active_user_id = useUsers().active_user_id.value

if (active_user_id != '') {
    router.push('/account_info')
}


function create_acc() {
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
        local.error_password = 'Ошибка! Пароль должен содержать от 4-х до 10-ти символов'
        test_inp_data = false
    }
    if (local.password != local.password_again || local.password === '' || local.password_again === '') {
        local.pass_dont_match = 'Ошибка! Пароли не совпадают. '
        test_inp_data = false
    } else {
        local.pass_dont_match = ''
    }

    if (test_inp_data) {
        const find_user_in_array = useUsers().find_user_name(local.inp_name)
        if (find_user_in_array === undefined) {
            useUsers().add_user(local.inp_name, local.password)
            router.push('/account_info')
            local.error_acc_name = 'Вы зарегистрированы!'
        } else {
            local.error_acc_name = 'Пользователь с таким именем уже существует. Выберите другое'
        }

        local.inp_name = '';
        local.password = '';
        local.password_again = '';
    }
}

</script>

<template>
    <div class="log_in">
        <h2>Регистрация пользователя</h2>
        <div class="login">
            <fieldset>
                <legend>Введите имя (Только кириллица, с заглавной буквы)</legend>
                <input type="text" placeholder="Имя" v-model="local.inp_name" minlength="4" maxlength="10">
                <div class="error">{{ local.error_name }}</div>
            </fieldset>

            <fieldset>
                <legend>Введите пароль</legend>
                <input type="password" placeholder="Пароль" v-model="local.password" minlength="4" maxlength="10">
                <div class="error">{{ local.error_password }}</div>
            </fieldset>
            <fieldset>
                <legend>Повторите пароль</legend>
                <input type="password" placeholder="Пароль" v-model="local.password_again" minlength="4" maxlength="10">
                <div class="error">{{ local.pass_dont_match }}</div>
            </fieldset><br>
            <button @click="create_acc">Зарегистрироваться</button><br>
            <div class="error">
                {{ local.error_acc_name }}
            </div>
        </div>
        <p>
            Уже есть аккаунт? <RouterLink :to="{ name: 'log_in' }">Войти</RouterLink>
        </p>
    </div>

</template>

<style scoped>
.log_in {
    max-width: 600px;
    margin: 0 auto;
}

fieldset {
    text-align: left;
}

.error {
    color: red;
}
</style>