import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const createStore = () => {
  return new Vuex.Store({
    state: {
      filter: {
        sort_by: 'popularity.desc',
        release_year: 2018,
        genres: []
      },
      favorited: []
    },
    plugins: [createPersistedState()],
    getters: {
      isFavorited: state => (id) => {
        return state.favorited.includes(id)
      }
    },
    mutations: {
      favorite (state, id) {
        state.favorited.push(id)
      },
      unfavorite (state, id) {
        let index = state.favorited.indexOf(id)
        state.favorited.splice(index, 1)
      },
      updateSortBy (state, value) {
        state.filter.sort_by = value
      }
    },
    actions: {
      favorite ({ commit, getters }, id) {
        if (getters.isFavorited(id)) {
          commit('unfavorite', id)
        } else {
          commit('favorite', id)
        }
      }
    }
  })
}

export default createStore
