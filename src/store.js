import Vue from 'vue'
import Vuex from 'vuex'
import Page from './pages/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        pages: []
    },
    mutations: {
        setToken: (state, token) => {
            if(token === null) localStorage.clear()
            state.token = token
        },
        pushPage: (state, page) => {
            let idx = state.pages.indexOf(page)
            if(idx !== -1) state.pages.splice(idx, 1)
            state.pages.push(page)
        },
        toLanding: state => state.pages = [],
        popPage: state => state.pages.pop()
    },
    actions: {
        setToken: ({ commit }, token) => {
            localStorage.setItem('token', token)
            commit('setToken', token)
        },

    },
    getters: {
        isAuth: state => state.token != null,
        token: state => state.token,
        pageStack: state => state.pages
    }
})
