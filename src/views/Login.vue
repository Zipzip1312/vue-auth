<template>
    <div class="col-md-4 offset-md-4">
        <form @submit.prevent="submit">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" name="username" v-model="form.username" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="form.password" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <p v-if="showError" class="text-danger mt-3">Username or Password is incorrect</p>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            showError: false,
        };
    },
    methods: {
        ...mapActions(["LogIn"]),
        async submit() {
            try {
                await this.LogIn(this.form);
                this.$router.push("/posts");
                this.showError = false;
            } catch (error) {
                this.showError = true;
            }
        },
    },
};
</script>
