/**
 * Created by zhengcaiyun on 2017/8/18.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from './plugins/logger';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    // actions,
    modules: {
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
