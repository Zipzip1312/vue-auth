import axios from 'axios'

const state = {
    user: null,
    posts: null,
};

const getters = {
    isAuthenticated: state => !!state.user,
    StatePosts: state => state.posts,
    StateUser: state => state.user,
};

const actions = {
    async Register({ dispatch }, form) {
        await axios.post('users', form);
        await dispatch('LogIn', form);
    },

    async LogIn({ commit }, form) {
        let response = await axios.get(`users?username=${form.username}&password=${form.password}`);
        if (response.data.length === 0) {
            throw new Error('User not found!');
        }
        commit('setUser', form.username);
    },

    async CreatePost({ state, dispatch }, post) {
        post.author = state.user;
        await axios.post('posts', post);
        await dispatch('GetPosts');
    },

    async GetPosts({ commit }) {
        let response = await axios.get('posts?_sort=id&_order=desc');
        commit('setPosts', response);
    },

    async LogOut({ commit }) {
        let user = null;
        commit('LogOut', user)
    }
};

const mutations = {
    setUser(state, username) {
        state.user = username
    },

    setPosts(state, posts) {
        state.posts = posts
    },

    LogOut(state) {
        state.user = null
        state.posts = null
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
