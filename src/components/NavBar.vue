<template>
    <div id="nav" class="mb-4">
        <router-link to="/">Home</router-link>|
        <router-link to="/posts">Posts</router-link>|
        <span v-if="isLoggedIn">
            <a @click="logout">Logout</a>
        </span>
        <span v-else>
            <router-link to="/register">Register</router-link>|
            <router-link to="/login">Login</router-link>
        </span>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    computed: {
        isLoggedIn: function () {
            return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch("LogOut");
            this.$router.push("/login");
        },
    },
};
</script>

<style>
#nav {
    padding: 30px;
    text-align: center;
}
#nav a {
    display: inline-block;
    min-width: 100px;
    font-weight: bold;
    color: #333;
}
#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
