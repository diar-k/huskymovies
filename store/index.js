import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const createStore = () => {
  return new Vuex.Store({
    state: {
      filter: {
        sort_by: 'popularity.desc',
        release_year: 2017,
        genre: ''
      },
      favorites: []
    },
    plugins: [createPersistedState()],
    getters: {
      isFavorited: state => (movie) => {
        return state.favorites.find(x => x.id === movie.id)
      }
    },
    mutations: {
      favorite (state, movie) {
        state.favorites.push(movie)
      },
      unfavorite (state, movie) {
        let index = state.favorites.indexOf(movie)
        state.favorites.splice(index, 1)
      },
      updateSortBy (state, value) {
        state.filter.sort_by = value
      },
      updateReleaseYear (state, value) {
        state.filter.release_year = value
      },
      updateGenre (state, value) {
        state.filter.genre = value
      }
    },
    actions: {
      favorite ({ commit, getters }, movie) {
        if (getters.isFavorited(movie)) {
          commit('unfavorite', movie)
        } else {
          commit('favorite', movie)
        }
      }
    }
  })
}

export default createStore
