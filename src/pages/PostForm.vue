<template>
    <v-ons-page id="post-form">
        <div class="bg">
            <div class="bg-over">
            <h1 style="text-align: center">リア充っぽい投稿</h1>
            <form style="padding: 0 20px">
                <div class="row">
                    <label for="todo">やったリア充っぽいこと</label><br>
                    <v-ons-select v-model="selectTodoId" id="todo">
                        <option v-for="todo in todos" :value="todo.id">
                            {{ todo.name }}
                        </option>
                    </v-ons-select>
                </div>
                <div class="row" id="input-image">
                    <label for="">リア充っぽい写真</label><br>
                    <div class="display-image">
                        <img :src="imageSrc" alt="">
                    </div>
                    <label for="select-image" id="select-image-label">写真を選ぶ</label>
                    <input type="file" id="select-image" @change="selectImage($event)">
                </div>
                <div style="margin-top: 40px">
                    <button type="button" id="post-button" @click="post">投稿</button>
                </div>
            </form>
            <v-ons-modal :visible="postingWait" id="post-wait">
                <p style="text-align: center">
                    投稿中 <v-ons-icon icon="fa-spinner" spin></v-ons-icon>
                </p>
            </v-ons-modal>
            <v-ons-modal :visible="postResultShow" :options="{ animation: 'fade' }" id="result-modal" v-if="postResult != null">
                <post-result :result="postResult" ></post-result>
                <button type="button" id="close-result-button" @click="closeResult">閉じる</button>
            </v-ons-modal>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
import AuthPageMixin from './AuthPageMixin'
import Page from './index'
import PostResult from '../components/PostResult.vue'

export default {
    name: 'post-form',
    mixins: [AuthPageMixin],
    data() {
        return {
            selectTodoId: '',
            todos: [],
            imageSrc: 'https://placehold.jp/cccccc/989898/240x200.png?text=No%20Image',
            postingWait: false,
            postResultShow: true,
            postResult: null
        }
    },
    methods: {
        selectImage($event) {
            let file = $event.target.files[0]
            let fileReader = new FileReader()
            fileReader.onload = evt => {
                this.imageSrc = evt.target.result
            }
            fileReader.readAsDataURL(file)
        },
        post() {
            if(this.selectTodoId === '') {
                this.$ons.notification.alert('画像を選択してください。')
                return
            }
            if(this.imageSrc === 'https://placehold.jp/cccccc/989898/240x200.png?text=No%20Image') {
                this.$ons.notification.alert('画像を選択してください。')
                return
            }
            this.postingWait = true
            let postData = {
                todo_id: parseInt(this.selectTodoId),
                image_base64: this.imageSrc,
                text: 'test'
            }
            this.api.postPost(postData)
                .then(res => {
                    this.postingWait = false
                    this.postResult = res.data
                    this.postResultShow = true
                })
                .catch(err => {
                    this.$ons.notification.alert('投稿に失敗しました。')
                })
        },
        closeResult() {
            this.postResultShow = false
            this.postResult = null
            this.selectTodoId = this.todos[0].id
            this.imageSrc = 'https://placehold.jp/cccccc/989898/240x200.png?text=No%20Image'
            this.pushPage(this.Page.TodoList)
        }
    },
    created() {
        this.api.feachTodos()
            .then(res => {
                this.todos = res.data
                this.selectTodoId = this.todos[0].id
            })
    },
    components: {
        PostResult
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
    .row {
        margin-bottom: 20px;
    }
    #todo {
        width: 100%;
    }
    #input-image {
        min-height: 300px;
    }
    #input-image img {
        width: 100%;
        height: auto;
    }
    .display-image {
        width: 100%;
        margin-bottom: 10px;
    }
    .display-image img {
        width: 100%;
        height: auto;
    }
    #select-image {
        display: none;
    }
    #select-image-label {
        display: inline-block;
        width: 100px;
        text-align: center;
        background-color: #f90;
        color: #fff;
        border-radius: 10px;
        padding: 8px;
    }
    #post-button {
        width: 100%;
        border: none;
        background-color: #4169E1;
        color: #fff;
        padding: 8px;
        border-radius: 10px;
        font-size: 24px;
    }

    #result-modal {
        padding: 20px;
    }

    #close-result-button {
        margin-top: 20px;
        border: none;
        width: 100px;
        text-align: center;
        background-color: #f90;
        color: #fff;
        border-radius: 10px;
        padding: 8px;
        font-size: 16px;
    }
</style>
