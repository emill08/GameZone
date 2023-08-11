<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(useCounterStore, ['handleRegister']),
        postRegister() {
            this.handleRegister(this.username, this.password)
        }
    }
}
</script>

<template>
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row" style="display: flex; justify-content: center; align-items: center; height: 100%;">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card" style="background: #000; border-radius: 1rem; margin: 2rem;">
                        <div class="card-body p-5 text-center">

                            <div style="margin-bottom: 3rem; margin-top: 2rem; padding-bottom: 3rem;">

                                <h2 class="fw-bold mb-2 text-uppercase text-white-50">Register</h2>
                                <p class="text-white-50 mb-5">Please enter your new username and password!</p>

                                <form @submit.prevent="postRegister">
                                    <div style="position: relative; margin-bottom: 1.5rem;">
                                        <input v-model="username" type="username" id="typePasswordX"
                                            class="form-control form-control-lg"
                                            style="width: 100%; padding: 0.75rem; font-size: 1.25rem; line-height: 1.5; color: #fff; background-color: transparent; border: none; border-radius: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.5); box-shadow: none;">
                                        <label class="form-label" for="typePasswordX"
                                            style="position: relative; top: 0; left: 0; font-size: 1.25rem; line-height: 1.5; color: #fff; opacity: 0.5; transition: all 0.15s ease-in-out;">Username</label>
                                    </div>

                                    <div style="position: relative; margin-bottom: 1.5rem;">
                                        <input v-model="password" type="password" id="typePasswordX"
                                            class="form-control form-control-lg"
                                            style="width: 100%; padding: 0.75rem; font-size: 1.25rem; line-height: 1.5; color: #fff; background-color: transparent; border: none; border-radius: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.5); box-shadow: none;">
                                        <label class="form-label" for="typePasswordX"
                                            style="position: relative; top: 0; left: 0; font-size: 1.25rem; line-height: 1.5; color: #fff; opacity: 0.5; transition: all 0.15s ease-in-out;">Password</label>
                                    </div>
                                    <button class="btn btn-outline-light btn-lg px-5" type="submit"
                                        style="color: #000;">Create Account</button>
                                </form>
                                <p class="text-white-50 mt-4">Have an account already? <router-link href="" class="text-white" to="/login">Log in</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
    
    
<style>
.gradient-custom {
    /* fallback for old browsers */
    background: #6a11cb;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}

.vh-100 {
    height: 100vh;
}

.gradient-custom {
    background: #6a11cb;
    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
}

.container {
    padding-top: 5rem;
    height: 100%;
}

.row {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.card {
    background: #000;
    border-radius: 1rem;
}

.card-body {
    padding: 5rem;
    text-align: center;
}

.mb-md-5 {
    margin-bottom: 3rem;
}

.mt-md-4 {
    margin-top: 2rem;
}

.pb-5 {
    padding-bottom: 3rem;
}

.fw-bold {
    font-weight: bold;
}

.text-uppercase {
    text-transform: uppercase;
}

.text-white-50 {
    color: rgba(255, 255, 255, 0.5);
}

.form-outline {
    position: relative;
    margin-bottom: 1.5rem;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.5;
    color: #fff;
    background-color: transparent;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    -webkit-box-shadow: none;
    box-shadow: none;
}

.form-label {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0.75rem;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
    transition: all 0.3s ease;
}

.form-control:focus+.form-label,
.form-control:not(:placeholder-shown)+.form-label {
    font-size: 0.8rem;
    margin-top: -1.125rem;
    color: rgba(255, 255, 255, 0.8);
}

.small {
    font-size: 0.875rem;
}

.pb-lg-2 {
    padding-bottom: 0.5rem;
}

.btn-outline-light {
    color: #fff;
    border-color: #fff;
}

.btn-lg {
    padding: 0.75rem 1.25rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
}

.px-5 {
    padding-left: 3rem;
    padding-right: 3rem;
}

.text-center {
    text-align: center;
}

.mt-4 {
    margin-top: 1.5rem;
}

.pt-1 {
    padding-top: 0.25rem;
}

.text-white {
    color: #fff;
}

.fab {
    display: inline-block;
    font-size: 1.33333rem;
    font-weight: 900;
    line-height: 1.5;
    -webkit-transition: color 0.15s ease-in-out;
    transition: color 0.15s ease-in-out;
}

.fa-lg {
    font-size: 1.33333em;
    line-height: 0.75em;
    vertical-align: -15%;
}

.mx-4 {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
}

.px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.mb-0 {
    margin-bottom: 0;
}

.text-white-50 {
    color: rgba(255, 255, 255, 0.5);
}

.fw-bold {
    font-weight: bold;
}</style>