import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
Vue.use(Vuex)
const restURI = 'http://localhost:3000/'
export default new Vuex.Store({
  state: {
    posts:[],
    isAuth: JSON.parse(localStorage.getItem('USER_INFO')) !== null ? true : false,
    currentPage:1,
    totalPage:null,
    postsPerPage:[],
    userId:JSON.parse(localStorage.getItem('USER_INFO')) !== null ? JSON.parse(localStorage.getItem('USER_INFO')).userId : null,
    role:JSON.parse(localStorage.getItem('USER_INFO')) !== null ? JSON.parse(localStorage.getItem('USER_INFO')).role : 'no-role'
  },
  mutations: {
    changePage(state,currentPage){
      state.currentPage =  currentPage;
    },
    loginInSystem(state,payload){
      axios.post('http://localhost:3000/login',{login:payload.username,password:payload.password})
      .then(res => {
          if(res.status === 200) {
              localStorage.setItem('USER_INFO',JSON.stringify(res.data.userInfo));
              state.isAuth = true;
              state.role = res.data.userInfo.role;
              state.userId = res.data.userInfo.userId;
              router.push('/');
          }else{
              alert('Пароли не совпали');
          }
      }).catch(e =>{
          console.log(e);
      })
    },
    deletePost(state,id){
      state.posts =  state.posts.filter(post => post.id !== id)
      state.totalPage = state.posts.length;
      axios.delete(restURI + `posts/${id}`)
      .then(res => {
        alert('Пост удален');
      })
      .catch(e => {
        console.log(e);
      })
    },
    addClap(state,{id,claps}){
      state.posts.forEach(post => {
        if(post.id === id){
          post.claps = post.claps + 1;
        }
      })
      claps += 1;
      axios.patch(restURI + `posts/${id}`,{claps:claps})
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      })
    },
    updatePost(state,payload){
      if(payload.title !== '' && payload.description !== ''){
        axios.patch(restURI + `posts/${payload.id}`,{
          title:payload.title,
          description:payload.description,
          updateAt:payload.updateAt
        }).then(res => {
          router.push('/');
        }).catch(e => {
          console.log(e);
        })
      }
      if(payload.title !== '' && payload.description === ''){
        axios.patch(restURI + `posts/${payload.id}`,{
          title:payload.title,
          updateAt:payload.updateAt
        }).then(res => {
          router.push('/');
        }).catch(e => {
          console.log(e);
        })
      }else{
        axios.patch(restURI + `posts/${payload.id}`,{
          description:payload.description,
          updateAt:payload.updateAt
        }).then(res => {
          router.push('/');
        }).catch(e => {
          console.log(e);
        })
      }
    },
    createNewPost(state,payload){
      axios.post(restURI + `posts`,payload)
      .then(res => {
        router.push('/');
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    postsPerPage(state){
      if(state.posts.length <= 10){
        return state.posts;
      }else{
          let start = 10 * (state.currentPage - 1);
          let end = start + 10;
          state.postsPerPage = state.posts.slice(start,end);
          return state.postsPerPage;
      }
    },
    isAuth(state){
      return state.isAuth;
    },
    totalPage(state){
      return state.totalPage;
    },
    role(state){
      return state.role;
    },
    userId(state){
      return state.userId;
    }
  }
})
