import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  user: null,
  errors: null,
  isSubmitting: false,
  isLoggedIn: false,
  isLoading: false,
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
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

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.currentUser = null
    state.isLoading = false
    state.isLoggedIn = false
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
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          )
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure)
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
