<template>
  <div id="nav">
    <AppTopBar />
  </div>
  <router-view />
</template>

<script>
import AppTopBar from '@/components/TopBar'
import {actionTypes} from './store/modules/auth'

export default {
  name: 'App',
  components: {AppTopBar},
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #2c3e50;
    &:not(:last-child) {
      margin-right: 10px;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
    img {
      margin-right: 10px;
    }
  }
}
</style>
