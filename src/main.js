import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';

// send all requests with authorization headers, TLS client certificates, cookies (as in our case)
axios.defaults.withCredentials = true
// testing backend api
axios.defaults.baseURL = 'https://gabbyblog.herokuapp.com/';

Vue.config.productionTip = false
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
