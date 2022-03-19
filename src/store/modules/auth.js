import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  user: null,
  errors: null,
  isSubmitting: false,
  isLoggedIn: null,
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
}
export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonimus: '[auth] isAnonimus',
}
const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonimus]: (state) => {
    return state.isLoggedIn === false
  },
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.errors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.user = payload
    state.errors = null
    state.isSubmitting = false
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, errors) {
    state.isSubmitting = false
    state.errors = errors
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.errors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.user = payload
    state.errors = null
    state.isSubmitting = false
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, errors) {
    state.isSubmitting = false
    state.errors = errors
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((errors) => {
          context.commit(
            mutationTypes.registerFailure,
            errors.response.data.errors
          )
        })
    })
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((errors) => {
          context.commit(
            mutationTypes.loginFailure,
            errors.response.data.errors
          )
        })
    })
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
