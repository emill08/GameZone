<script>
import CartCard from '../components/CartCard.vue';
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    components: { CartCard },
    computed: {
        ...mapState(useCounterStore, ['carts'])
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchCarts', 'handlePayment']),
    },
    created() {
        this.fetchCarts()
    }
}
</script>


<template>
    <h1 style="font-size: 40px; color: antiquewhite; text-align: center;">Cart</h1>
    <div class="row" v-if="!carts.length">
                <div style="margin-top: 120px; display: flex; align-items: center;">
                    <img src="../assets/images/pepe.png" alt="Gambar" style="max-width: 200px; height: auto;">
                    <p class="lead" style="font-size: 25px; color: antiquewhite; margin-left: 20px;">
                        You don't have any game in your cart. Go to Home Page to add some.
                    </p>
                </div>
            </div>
    <section class="py-l10">
        <div class="flex flex-column md-flex-row md-w-80pc mx-auto">
            <div class="w-100pc md-w-30pc">
                <div class="card-container">
                    <div class="card-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 20px;">
                        <!-- SHOP CARD -->
                        <CartCard v-for="cart in carts" :cart="cart" :id="cart.id" :key="cart.id" />
                    </div>
                    <a v-if="carts.length" @click.prevent="handlePayment" href="" class="button fs-s3 white no-underline"
                    style="margin-top: 40px; margin-left: 25px; background-color: #0e399e; padding: 8px 16px;">Checkout</a>
                </div>
            </div>
        </div>
    </section>
</template>