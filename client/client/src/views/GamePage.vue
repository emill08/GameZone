<script>
import GameCard from '../components/GameCard.vue';
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    components: { GameCard },
    computed: {
        ...mapState(useCounterStore, ['games'])
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchGames'])
    },
    created() {
        this.fetchGames()
    }
}
</script>

<template>
    <h1 style="font-size: 40px; color: antiquewhite; text-align: center;">Game List</h1>
    <section class="py-l10">
        <div class="flex flex-column md-flex-row md-w-80pc mx-auto">
            <div class="w-100pc md-w-30pc">
                <div class="card-container">
                    <div class="card-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 20px;">
                        <GameCard v-for="(game, i) in games" :game="game" :id="game.id" :key="game.id" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>