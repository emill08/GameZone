// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

// const url = 'http://localhost:3000'
const url = 'https://gamezone.ezwx.xyz'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      games: [],
      products: [],
      carts: [],
      isLogin: false,
      username: ''
    }
  },
  actions: {
    async fetchGames() {
      try {
        let { data } = await axios.get(`${url}/games`)
        console.log(data)
        this.games = data
      } catch (err) {
        console.log(err)
      }
    },
    async handleLogin(username, password) {
      try {
        let { data } = await axios.post(`${url}/login`, { username, password })
        console.log(data)
        localStorage.access_token =  data.access_token
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: `Hi ${username}! welcome to GameZone`
        })
        this.isLogin = true
        this.username = username
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    },
    async handleRegister(username, password) {
      try {
        let { data } = await axios.post(`${url}/register`, { username, password })
        console.log(data)
        this.router.push('/login')
        Swal.fire({
          icon: 'success',
          title: `Account with username: ${username} has been created`
        })
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    },
    async fetchProducts() {
      try {
        let { data } = await axios.get(`${url}/sell`, { headers: { access_token: localStorage.getItem("access_token") } })
        console.log(data)
        this.products = data
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCarts() {
      try {
        let { data } = await axios.get(`${url}/cart`, { headers: { access_token: localStorage.getItem("access_token") } })
        console.log(data)
        this.carts = data
      } catch (err) {
        console.log(err)
      }
    },
    async addToCart(id) {
      try {
        await axios.post(`${url}/cart/${id}`, {}, { headers: { access_token: localStorage.getItem("access_token") } })
        Swal.fire({
          icon: 'success',
          title: `Game added to your cart`
        })
      } catch (err) {
        console.log(err)
      }
    },
    async handleDeleteCart() {
      try {
        let { data } = await axios.delete(`${url}/deleteCart`, { headers: { access_token: localStorage.getItem("access_token") } })
      } catch (err) {
        console.log(err)
      }
    },
    async handlePayment() {
      try {
        let { data } = await axios.post(`${url}/midtrans`, {}, { headers: { access_token: localStorage.getItem("access_token") } })
        console.log(data)
        const cb = this.handleDeleteCart()
        const reFetch = this.fetchCarts()
        window.snap.pay(data.token, {
          onSuccess: function(result){
            /* You may add your own implementation here */
            // console.log('done');
            cb()
            // reFetch()
          },
        })
        this.fetchCarts()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteItem(id) {
      try {
        let { data } = await axios.delete(`${url}/cart/${id}`, { headers: { access_token: localStorage.getItem("access_token") } })
        console.log(data)
        this.fetchCarts()
        Swal.fire({
          icon: 'success',
          title: data.message
        })
      } catch (err) {
        console.log(err)
      }
    },
    async handleCredentialResponse(response) {
      try {
        // console.log('Encoded JWT ID token: ' + response.credential)
        const { data } = await axios.post(`${url}/google-login`, null, {
          headers: {
            google_token: response.credential
          }
        })
        const { access_token, username } = data
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('username', username)
      } catch (err) {
        console.log(err)
      }
    }
  }
})
