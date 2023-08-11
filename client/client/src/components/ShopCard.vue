<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default {

    props: ['product', 'id'],
    methods: {
        ...mapActions(useCounterStore, ['addToCart']),
        handleAddToCart() {
            this.addToCart(this.id)
        }
    }
}
</script>

<template>
        <div class="card" style="width: 300px;">
        <div class="br-8 p-5 m-5 bg-indigo-lightest-10 pointer hover-scale-up-1 ease-300">
            <!-- <div class="inline-block bg-indigo indigo-lightest br-3 px-4 py-1 mb-10 fs-s4 uppercase">
                Steam Rating: x
            </div> -->
            <img :src="product.thumb" alt="Image Description" class="mt-10">
            <div class="indigo-lightest fw-600 fs-m1">
                {{product.title}}
                <p class="opacity-30"> Price: ${{ product.normalPrice }}</p>
            </div>
            <div class="mt-10">
                <a @click.prevent="handleAddToCart" class="button fs-s3 white no-underline"
                    style="background-color: #0e399e; padding: 8px 16px;">Add to cart</a>
            </div>
        </div>
    </div>
</template>