<template>
  <div class="home">
    <h1>Todo</h1>
    <TodoInput @createTodo="createTodo" />
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode' // jwt를 해석해보여주는 라이브러리
import router from '@/router'
import TodoList from '@/components/TodoList'
import TodoInput from '@/components/TodoInput'


export default {
  name: 'Home',
  data() {
    return {
      todos: []
    }
  },
  components: {
    TodoList,
    TodoInput,
  },
  methods: {

    // 사용자 로그인 유무를 확인하여 로그인 되어 있지 않을 시 로그인 페이지로 보내겠다.
    checkLoggedIn() {
      // 1. 세션을 시작해서 
      this.$session.start()

      // 2. 'jwt'가 있는지 확인
      if (!this.$session.has('jwt')) {
        // 로그인 페이지로 보내겠다.
        router.push('/login')
      }
    },

    getTodo() {
      this.$session.start()
      const token = this.$session.get('jwt')
      const userId = jwtDecode(token).user_id

      const SERVER_IP = process.env.VUE_APP_SERVER_IP

      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      axios.get(SERVER_IP + `/api/v1/users/${userId}/`, options)
      .then(response => {
        this.todos = response.data.todo_set
      })
      .catch(error =>{
        console.error(error)
      })
      
    },

    createTodo(title) {
      this.$session.start()
      const token = this.$session.get('jwt')
      const SERVER_IP = process.env.VUE_APP_SERVER_IP
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
      const userId = jwtDecode(token).user_id
      const data = {
        title,
        user: userId
      }

      axios.post(`${SERVER_IP}/api/v1/todos/`, data, options)
      .then(response => {
        console.log(response.data)
      })
      .catch(error=>{
        console.error(error)
      })
      
    }
  },

  // Vue 가 화면에 그려지면 실행하는 함수
  mounted() {
    this.checkLoggedIn()
    this.getTodo()
  }

}
</script>

<style>

</style>