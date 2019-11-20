<template>
  <div class="home">
    <h1>Todo</h1>
    <TodoInput @createTodo="createTodo" />
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import axios from 'axios'
// import jwtDecode from 'jwt-decode' // jwt를 해석해보여주는 라이브러리
import { mapGetters } from 'vuex' // import vuex from 'vuex' ; vuex.mapGetters
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
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'options',
      'userId'
    ])
  },
  components: {
    TodoList,
    TodoInput,
  },
  methods: {

    // 사용자 로그인 유무를 확인하여 로그인 되어 있지 않을 시 로그인 페이지로 보내겠다.
    checkLoggedIn() {
      if (!this.isLoggedIn) {
        // 로그인 페이지로 보내겠다.
        router.push('/login')
      }
    },

    getTodo() {
      const SERVER_IP = process.env.VUE_APP_SERVER_IP

      axios.get(SERVER_IP + `/api/v1/users/${this.userId}/`, this.options)
      .then(response => {
        this.todos = response.data.todo_set
      })
      .catch(error =>{
        console.error(error)
      })
      
    },

    createTodo(title) {
      const SERVER_IP = process.env.VUE_APP_SERVER_IP
      const data = {
        title,
        user: this.userId
      }

      axios.post(`${SERVER_IP}/api/v1/todos/`, data, this.options)
      .then(response => {
        this.todos.push(response.data)
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
  },

  watch: {
    isLoggedIn() {
      this.getTodo()
    }
  }

}
</script>

<style>

</style>