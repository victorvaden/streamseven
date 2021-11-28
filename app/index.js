import Vue from 'vue';
// import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Table from './Table.vue';
import App from './App.vue';
import parseRoute from './routing.js';

import { default as correspondences } from './fullTextSearch.js'

// Since the 777 data is immutable, we pass it in to the prototype of
// the Vue object to make it available in all components

Vue.prototype.$correspondences = correspondences;
Vue.config.performance = true;
Vue.use(VueRouter);

const routes = [
    { path: '/',
      component: Table,
      props: route => ({ initialSelected: "" })
      // props: true
    },
    { path: '/search',
      component: Table,
      props: route => ({ initialSelected: route.query.table })
      // props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

var app = new Vue({
    el: '#vue-app',
    render: h => h(App),
    router
});
