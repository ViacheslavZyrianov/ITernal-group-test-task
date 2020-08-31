export const state = () => ({
  galaxies: []
})

export const actions = {
  async fetchGalaxies ({ commit }) {
    await fetch('https://test-frontend-api.herokuapp.com/galaxies')
      .then(res => res.json())
      .then(res => {
        commit('SET_GALAXIES', res)
      })
  }
}

export const mutations = {
  SET_GALAXIES (state, payload) {
    state.galaxies = payload
  }
}