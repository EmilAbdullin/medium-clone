<template>
   <section class="section login is-small">
      <h1 class="title">Create new post</h1>
     <div class="columns is-centered">  
        <div class="column is-one-third">      
          <b-field label="Title">
              <b-input v-model="title" placeholder="Title"></b-input>
          </b-field>
          <b-field label="Description">
            <b-input v-model="description" placeholder="Description" type="textarea"></b-input>
        </b-field>
           <b-button 
                @click.prevent="createNewPost"
                tag="input"
                native-type="submit"
                type="is-success"
                value="Enter"/>
            </div>
        </div>
    </section>
  

</template>


<script>
import store from '@/store'
    export default {
        data() {
            return {
                title:'',
                description:''
            }
        },
        methods:{
            createNewPost(){
                if(this.title !== '' && this.description){
                    let createTime = new Date().toISOString();
                    let postId = this.$store.state.posts.length + 1;
                    this.$store.commit('createNewPost',{
                        id:postId,
                        title:this.title,
                        description:this.description,
                        claps:0,
                        createdAt:createTime,
                        updateAt:createTime,
                        userId:this.$store.state.userId
                    });
                    this.title = '';
                    this.description = '';
                }else{
                    alert('Поля не могут быть пустыми');
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            if(store.state.isAuth && store.state.role === 'writer'){
                next()
            }else{
                next('/login')
            }
        }
    }
</script>


<style lang="scss" scoped>
.title{
  text-align: center;
}
</style>