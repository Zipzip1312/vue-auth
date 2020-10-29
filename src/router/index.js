import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

function loadView(view) {
    return () => import(`../views/${view}.vue`);
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: loadView('Register')
    },
    {
        path: '/login',
        name: 'Login',
        component: loadView('Login')
    },
    {
        path: '/posts',
        name: 'Posts',
        component: loadView('Posts')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
