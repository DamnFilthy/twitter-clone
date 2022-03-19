<template>
  <div class="top-bar__wrapper">
    <div><router-link to="/">Home</router-link></div>

    <div class="not-auth" v-if="isLoggedIn === null || isLoggedIn === false">
      <router-link :to="{name: 'register'}">Регистрация</router-link>
      <router-link :to="{name: 'login'}">Войти</router-link>
    </div>

    <div class="top-bar__login-bar" v-else>
      <router-link
        :to="{name: 'profile', params: {slug: currentUser.username}}"
      >
        <img class="user-avatar" :src="currentUser.image" alt="avatar" />
        {{ currentUser.username }}
      </router-link>
      <router-link :to="{name: 'settings'}"> Settings </router-link>
      <router-link :to="{name: 'createArticle'}">Create Article</router-link>
      <div class="logout-link" @click.prevent="logout">Выйти</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'AppTopBar',
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.user,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
  },
  methods: {
    logout() {
      this.$store.state.auth.isLoggedIn = false
    },
  },
}
</script>

<style lang="scss">
.top-bar {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__login-bar {
    display: flex;
    align-items: center;
  }
}
.logout-link {
  margin-right: 15px;
  cursor: pointer;
}
.user-avatar {
  border-radius: 100%;
  width: 50px;
  height: 50px;
}
.not-auth {
  display: flex;
}
</style>
