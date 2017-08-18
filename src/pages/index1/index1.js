/**
 * Created by zhengcaiyun on 2017/8/18.
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import axios from 'axios';
import miniToastr from 'mini-toastr';
import app from './app';
import router from './router';
import store from './store';

Vue.use(VTooltip);

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
/* eslint-disable no-new */


new Vue({
    el: '#app',
    router,
    store,
    template: '<app/>',
    components: { app },
});
