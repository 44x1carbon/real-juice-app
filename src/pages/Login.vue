<template>
    <v-ons-page id="landing">
        <div class="bg">
            <div class="bg-over">
            <div class="center">
                <h1>LOGIN</h1>
                <div  class="input">
                    <label>メールアドレス</label><br>
                    <input type="text" placeholder="example@yahoo.co.jp" v-model="email">
                </div>
                <div  class="input">
                    <label>パスワード</label><br>
                    <input type="password" v-model="password">
                </div>
                <div style="margin-bottom: 100px">
                    <button class="login-btn" @click="login">ログイン</button>
                </div>
                <span class="link" @click="linkClick('https://real-juice.herokuapp.com/register')">アカウント作成</span>
            </div>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
import PageMixin from './PageMixin'
import Page from './index'
import API from '../api'

export default {
    mixins: [ PageMixin ],
    data() {
        return {
            api: new API(),
            email: '',
            password: '',
        }
    },
    methods: {
        login() {
            if(this.validate()) {
                this.api.auth(this.email, this.password)
                    .then(res => {
                        let token = res.data.token
                        this.$store.dispatch('setToken', token)
                        this.pushPage(this.Page.TodoList)
                    })
                    .catch(err => {
                        console.log(err)
                        this.$ons.notification.alert({
                            title: 'ログインエラー',
                            message: 'メールアドレスとパスワードを確認してください'
                        })
                    })

            }
        },
        linkClick(url) {
            window.open(url, '_blank')
        },
        validate() {
            let { email, password } = this.$data
            if(email === '' && password === '') {
                this.$ons.notification.alert('メールアドレスとパスワードを入力してください')
                return false
            } else if(email === '') {
                this.$ons.notification.alert('メールアドレスを入力してください')
                return false
            } else if(password === '') {
                this.$ons.notification.alert('パスワードを入力してください')
                return false
            } else {
                return true
            }
        }
    },
    created() {
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
.bg :before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    border-right: 30px solid rgba(0, 0, 0, 0);
    border-top: 30px solid #f90;
    content: "";
}
.bg :after {
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    border-left: 30px solid rgba(0, 0, 0, 0);
    border-bottom: 30px solid #f90;
    content: "";
}
.center {
    text-align: center;
    padding: 20px;
}

.input {
    margin: 0 auto;
    width: 260px;
    margin-bottom: 80px;
    text-align: left;
}
.input label {
    width: 100%;
    text-align: left;
}
.input input {
    border: none;
    width: 100%;
    border-bottom: solid 1px;
    font-size: 24px;
    text-align: center;
}

.login-btn {
    border: none;
    width: 260px;
    font-size: 18px;
    padding: 5px;
    color: #ffffff;
    background-color: #dc5236;
}

.link {
    color: #25a6d9;
    border-bottom: solid 1px #25a6d9;
}
</style>
