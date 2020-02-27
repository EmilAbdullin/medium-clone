<template>
   <section class="section login is-small">
      <h1 class="title">Edit post {{$route.params.post_id}}</h1>
     <div class="columns is-centered">  
        <div class="column is-one-third">      
          <b-field label="Title">
              <b-input v-model="title" :placeholder="$route.params.title || 'Title' "></b-input>
          </b-field>
          <b-field label="Description">
            <b-input v-model="description" :placeholder="$route.params.description || 'Description' " type="textarea"></b-input>
        </b-field>
           <b-button tag="input"
                native-type="submit"
                type="is-success"
                @click.prevent="updatePost($route.params.post_id)"
                value="Save"/>
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
            updatePost(postId){
                if(this.title === '' && this.description === ''){
                    alert('Решили ничего не менять?');
                }else{
                    let updateAt = new Date().toISOString();
                    this.$store.commit('updatePost',{
                        id:postId,
                        title:this.title,
                        description:this.description,
                        updateAt:updateAt
                    });
                    this.title = '';
                    this.description = '';   
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