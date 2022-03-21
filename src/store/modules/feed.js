import feedApi from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  errors: null,
}

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure',
}

export const actionTypes = {
  getFeed: '[feed] getFeed',
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.data = null
    state.errors = null
    state.isLoading = true
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.data = payload
    state.errors = null
    state.isLoading = false
  },
  [mutationTypes.getFeedFailure](state, errors) {
    state.isLoading = false
    state.errors = errors
  },
}

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getFeedStart)
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          context.commit(mutationTypes.getFeedSuccess, response.data)
          resolve(response.data)
        })
        .catch((errors) => {
          context.commit(
            mutationTypes.getFeedFailure,
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
}
