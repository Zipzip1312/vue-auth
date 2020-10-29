import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

function loadView(view) {
    return () => import(`../views/${view}.vue`);
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: loadView('Home')
    },
    {
        path: '/register',
        name: 'Register',
        component: loadView('Register'),
        meta: { guest: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: loadView('Login'),
        meta: { guest: true },
    },
    {
        path: '/posts',
        name: 'Posts',
        component: loadView('Posts'),
        meta: { requiresAuth: true },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.isAuthenticated) {
            next("/posts");
            return;
        }
        next();
    } else {
        next();
    }
})

export default router
