<template>
    <div class="col-md-4 offset-md-4">
        <div v-if="User">
            <p class="text-right">
                Hi
                <i>{{User}}</i>
            </p>
        </div>
        <div class="mb-5">
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" name="title" v-model="form.title" class="form-control" />
                </div>
                <div class="form-group">
                    <textarea
                        name="write_up"
                        v-model="form.write_up"
                        placeholder="Write up..."
                        class="form-control"
                    ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add post</button>
            </form>
        </div>

        <div v-if="Posts">
            <div v-for="post in Posts.data" :key="post.id">
                <div class="card mb-3">
                    <div class="card-header text-center">{{post.title}}</div>
                    <div class="card-body">
                        <p class="card-text">{{post.write_up}}</p>
                    </div>
                    <div class="card-footer text-muted">Written By: {{post.author}}</div>
                </div>
            </div>
        </div>
        <div v-else>Oh no!!! We have no posts</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Posts",
    data() {
        return {
            form: {
                title: "",
                write_up: "",
            },
        };
    },
    created: function () {
        // a function to call getposts action
        this.GetPosts();
    },
    computed: {
        ...mapGetters({ Posts: "StatePosts", User: "StateUser" }),
    },
    methods: {
        ...mapActions(["CreatePost", "GetPosts"]),
        async submit() {
            try {
                await this.CreatePost(this.form);
                this.form.title = "";
                this.form.write_up = "";
            } catch (error) {
                throw "Sorry you can't make a post now!";
            }
        },
    },
};
</script>
