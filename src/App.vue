<script setup>
import { computed } from "vue"

import { RouterLink, RouterView } from 'vue-router';

import useUsers from './composables/useUsers';
const active_user_id = useUsers().active_user_id.value
const active_user = useUsers().find_user(active_user_id)
//настроить уровни доступа
</script>

<template>
    <div class="div_app">
        <div class="buttons">
            <!-- <template v-if="active_user?.role != 'Пользователь'"> -->
                <RouterLink class="nav_btn" :to="{ name: 'output_all_users' }">Все
                    пользователи</RouterLink>
            <!-- </template> -->
            <RouterLink class="nav_btn" :to="{ name: 'account_info' }">Личный кабинет</RouterLink>
            <RouterLink class="nav_btn" :to="{ name: 'all_items' }">Каталог
            </RouterLink>
        </div>
        <RouterView />
    </div>
</template>

<style scoped>
.nav_btn {
    padding: 10px;
    margin: 20px;
    width: 40px;
    height: 15px;
    border: solid rgb(47, 255, 99) 1px;
    border-radius: 10px;
    background-color: pink;
}

.no_display {
    display: none;
}
</style>
