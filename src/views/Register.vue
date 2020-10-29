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
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <p v-if="showError" class="text-danger mt-3" v-text="errorMessage"></p>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Register",
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            showError: false,
            errorMessage: "",
        };
    },
    methods: {
        ...mapActions(["Register"]),
        async submit() {
            this.showError = false;

            try {
                await this.Register(this.form);
                this.$router.push("/posts");
                this.showError = false;
            } catch (error) {
                this.showError = true;
                this.errorMessage = error;
            }
        },
    },
};
</script>
