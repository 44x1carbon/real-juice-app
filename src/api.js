import axios from 'axios'

//let baseURL = 'http://localhost:8000/api/'
let baseURL = 'https://real-juice.herokuapp.com/api/'

export default class API {
    constructor(token) {
        this.request = axios.create({
            baseURL,
            headers: { 'Access-Token': token },
        })
    }

    auth(email, password) {
        return this.request.post('auth/token', {email, password})
    }

    feachTodos() {
        return this.request.get('todos')
    }

    feachMeTodos() {
        return this.request.get('me/todos')
    }

    postPost(postData) {
        return this.request.post('me/posts', postData)
    }
}
