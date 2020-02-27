<template>
    <div class="columns is-multiline">
        <Post
            v-for="(post, index) of posts"
            :key="index"
            v-bind:post="post"
        />
      </div>
</template>


<script>
import Post from './Post'

export default {
    props:['posts'],
    components:{
        Post
    }

}
</script>