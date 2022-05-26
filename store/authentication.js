import Vue from 'vue'
import api from '../services/api'

export const state = () => ({
  registerForm: 'start',
  passwordForm: 'start',

  login: false,

  loading: {
    all: false,
    login: false,
    register: false,
    sendOtp: false,
    session: false,
    password: false,
    card: false,
    bank: false
  },

  registration: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pinId: '',
    otp: '',
    password: ''
  },
  password: {
    password: '',
    confirm_password: '',
    phoneNumber: '',
    pinId: '',
    otp: ''
  },
  user: null,
  users: null
})

export const getters = {
  getRegisterForm (state) {
    return state.registerForm
  },
  getRegistration (state) {
    return state.registration
  },
  getPasswordForm (state) {
    return state.passwordForm
  },
  getPassword (state) {
    return state.password
  },
  getUser (state) {
    return state.user
  },
  getAllUsers (state) {
    return state.users
  },
  getBlockedUsers (state) {
    return state.block
  },
  getLoading (state) {
    return state.loading
  },
  getAlert (state) {
    return state.alert
  },
  getLogin (state) {
    return state.login
  },
  getVerified (state) {
    return state.verified
  }

}

export const mutations = {
  // user mutation
  setState (state, payload) {
    state[payload.type] = payload.value
  },

  setLogin (state, mode) {
    state.login = mode
  },
  setLoading (state, { type, is }) {
    state.loading.all = is
    state.loading[type] = is
  },

  setRegistration (state, payload) {
    // Get currenct state from local storage
    let registration = JSON.parse(window.localStorage.getItem('registration'))
    if (registration !== null) {
      update()
    } else {
      registration = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        pinId: '',
        otp: '',
        password: ''
      }
      update()
    }

    function update () {
      // Update the registration
      registration[payload.type] = payload.value
      // Log to see if the data is correct
      console.log(registration)
      // Update the local storage
      window.localStorage.setItem('registration', JSON.stringify(registration))
      // Set the root State
      state.registration = registration
    }
  },
  setPassword (state, payload) {
    // Get currenct state from local storage
    console.log(payload)
    let password = JSON.parse(window.localStorage.getItem('password'))
    if (password !== null) {
      update()
    } else {
      password = {
        password: '',
        confirm_password: '',
        phoneNumber: '',
        pinId: '',
        otp: ''
      }
      update()
    }

    function update () {
      // Update the password
      password[payload.type] = payload.value
      // Log to see if the data is correct
      console.log(password)
      // Update the local storage
      window.localStorage.setItem('password', JSON.stringify(password))
      // Set the root State
      state.password = password
    }
  }

}

export const actions = {

  async getSessionDetails ({ commit, state, dispatch }) {
    commit('setLoading', { type: 'session', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }

    try {
      const { data } = await this.$axios.get(api.userSession, config)
      console.log(data)
      // User Role
      Vue.$cookies.set('role', data.UserRole.name)
      commit('setLoading', { type: 'session', is: false })

      console.log(data)

      // set Savings Wallet
      let savings = 0
      savings += parseFloat(data.DailySavingsWallet.balance)
      savings += parseFloat(data.DmiWallet.balance)
      savings += parseFloat(data.SmartSavingsWallet.balance)

      data.Savings = savings

      // set User
      commit('setState', { type: 'user', value: data })
    } catch (error) {
      commit('setLoading', { type: 'session', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async sendOtp ({ commit, state, dispatch }, payload) {
    commit('setLoading', { type: 'registerOtp', is: true })

    try {
      const { data } = await this.$axios.post(api.sendRegistrationOtp, payload)

      commit('setLoading', { type: 'registerOtp', is: false })

      // set the otp pinId
      commit('setRegistration', { type: 'pinId', value: data.pinId })
      dispatch('controller/initAlert', { is: true, type: 'info', message: data.message }, { root: true })

      // Move the user to the OTP form field
      commit('setState', {
        type: 'registerForm',
        value: 'Otp'
      })
    } catch (error) {
      commit('setLoading', { type: 'registerOtp', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },
  async register ({ commit, state, dispatch }, otp) {
    commit('setLoading', { type: 'register', is: true })
    const newUser = state.registration
    newUser.otp = otp
    try {
      const { data } = await this.$axios.post(api.register, newUser)

      commit('setLoading', { type: 'register', is: false })

      // set user an access token

      Vue.$cookies.set('accessToken', data.accessToken)

      // Get user details
      dispatch('getSessionDetails')
      dispatch('controller/initAlert', { is: true, type: 'success', message: data.message }, { root: true })

      // Send User to dashboard
      this.$router.push('/dashboard/home')
    } catch (error) {
      commit('setLoading', { type: 'register', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async loginUser ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'login', is: true })

    // Clear Registration and Password Form in Local Storage
    window.localStorage.setItem('password', null)
    window.localStorage.setItem('registration', null)

    try {
      const { data } = await this.$axios.post(api.login, payload)
      commit('setLoading', { type: 'login', is: false })
      console.log(data)
      Vue.$cookies.set('accessToken', data.accessToken)

      // Get user details
      dispatch('getSessionDetails')
      dispatch('controller/initAlert', { is: true, type: 'success', message: data.message }, { root: true })

      this.$router.push('/dashboard')
    } catch (error) {
      const err = error.response.data.error.message
      commit('setLoading', { type: 'login', is: false })
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  logoutUser ({ commit }) {
    Vue.$cookies.remove('accessToken')
    this.$router.push('/login')
  },

  // Send Password Reset OTP
  async sendPasswordOtp ({ commit, state, dispatch }, payload) {
    commit('setLoading', { type: 'password', is: true })

    try {
      const { data } = await this.$axios.post(api.sendPasswordResetOtp, payload)

      commit('setLoading', { type: 'password', is: false })

      console.log(data)

      // set the otp pinId
      commit('setPassword', { type: 'pinId', value: data.pinId })
      dispatch('controller/initAlert', { is: true, type: 'info', message: data.message }, { root: true })

      // Move the user to the OTP form field
      commit('setState', {
        type: 'passwordForm',
        value: 'otp'
      })
    } catch (error) {
      commit('setLoading', { type: 'password', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async resetPassword ({ commit, state, dispatch }, otp) {
    try {
      commit('setLoading', { type: 'password', is: true })

      const payload = state.password
      payload.otp = otp

      const { data } = await this.$axios.post(api.resetPassword, payload)
      commit('setLoading', { type: 'password', is: false })

      dispatch('controller/initAlert', { is: true, type: 'success', message: data }, { root: true })
      this.$router.push('/login')
    } catch (error) {
      commit('setLoading', { type: 'password', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  /// ////////////////// Add and Delete Cards ////////////////////////
  async addCard ({ commit, state, dispatch }, payload) {
    try {
      commit('setLoading', { type: 'card', is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.post(api.addCard, payload, config)
      commit('setLoading', { type: 'card', is: false })

      dispatch('controller/initAlert', { is: true, type: 'success', message: data.message }, { root: true })
      window.location.href = data.payment_url
    } catch (error) {
      commit('setLoading', { type: 'card', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async deleteCard ({ commit, state, dispatch }, payload) {
    console.log(payload)
    try {
      commit('setLoading', { type: 'card', is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.delete(`${api.deleteCard}/${payload}`, config)
      commit('setLoading', { type: 'card', is: false })

      dispatch('controller/initAlert', { is: true, type: 'success', message: data.message }, { root: true })
      dispatch('getSessionDetails')
    } catch (error) {
      commit('setLoading', { type: 'card', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  /// ////////////////// Add and Delete Bank ////////////////////////
  async addBank ({ commit, state, dispatch }, payload) {
    try {
      commit('setLoading', { type: 'bank', is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.post(api.addBank, payload, config)
      commit('setLoading', { type: 'bank', is: false })
      dispatch('controller/initAlert', { is: true, type: 'success', message: data }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'bank', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async deleteBank ({ commit, state, dispatch }, payload) {
    console.log(payload)
    try {
      commit('setLoading', { type: 'bank', is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.delete(`${api.deleteBank}/${payload}`, config)
      commit('setLoading', { type: 'bank', is: false })

      dispatch('controller/initAlert', { is: true, type: 'success', message: data.message }, { root: true })
      dispatch('getSessionDetails')
    } catch (error) {
      commit('setLoading', { type: 'bank', is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async setDefault ({ commit, state, dispatch }, payload) {
    console.log(payload)
    try {
      commit('setLoading', { type: payload.type, is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.delete(`${api.deleteBank}/${payload}`, config)
      commit('setLoading', { type: payload.type, is: false })

      dispatch('controller/initAlert', { is: true, type: 'success', message: data.message }, { root: true })
      dispatch('getSessionDetails')
    } catch (error) {
      commit('setLoading', { type: payload.type, is: false })
      console.log(error)
      const err = error.response.data.error.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },
  handleAuth ({ commit, dispatch, state }) {
    dispatch('getSessionDetails')
    dispatch('controller/initBanks', null, { root: true })
    dispatch('wallet/myTransactions', null, { root: true })
  }

}
