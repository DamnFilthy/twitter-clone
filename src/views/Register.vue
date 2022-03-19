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
        <h1 class="form-title">Регистрация</h1>
        <div class="form-group">
          <input
            placeholder=" "
            type="text"
            class="form-input"
            v-model="username"
            required
          />
          <label class="form-label"> Username </label>
        </div>
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
          <router-link :to="{name: 'login'}">Уже есть аккаунт?</router-link>
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
  name: 'AppRegister',
  components: {Spinner, AppValidationErrors},
  data() {
    return {
      username: null,
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
        username: this.username,
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch(actionTypes.register, user).then(() => {
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

<style lang="scss">
.wrapper {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  width: 400px;
  padding: 32px;
  display: block;
  border: 10px;
  box-shadow: 0 4px 16px #ccc;
  letter-spacing: 1px;
}

.form-input {
  letter-spacing: 1px;
  font-size: 16px;
}
.form-button {
  height: 40px;
  width: 130px;
  letter-spacing: 1px;
  font-size: 16px;
  &:disabled {
    cursor: default;
    background-color: red;
    &:hover {
      background-color: red;
    }
  }
}

.form-title {
  text-align: center;
  margin: 0 0 32px 0;
  font-weight: normal;
}

.form-group {
  position: relative;
  margin-bottom: 32px;
}

.form-label {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  color: #9e9e9e;
  transition: 0.3s ease-in-out;
}

.form-input {
  outline: none;
  width: 100%;
  padding-bottom: 10px;
  border: none;
  border-bottom: 1px solid #c0c0c0;
  background-color: transparent;
  transition: 0.3s ease-in-out;
}

.form-input:focus {
  border-bottom: 1px solid #1a73a8;
}

.form-input:focus ~ .form-label,
.form-input:not(:placeholder-shown) ~ .form-label {
  top: -18px;
  font-size: 12px;
  color: #c0c0c0;
}

.form-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #0071f0;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.form-button:hover,
.form-button:focus {
  background-color: rgba(0, 113, 240, 0.7);
}

.login-link {
  margin-top: 30px;
  font-size: 14px;
  a {
    text-decoration: none;
  }
}
</style>
