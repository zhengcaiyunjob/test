<template>
    <div id="apps">
        <ul>
            <li>
                <router-link :to="'bar'">bar</router-link>
            </li>
            <li>
                <router-link :to="'foo'">foo</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'apps',

        data() {
           return {}
        },
        mounted() {

        },
        watch: {

        },

        methods: {

        },

        components: {

        },
    };
</script>

<style lang="scss">
    body{
        font-family: MicrosoftYaHei;
    }
    #apps{
        min-width:1200px;
    }
    a{
        cursor: pointer;
    }
    .font_size_14_bold{
        font-weight: bold;
        font-size: 14px;
        color: #2A2A2A;
    }
    .font_size_12_green{
        font-size: 12px;
        color: #06C1AE;
    }
    .font_size_12_yellow{
        font-size: 12px;
        color: orange;
    }
    .font_size_12_grey{
        font-size:12px;
        color:#6a6a6a;
    }

</style>
