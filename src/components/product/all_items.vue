<script setup>
import { reactive, computed } from 'vue'

import useUsers from '../../composables/useUsers';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const items = useUsers().items.value

console.log(items);


const users = useUsers().users.value
const active_user_id = useUsers().active_user_id.value

</script>

<template>
    <div class="all" v-if="active_user_id === ''">
        <p>Для просмотра товаров необходимо авторизоваться</p>
        <p>Вы можете <RouterLink :to="{ name: 'create_acc' }">Создать аккаунт</RouterLink> или
            <RouterLink :to="{ name: 'log_in' }">Войти</RouterLink>
        </p>
    </div>
    <div class="all" v-else>
        <h2>каталог</h2>
        <div class="items">
            <template v-for="item in items">
                <RouterLink class="a" :to="{
                    name: 'item_params',
                    params: {
                        id: item?.id
                    }
                }">
                    <div class="item">
                        <p>Название: {{ item.item_name }}.</p>
                        <p>Цена: {{ item.price }} Р</p>
                        <p>Продавец: {{ item.user_name }}</p>
                    </div>
                </RouterLink>
            </template>
        </div>
    </div>


</template>

<style scoped>
.all {
    width: 80%;
    margin: 0 auto;
}

.items {
    margin: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
}

.item {
    margin: 20px auto;
    padding: 20px;
    border: 2px solid rgb(180, 180, 180);
    transition: border 0.2s;
}

.item:hover {
    border: 2px solid black;
    transition: 0.2s ease-in-out;
}

.a {
    padding: 20px 0;
    color: black;
    font-weight: normal;
}
</style>