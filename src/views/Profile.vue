<template>
  <div v-if="isLoggedIn">Profile</div>
  <div v-else>
    <h2>Это страница для зарегистрированных пользователей</h2>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import getterTypes from '@/store/modules/auth'
export default {
  name: 'AppProfile',
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
    ...mapGetters({
      currentUser: getterTypes.currentUser,
    }),
  },
}
</script>
