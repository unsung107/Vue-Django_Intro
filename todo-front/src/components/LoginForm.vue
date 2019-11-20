<template>
  <div class="login-div">
    <div class="spinner-border" v-if="loading" role="status">
      <span class="sr-only">Loading..</span>
      
    </div>
    <div v-else class="login-form">
      <div class="alert alert-danger" v-if="errors.length">
        <h4>다음의 오류를 해결해주세요</h4>
        <hr>
        <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>
      <div class="form-group">
        <label for="id">ID</label>
        <input type="text" id='id' class="form-control" placeholder="아이디를 입력해주세요" v-model="credentials.username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id='password' class="form-control" placeholder="비밀번호를 입력해주세요" v-model="credentials.password">
      </div>
      <button class="btn btn-success" @click="login">로그인</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
  name: 'LoginForm',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      loading: false,
      errors: [],
    }
  },
  methods: {
    login() {
      if (this.checkForm()) {
        this.loading = true
        
        // 127.0.0.1:8000
        const SERVER_IP = process.env.VUE_APP_SERVER_IP

        axios.post(SERVER_IP + '/api-token-auth/', this.credentials)
        .then(response => {
          // 세션을 초기화, 사용하겠다.
          this.$session.start()

          this.$session.set('jwt', response.data.token)

          // vuex store 를 this.$store로 접근가능
          this.$store.dispatch('login', response.data.token)

          console.log(response)
          this.loading = false

          router.push('/')
        })
        .catch(error=>{
          console.error(error)
          this.loading = false
        })
      }
    },
    checkForm() {
      this.errors = []
      if (!this.credentials.username) {
        this.errors.push('아이디를 입력해주세요.')
      }
      if (this.credentials.password.length < 8) {
        this.errors.push('비밀번호는 8글자 이상 입력해주세요.')
      }
      if (this.errors.length == 0) {
        return true
      }
    },
  },
}
</script>

<style>

</style>