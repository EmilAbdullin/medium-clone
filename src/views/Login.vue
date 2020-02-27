<template>
   <section class="section login is-small">
      <h1 class="title">Login</h1>
     <div class="columns is-centered">  
        <div class=
        "column is-one-third">      
          <b-field label="Username"
              :type="{'is-danger': hasError}"
              :message="{ 'Username is not found': hasError }">
              <b-input v-model="username" placeholder="Enter your username" maxlength="60" @input="checkLogin"></b-input>
          </b-field>
          <b-field label="Password">
              <b-input v-model="password" placeholder="Enter your password" type="password" maxlength="30"></b-input>
          </b-field>
           <b-button 
                @click="loginInSystem"
                tag="input"
                native-type="submit"
                type="is-success"
                value="Enter"/>
            </div>
        </div>
    </section>
</template>


<script>
import axios from 'axios'
import store from '@/store'
    export default {
        data() {
            return {
                password:'',
                username:'',
                hasError:false
            }
        },
        methods:{
            loginInSystem(){
                if(this.password !== '' && this.username !== '' && !this.hasError){
                    this.$store.commit('loginInSystem',{username:this.username,password: this.encodePass(this.password)});
                    this.password = '';
                    this.username = '';
                }else{
                    alert('Пожалуйста,проверьте данные');
                }
            },
            encodePass(password){
                return btoa(encodeURIComponent(password).replace(/%([0-9A-F]{2})/g,
                    function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
            },
            checkLogin(){
                axios.post('http://localhost:3000/checkLogin',{email:this.username})
                .then(res => {
                   if(res.data === 'no-user'){
                       this.hasError = true;
                   }else{
                        this.hasError = false;
                   }
                }).catch(e => {
                    console.log(e);
                })
            }
        },
        beforeRouteEnter (to, from, next) {
            if(store.state.isAuth){
                next('/');
            }else{
                next();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title{
    text-align: center;
    }
</style>