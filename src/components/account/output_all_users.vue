<script setup>
import { reactive, computed } from 'vue'

import useUsers from '../../composables/useUsers';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const users = useUsers().users.value
const active_user_id = useUsers().active_user_id.value
const active_user = useUsers().find_user(active_user_id)

function change_user_role(id, role) {
    useUsers().change_user_role(id, role)
}
console.log(useUsers().items.value);
function delete_user(user_id, user_name) {
    console.log(useUsers().items.value);

    useUsers().delete_user(user_id)
    useUsers().delete_user_items(user_name)
}

</script>
<template>
    <div class="all" v-if="active_user?.role === 'Админ'">
        <h2>Список всех пользователей</h2>
        <div class="users">
            <template v-for="user in users">
                <div class="user">
                    <p>Индекс пользователя :
                        {{ user.id }}
                    </p>
                    <p>Имя :
                        {{ user.name }}
                    </p>
                    <p> Роль:
                        {{ user.role }}
                    </p>
                    <template v-if="active_user_id === 0">
                        <div v-if="user.id !== 0">
                            <button v-if="user.role === 'Пользователь'"
                                @click="change_user_role(user.id, user.role)">Повысить до Админа</button>
                            <button v-else @click="change_user_role(user.id, user.role)">Понизить до
                                Пользователя</button>
                        </div>
                    </template>
                    <template v-if="user.id !== 0">
                        <button @click="delete_user(user.id, user.name)"
                            v-if="(active_user.role === 'Админ' && user.role === 'Пользователь') || (active_user_id === 0 && (user.role === 'Пользователь' || user.role === 'Админ'))">
                            Удалить
                            пользователя</button>
                    </template>
                </div>
            </template>
        </div>
    </div>
    <div class="all" v-else>
        <p>Упс!! Кажется, у вас недостаточно прав, чтобы тут находится</p>

        <p>Но! Вы можете <RouterLink :to="{ name: 'all_items' }">
                Перейти в каталог</RouterLink> или <RouterLink :to="{ name: 'create_acc' }">Создать аккаунт</RouterLink>
            /
            <RouterLink :to="{ name: 'log_in' }">Войти</RouterLink>
        </p>
    </div>

</template>

<style scoped>
.all {
    width: 80%;
    margin: 0 auto;
}

.users {
    margin: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px
}

.user {
    width: 250px;
    height: 250px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid black;
}

.a {
    padding: 20px 0;
}

button {
    margin: 5px;
}
</style>