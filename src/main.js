import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';

/**
 * Fake backend API
 */
axios.defaults.baseURL = 'http://localhost:3004/';
/**
 * Send all requests with authorization headers, TLS client certificates, cookies
 * required only if we have backend session auth
 */
axios.defaults.withCredentials = true
/**
 * Handling expired token (Forbidden Requests)
 * required only if we have backend session auth
 */
axios.interceptors.response.use(undefined, function (error) {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;
            store.dispatch('LogOut')
            return router.push('/login')
        }
    }
})

Vue.config.productionTip = false
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
