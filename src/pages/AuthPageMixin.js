import API from '../api'
import PageMixin from './PageMixin'
import Page from './index'

export default {
    mixins: [PageMixin],
    data() {
        return {
            api: null
        }
    },
    created() {
        if(this.$store.getters.isAuth) {
            let token = this.$store.getters.token
            this.api = new API(token)
        }
    }
}
