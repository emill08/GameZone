import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GamePage from '../views/GamePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ShopPage from '../views/ShopPage.vue'
import CartPage from '../views/CartPage.vue'
import Swal from 'sweetalert2'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/games',
      name: 'games',
      component: GamePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
  ]
})
router.beforeEach((to, from) => {
  if(!localStorage.getItem("access_token") && to.name == 'shop' || !localStorage.getItem("access_token") && to.name == 'cart') {
    Swal.fire({
      icon: 'error',
      title: 'Please login or register first!',
    })
    return {name: "login"}
  }
  if (localStorage.getItem("access_token") && to.name == 'login' || localStorage.getItem("access_token") && to.name == 'register') {
    Swal.fire({
      icon: 'error',
      title: 'You already logged in',
    })
    return {name: "home"}
  }
  if (!to.name) {
    return {name: 'home'}
  }
})

export default router
