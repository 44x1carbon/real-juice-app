<template>
    <v-ons-navigator swipeable
                     :page-stack="pageStack"
                     @deviceBackButton="backPage"
    >
    </v-ons-navigator>
</template>

<script>
import Page from './pages/index'

export default {
    name: 'app',
    data() {
        return {}
    },
    created() {
        let token = localStorage.getItem('token')
        if(token !== null) {
            this.$store.commit('setToken', token)
        }
        this.$store.commit('pushPage', Page.Landing)

        document.addEventListener("deviceready", () => {
            document.addEventListener("backbutton", () => {
                //alert('back')
                this.$store.commit('popPage')
            }, false);
        }, false);
    },
    methods: {
        backPage(event)  {
            event.preventDefault
            alert('back')
        }
    },
    computed: {
        pageStack() {
            return this.$store.getters.pageStack
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
