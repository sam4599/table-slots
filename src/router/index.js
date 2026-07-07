import { createRouter, createWebHashHistory } from 'vue-router'

import PostsPage from '@/components/pages/PostsPage.vue'
import UsersPage from '@/components/pages/UsersPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/posts'
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/users',
        component: UsersPage
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router