<template>
        <div class="column is-full">
            <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                {{post.title}}
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </a>
            </header>
            <div class="card-content">
                <div class="content">
                {{post.description}}
                <hr>
                <time datetime="2016-1-1"><strong>Обновлен: </strong><small>{{new Date(post.updateAt).toLocaleString()}}</small></time>
                </div>
            </div>
            <footer v-if="role ==='writer' && String(userId) === String(post.userId) " class="card-footer">
                <router-link  :to="{name:'Edit',params:{post_id:post.id,title:post.title,description:post.description}}" class="card-footer-item"><i class="material-icons">edit</i>Edit</router-link>
                <a @click.prevent="deletePost(post.id)" href="#" class="card-footer-item"><i class="material-icons">delete</i>Delete</a>
            </footer>
            <footer class="card-footer" v-if="role === 'reader'">
                <a @click.prevent="addClap(post.id,post.claps)" href="#" class="card-footer-item"><i class="material-icons">pan_tool</i>{{post.claps}}</a>
            </footer>
            </div>
        </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:['post'],
    computed:mapGetters(['isAuth','role','userId']),
    methods:{
        deletePost(id){
             this.$store.commit('deletePost',id);
        },
        addClap(id,claps){
            this.$store.commit('addClap',{id,claps});
        }
    }
}
</script>
