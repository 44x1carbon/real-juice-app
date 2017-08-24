<template>
    <v-ons-page id="todo-list">
        <v-ons-toolbar style="backgroundColor: #4282cc">
            <div class="left">リア充っぽいことリスト</div>
            <div class="right" style="padding: 0 20px; background-color: #f90; font-size: 14px" @click="logout">
                <v-ons-icon icon="fa-sign-out"></v-ons-icon>ログアウト
            </div>
        </v-ons-toolbar>
        <div class="bg">
            <div class="bg-over">
                <p style="padding: 0 10px;">
                    <v-ons-search-input placeholder="Search" v-model="query"></v-ons-search-input>
                    <br><span style="vertical-align: bottom">
                        <v-ons-checkbox
                            input-id="unachieved"
                            v-model="unachieved"
                        >
                        </v-ons-checkbox>
                        <label for="unachieved">未達成のみ</label>
                    </span>
                </p>
                <v-ons-list>
                    <template v-for="todo in todos">
                        <v-ons-list-header>
                            <v-ons-icon icon="zmdi-star, material:md-zmdi-star"></v-ons-icon>
                            {{ todo.name }}
                        </v-ons-list-header>
                        <v-ons-list-item>
                            <div class="left">
                                投稿数{{ todo.posts.length }}回
                            </div>
                            <div class="right">
                                <span style="text-align: right;width: 100%">合計{{ todo.total_point }}ml</span>
                            </div>
                        </v-ons-list-item>
                    </template>
                </v-ons-list>
            </div>
        </div>
        <v-ons-fab
            position="bottom right"
            style="backgroundColor: #4282cc"
            @click="pushPage(Page.PostForm)"
        >
            <v-ons-icon icon="md-edit"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
import AuthPageMixin from './AuthPageMixin'

export default {
    mixins: [ AuthPageMixin ],
    data() {
        return {
            userTodos: [],
            query: '',
            unachieved: false
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.pushPage(this.Page.Login)
        }
    },
    computed: {
        todos() {
            return this.userTodos
                .filter(todo => todo.name.indexOf(this.query) != -1)
                .filter(todo => this.unachieved? todo.achievement == false : true)
        }
    },
    created() {
        this.api.feachMeTodos().then(res => {
            this.userTodos = res.data
        })
    }
}
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    background-image: url(https://s3-ap-northeast-1.amazonaws.com/real-juice/resource/back-image.jpg);
    background-size: cover;
}
.bg-over {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
}
</style>
