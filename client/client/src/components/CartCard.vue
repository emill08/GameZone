<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    props: ['cart', 'id'],
    methods: {
        ...mapActions(useCounterStore, ['deleteItem']),
        handleDelete() {
            this.deleteItem(this.id)
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
            <img :src="cart.Game.thumb" alt="Image Description" class="mt-10">
            <div class="indigo-lightest fw-600 fs-m1">
                {{cart.Game.title}}
                <p class="opacity-30"> Price: ${{ cart.Game.normalPrice }}</p>
            </div>
            <div class="mt-10">
                <a @click.prevent="handleDelete" href="" class="button fs-s3 white no-underline"
                    style="background-color: #da1313e9; padding: 8px 16px;">Delete</a>
            </div>
            
        </div>
    </div>
</template>