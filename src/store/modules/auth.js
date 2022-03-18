import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  user: null,
  errors: null,
  isSubmitting: false,
  isLoggedIn: null,
}
const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.errors = null
  },
  registerSuccess(state, payload) {
    state.user = payload
    state.errors = null
    state.isSubmitting = false
    state.isLoggedIn = true
  },
  registerFailure(state, errors) {
    state.isSubmitting = false
    state.errors = errors
  },
}
const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then((response) => {
          context.commit('registerSuccess', response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((errors) => {
          context.commit('registerFailure', errors.response.data.errors)
        })
    })
  },
}
export default {
  state,
  mutations,
  actions,
}
