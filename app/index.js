import Vue from 'vue';
import Vuex from 'vuex';
import Table from './Table.vue';

import { default as correspondences } from './fullTextSearch.js'

// Since the 777 data is immutable, we pass it in to the prototype of
// the Vue object to make it available in all components

Vue.prototype.$correspondences = correspondences;
Vue.config.performance = true;

var app = new Vue({
    el: '#vue-app',
    render: h => h(Table)
});
