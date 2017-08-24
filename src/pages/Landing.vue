<template>
    <v-ons-page id="landing">

    </v-ons-page>
</template>

<script>
import PageMixin from './PageMixin'
import Page from './index'
export default {
    name: 'landing',
    mixins: [ PageMixin ],
    mounted() {
        console.log('Landing Mountend')
        if(this.$store.getters.isAuth) {
            this.pushPage(this.Page.TodoList)
        } else {
            this.pushPage(this.Page.Login)
        }
    }
}
</script>
