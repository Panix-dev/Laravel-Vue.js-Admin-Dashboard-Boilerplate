import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import FlashMessage from '@smartweb/vue-flash-message';
Vue.use(FlashMessage);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
