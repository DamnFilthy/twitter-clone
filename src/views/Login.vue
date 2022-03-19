<template>
  <div class="wrapper">
    <div class="register">
      <AppValidationErrors :validationErrors="isErrors" v-if="isErrors" />
      <form
        class="form"
        action="#"
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="onSubmit"
      >
        <h1 class="form-title">Вход</h1>
        <div class="form-group">
          <input
            placeholder=" "
            type="email"
            class="form-input"
            v-model="email"
            required
          />
          <label class="form-label"> Email </label>
        </div>
        <div class="form-group">
          <input
            placeholder=" "
            type="password"
            class="form-input"
            v-model="password"
            required
          />
          <label class="form-label"> Password </label>
        </div>
        <button class="form-button" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Отправить</span>
          <span v-else> <Spinner /> </span>
        </button>

        <div class="login-link">
          <router-link :to="{name: 'register'}"
            >Нет аккаунта? Зарегистрироваться</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Spinner from '@/components/Spinner'
import AppValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from '@/store/modules/auth'
import {mapState} from 'vuex'

export default {
  name: 'AppLogin',
  components: {Spinner, AppValidationErrors},
  data() {
    return {
      email: null,
      password: null,
    }
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      isErrors: (state) => state.auth.errors,
    }),
  },
  methods: {
    onSubmit() {
      let user = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch(actionTypes.login, user).then(() => {
        this.username = null
        this.email = null
        this.password = null
        this.$router.push({name: 'home'})
      })
    },
  },
  mounted() {
    this.$store.state.auth.errors = null
  },
}
</script>
