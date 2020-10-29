<template>
    <div class="col-md-4 offset-md-4">
        <form @submit.prevent="submit">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" name="username" v-model="form.username" class="form-control" />
            </div>
            <div class="form-group">
                <label for="full_name">Full Name:</label>
                <input type="text" name="full_name" v-model="form.full_name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="form.password" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <p v-if="showError" class="text-danger">Username already exists</p>
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
                full_name: "",
                password: "",
            },
            showError: false,
        };
    },
    methods: {
        ...mapActions(["Register"]),
        async submit() {
            try {
                await this.Register(this.form);
                this.$router.push("/posts");
                this.showError = false;
            } catch (error) {
                this.showError = true;
            }
        },
    },
};
</script>
