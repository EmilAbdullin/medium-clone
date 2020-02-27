<template>
      <section class="section is-small">
        <div class="container">
        <listPosts
        :posts="postsPerPage"
        />
        </div>
        <Pagination/>
      </section>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from 'axios'
import listPosts from '@/components/listPosts';
import Pagination from "@/components/Pagination"
const baseURL = 'http://localhost:3000/';

export default {
 computed:mapGetters(['postsPerPage']),
 components:{
   listPosts,Pagination
 },
 async created (){
    try{
        const response = await axios.get(baseURL+'posts');
        this.$store.state.totalPage = response.data.length;
        this.$store.state.posts = response.data;
    }catch(e){
        console.log(e);
    }
  }
 
}
</script>
