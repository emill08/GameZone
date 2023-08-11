<script>
import Swal from 'sweetalert2'
import { mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    methods: {
        doLogout() {
            localStorage.clear(), this.$router.push('/login')
            Swal.fire({
                icon: 'success',
                title: `Logout successful`
            })
            this.isLogin = !localStorage
        }
    },
    computed: {
      ...mapWritableState(useCounterStore, ['isLogin', 'username']),
    },
    created() {
      this.isLogin = localStorage.getItem('access_token'),
      this.username
    }
}
</script>

<template>
    <nav class="w-100pc flex flex-column md-flex-row md-px-10 py-5 bg-black">
        <div class="flex justify-between">
            <a class="flex items-center p-2 mr-4 no-underline">
                <img class="max-h-l5 w-auto" src="../../public/logopng.png" />
                <span v-if="isLogin" style="margin-left: 20px;" class="text-white">Hello, {{username}}</span>
            </a>
            <a data-toggle="toggle-nav" data-target="#nav-items" href="#"
                class="flex items-center ml-auto md-hidden indigo-lighter opacity-50 hover-opacity-100 ease-300 p-1 m-3">
                <i data-feather="menu"></i>
            </a>
        </div>
        <div id="nav-items" class="hidden flex sm-w-100pc flex-column md-flex md-flex-row md-justify-end items-center">
            <router-link href="" class="fs-s1 mx-3 py-3 indigo no-underline hover-underline" to="/">Home</router-link>
            <router-link href="" class="fs-s1 mx-3 py-3 indigo no-underline hover-underline" to="/games">Game
                List</router-link>
            <router-link href="" class="fs-s1 mx-3 py-3 indigo no-underline hover-underline" to="/shop">Shop</router-link>
            <router-link href="" class="fs-s1 mx-3 py-3 indigo no-underline hover-underline" to="/cart">Cart</router-link>
            <router-link href="" class="fs-s1 mx-3 py-3 indigo no-underline hover-underline" v-if="!isLogin" to="/login">Login</router-link>
            <router-link @click.prevent="doLogout" class="fs-s1 mx-3 py-3 indigo no-underline hover-underline"
                to="/login" v-if="isLogin">Logout</router-link>
            <router-link href="" class="button bg-white black fw-600 no-underline mx-5"
                to="/register" v-if="!isLogin">Register</router-link>
        </div>
</nav>
</template>