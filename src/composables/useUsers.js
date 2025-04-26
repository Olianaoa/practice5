import { computed, reactive, ref, watch } from "vue"
import { defineEmits } from "vue/dist/vue.esm-browser.js"
//список пользователей с 0 элементом админ
// localStorage.clear()
const users = ref([])
try {
    if (localStorage.getItem('users') === null) {
        users.value = [
            {
                id: 0,
                name: 'Админ',
                password: '1234',
                role: 'Админ'
            },
        ]
    } else {
        users.value = JSON.parse(localStorage.getItem('users'))
    }
} catch (error) { //обязательно в скобках что-то, иначе ругается
    users.value = [
        {
            id: 0,
            name: 'Админ',
            password: '1234',
            role: 'Админ'
        },
    ]
}

watch(users, (newValue) => {
    localStorage.setItem('users', JSON.stringify(newValue))
},
    { deep: true })


//поиск пользователя по id 
function find_user(index) {

    return users.value.find((user) => user.id === index) // весь пользователь
}
//поиск пользователя по имени
function find_user_name(input_name) {
    return users.value.find((user) => user.name === input_name) // весь пользователь
}
//регистрация  пользователя (добавление в массив)
function add_user(name, password) {
    if (users.value.length === 0) {
        users.value.push(
            {
                id: 0,
                name: 'Админ',
                password: '1234',
                role: 'Админ'
            },
        )
    } else {
        users.value.push({
            id: users.value[users.value.length - 1].id + 1,
            name: name,
            password: password,
            role: 'Пользователь'
        })
        log_in_user_acc(users.value[users.value.length - 1].id) // введенный пользователь становится активным
    }
    console.log(users.value);
}

// АКТИВНЫЙ АЙ ДИ
const active_user_id = ref("")

if (localStorage.getItem('active_user_id') === '') {
    active_user_id.value = ""
} else {
    active_user_id.value = Number(localStorage.getItem('active_user_id'))
}

watch(active_user_id, (newValue) => {
    localStorage.setItem('active_user_id', newValue)
});

// Зайти в аккаунт
function log_in_user_acc(user_id) {
    active_user_id.value = user_id
}
//выйти
function log_out() {
    active_user_id.value = ""
}

//изменение пользователя
function delete_user(index) {
    const user_to_del = find_user(index) // весь пользователь
    const del_user_index = users.value.indexOf(user_to_del)
    users.value.splice(del_user_index, 1)
}

function delete_user_items(name) {
    let array=[]
    items.value.forEach(elem => {
        console.log(elem.user_name);
        if (elem.user_name === name) {
            array.push(elem)
        }
    });
    array.forEach(element => {
        delete_item(element.id)
    });
}

function delete_active_user(id) {
    delete_user(id)
    log_out()
}

function change_name(index, name) {
    const user = find_user(index) // весь пользователь
    const change_user_name = users.value.indexOf(user) //id пользователя
    users.value[change_user_name].name = name;
}

function change_password(index, password) {
    const user = find_user(index) // весь пользователь
    const change_user_name = users.value.indexOf(user) //id пользователя
    users.value[change_user_name].password = password;
}

// изменение роли пользователя,
function change_user_role(index, role) {
    const user = find_user(index) // весь пользователь
    const change_user_role = users.value.indexOf(user) //id пользователя
    if (role === "Админ") {
        users.value[change_user_role].role = 'Пользователь'
    }
    if (role === "Пользователь") {
        users.value[change_user_role].role = 'Админ'
    }
}


// ТОВАРЫ ТОВАРЫ ТОВАРЫ ТОВАРЫ

// список товаров
const items = ref([])
try {
    if (localStorage.getItem('items') === null) {
        items.value = [
            {
                id: 0,
                user_name: 'Админ',
                item_name: 'нож',
                price: 1000,
                description: 'это нож'
            },
            {
                id: 1,
                user_name: 'Админ',
                item_name: 'топор',
                price: 2000,
                description: 'это топор'
            },
        ]
    } else {
        items.value = JSON.parse(localStorage.getItem('items'))
    }
} catch (error) { //обязательно в скобках что-то, иначе ругается
    items.value = [
        {
            id: 0,
            user_name: 'Админ',
            item_name: 'нож',
            price: 1000,
            description: 'это нож'
        },
        {
            id: 1,
            user_name: 'Админ',
            item_name: 'топор',
            price: 2000,
            description: 'это топор'
        },
    ]
}

watch(items, (newValue) => {
    localStorage.setItem('items', JSON.stringify(newValue))
},
    { deep: true })


//поиск товара по id 
function find_item(item_id) {
    return items.value.find((item) => item.id === Number(item_id));
}

// поиск товара по имени 
function find_item_name(name) {
    return items.value.find((item) => item.item_name === name)
}

// изменение товара
function change_item_name(id, new_name) {
    const item = find_item(id)
    item.item_name = new_name;
}

function change_price(id, new_price) {
    const item = find_item(id)
    item.price = new_price;
}

function change_description(id, new_description) {
    const item = find_item(id)
    item.description = new_description;
}

function delete_item(id) {
    const item = find_item(id) // весь товар 
    const item_index = items.value.indexOf(item)
    items.value.splice(item_index, 1)
}

// добавление товара
function add_item(user_name, product_name, description, price) {
    if (items.value.length === 0) {
        items.value.push({
            id: 0,
            user_name: user_name,
            item_name: product_name,
            price: price,
            description: description
        })
    } else {
        items.value.push({
            id: items.value[items.value.length - 1].id + 1,
            user_name: user_name,
            item_name: product_name,
            price: price,
            description: description
        })
    }
    console.log('товары', items.value);

}
console.log(active_user_id.value);

// 

export default function useUsers() {
    return {
        //массивы
        users, items,
        //поиск
        find_user, find_user_name, find_item_name, find_item,
        // добавить
        add_user, add_item,
        //зайти, активный пользователь, выйти
        log_in_user_acc, active_user_id, log_out,
        //изменение пользователя
        delete_active_user, delete_user, change_name, change_password,
        //поменять роль
        change_user_role,
        //изменить товар
        change_item_name, change_price, change_description, delete_item, delete_user_items
    }
}
