// import Vue from 'vue'
// import api from '../services/api'

export const state = () => ({

  activePage: 'Home',

  loading: {
  },

  alert: {
    is: false,
    type: '',
    message: '',
    title: '',
    persistence: false
  },

  banks: [],
  codeBanks: []

})

export const getters = {

  getState: state => (payload) => {
    return state[payload]
  },

  getAlert (state) {
    return state.alert
  },

  getActivePage (state) {
    return state.activePage
  },

  getBanks (state) {
    return state.banks
  },

  getBankCode: state => (bankName) => {
    let bankCode
    state.codeBanks.find((el) => {
      if (bankName.toLowerCase() === (el.name).toLowerCase()) {
        bankCode = el.code
      }
    })

    return bankCode
  },

  getLoading (state) {
    return state.loading
  }

}

export const mutations = {
  setState (state, { type, value }) {
    state[type] = value
  },

  setActivePage (state, active) {
    state.activePage = active
  },
  setAlert (state, alert) {
    state.alert = alert
  }

}

export const actions = {
// Alert
  initAlert ({ commit }, { is, type, timer, persistence, title, message }) {
    if (typeof persistence === 'undefined') {
      persistence = false
    }
    if (typeof timer === 'undefined') {
      timer = null
    }
    commit('setAlert', { is, type, title, timer, persistence, message })
  },

  // Initialization
  async initBanks ({ commit, state }) {
    const { data } = await this.$axios.get('https://api.paystack.co/bank')
    const arr = data.data
    const banks = []
    arr.forEach((el) => {
      banks.push(el.name)
    })
    banks.push('Brass & Books')
    commit('setState', { type: 'banks', value: banks })
    commit('setState', { type: 'codeBanks', value: data.data })
  },

  // Initialize App
  initApp ({ dispatch }) {
    dispatch('initBanks')
  }

}
