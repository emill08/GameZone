<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import ShopCard from '../components/ShopCard.vue';

export default {
    computed: {
        ...mapState(useCounterStore, ["products"])
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchProducts"])
    },
    created() {
        this.fetchProducts();
    },
    components: { ShopCard }
}
</script>

<template>
    <h1 style="font-size: 40px; color: antiquewhite; text-align: center;">GameZone's Store</h1>
        <section class="py-l10">
        <div class="flex flex-column md-flex-row md-w-80pc mx-auto">
            <div class="w-100pc md-w-30pc">
                <div class="card-container">
                    <div class="card-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 20px;">
                        <!-- SHOP CARD -->
                        <!-- <h1 style="color: antiquewhite;">hello</h1> -->
                        <ShopCard v-for="(product, i) in products" :product="product" :id="product.id" :key="product.id" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>