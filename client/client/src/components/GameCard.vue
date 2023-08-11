<script>
export default {
    props: ['game', 'id']
}
</script>


<template>
    <div class="card" style="width: 300px;">
        <div class="br-8 p-5 m-5 bg-indigo-lightest-10 pointer hover-scale-up-1 ease-300">
            <div class="inline-block bg-indigo indigo-lightest br-3 px-4 py-1 mb-10 fs-s4 uppercase">
                Steam Rating: {{game.steamRatingPercent}}
            </div>
            <img :src="game.thumb" alt="Image Description" class="mt-10">
            <div class="indigo-lightest fw-600 fs-m1">
                {{game.title}}
                <p class="opacity-30"> Average user rating: {{ game.steamRatingText }}</p>
            </div>
            <div class="mt-10">
                <a :href="`https://www.metacritic.com${game.metacriticLink}`" class="button fs-s3 white no-underline"
                    style="background-color: #5853f6; padding: 8px 16px;">Metacritic</a>
                <a :href="`https://store.steampowered.com/app/${game.steamAppID}`" class="button fs-s3 white no-underline"
                    style="margin-left: 10px; background-color: #5853f6; padding: 8px 16px;">Steam Store</a>
            </div>
        </div>
    </div>
</template>