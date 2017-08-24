import Page from './index'
import Vue from 'vue'

export default {
    data() {
        return {
            Page
        }
    },
    methods: {
        pushPage(vueInstance) {
            this.$store.commit('pushPage', vueInstance)
        },
        toLanding() {
            this.$store.commit('toLanding')
        }
    }
}
