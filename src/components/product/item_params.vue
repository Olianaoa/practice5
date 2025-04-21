<script setup>
import { reactive, computed } from 'vue'
import useUsers from '../../composables/useUsers';
import { useRoute } from 'vue-router';
const route = useRoute()

const local_item = computed(() => useUsers().items.value.find((item) => Number(route.params.id) === item.id))

const active_user_id = useUsers().active_user_id.value
const active_user = useUsers().find_user(active_user_id)
console.log(active_user.name);

</script>

<template>
    <div class="all">
        <div class="item">
            <h2>{{ local_item?.item_name }}</h2>
            <p>Продавец: {{ local_item?.user_name }}</p>
            <p>Название: {{ local_item?.item_name }}</p>
            <p>Описание: {{ local_item?.description }}</p>
            <p>Цена: {{ local_item?.price }} Р</p>
        </div>
        <div class="navigation" v-if="active_user.name === local_item?.user_name">
            <RouterLink :to="{ name: 'change_item_name', }">Изменить название </RouterLink>
            <RouterLink :to="{ name: 'change_description', }">Изменить описание </RouterLink>
            <RouterLink :to="{ name: 'change_price', }">Изменить цену </RouterLink>
            <RouterLink :to="{ name: 'delete_item', }">Удалить товар </RouterLink>

        </div>
        <RouterView />
    </div>
</template>

<style scoped>
.item{
    padding: 50px;
}

.all {
    margin: 20px auto;
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