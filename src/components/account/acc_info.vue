<script setup>
import { ref, reactive, computed } from 'vue'

import useUsers from '../../composables/useUsers';

import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

import { RouterLink, RouterView } from 'vue-router';


const router = useRouter()

const users = useUsers().users.value

const active_user_id = useUsers().active_user_id.value
const active_user = useUsers().find_user(active_user_id)
// const active_user_role = active_user.role

const user_params = computed(() => users.find((user) => Number(active_user_id) === user.id))
function log_out() {
    useUsers().log_out()
    router.push('/')
}
</script>

<template>
    <div class="all">
        <h2>ЛИЧНЫЙ КАБИНЕТ</h2>
        <div v-if="active_user_id === ''">
            <p>Нет авторизованного аккаунта.</p>
            <p>Вы можете <RouterLink :to="{ name: 'create_acc' }">Создать аккаунт</RouterLink> или
                <RouterLink :to="{ name: 'log_in' }">Войти</RouterLink>
            </p>
        </div>
        <template v-else>
            <div class="navigation">
                <template v-if="active_user_id != 0">
                    <RouterLink :to="{ name: 'change_name' }">Изменить имя </RouterLink>
                    <RouterLink :to="{ name: 'change_password' }">Изменить пароль </RouterLink>
                    <RouterLink :to="{ name: 'delete_user' }">Удалить аккаунт </RouterLink>
                </template>
                <template v-if="active_user?.role === 'Админ'">
                    <RouterLink :to="{ name: 'add_item' }">Добавить товар </RouterLink>
                </template>
            </div>
            <div class="acc_info">
                <div class="box">
                    <p>Индекс пользователя :
                        {{ user_params?.id }}
                    </p>
                    <p>Имя :
                        {{ user_params?.name }}
                    </p>
                    <p> Роль:
                        {{ user_params?.role }}
                    </p>
                    <button @click="log_out()"> Выйти </button>
                </div>
                <RouterView />
            </div>
        </template>
    </div>
</template>

<style scoped>
.all {
    margin: 0 auto;
    width: 70%;
}

.acc_info {
    display: flex;
    justify-content: space-around;
}

.navigation {
    width: 70vw;
    display: flex;
    justify-content: space-around;
}
</style>