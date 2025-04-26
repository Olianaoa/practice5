import { createRouter, createWebHistory } from 'vue-router'
import create_acc from "./components/account/create_acc.vue"
import log_in from './components/account/log_in.vue'
import acc_info from './components/account/acc_info.vue'

import change_name from './components/account/change_user_params/change_name.vue'
import change_password from './components/account/change_user_params/change_password.vue'
import delete_user from './components/account/change_user_params/detele_user.vue'
import add_item from './components/product/add_item.vue'

import all_items from './components/product/all_items.vue'
import item_params from './components/product/item_params.vue'

import change_description from './components/product/change_item_params/change_description.vue'
import change_item_name from './components/product/change_item_params/change_item_name.vue'
import change_price from './components/product/change_item_params/change_price.vue'
import delete_cur_item from './components/product/change_item_params/delete_item.vue'

import output_all_users from './components/account/output_all_users.vue'

const routes = [
    { path: '/practice5', component: create_acc, name: 'create_acc' },
    { path: '/practice5/log_in', component: log_in, name: 'log_in' },
    {
        path: '/practice5/account_info/:id?', component: acc_info, name: 'account_info',
        children: [
            {
                path: 'change_name',
                component: change_name,
                name: 'change_name',
            },
            {
                path: 'change_password',
                component: change_password,
                name: 'change_password',
            },
            {
                path: 'delete_user',
                component: delete_user,
                name: 'delete_user',
            },
            {
                path: 'add_item',
                component: add_item,
                name: 'add_item',
            },
        ]
    },
    { path: '/practice5/catalog', component: all_items, name: 'all_items' },
    {
        path: '/practice5/item/:id?', component: item_params, name: 'item_params',
        children: [
            {
                path: 'change_description',
                component: change_description,
                name: 'change_description',
            },
            {
                path: 'change_item_name',
                component: change_item_name,
                name: 'change_item_name',
            },
            {
                path: 'change_price',
                component: change_price,
                name: 'change_price',
            },
            {
                path: 'delete_item',
                component: delete_cur_item,
                name: 'delete_item',
            },
        ]
    },
    { path: '/practice5/output_all_users', component: output_all_users, name: 'output_all_users' }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
