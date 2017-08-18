import vue from 'vue';
import Router from 'vue-router';

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/foo',
            name: 'foo',
            component: Foo,
        },
        {
            path: '/bar',
            name: 'Bar',
            component: Bar,
        },
       ]
});
