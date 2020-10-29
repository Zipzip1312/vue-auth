<template>
    <div class="col-md-4 offset-md-4">
        <div v-if="User">
            <p>Hi {{User}}</p>
        </div>
        <div>
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
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="mt-3" v-if="Posts">
            <ul>
                <li v-for="post in Posts" :key="post.id">
                    <div id="post-div">
                        <p>{{post.title}}</p>
                        <p>{{post.write_up}}</p>
                        <p>Written By: {{post.author.username}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else class="mt-3">Oh no!!! We have no posts</div>
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
            } catch (error) {
                throw "Sorry you can't make a post now!";
            }
        },
    },
};
</script>
