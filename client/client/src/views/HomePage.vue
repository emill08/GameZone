<script>
export default {

}
</script>


<template>
    <section class="relative" style="background-image: url('https://wallpaperaccess.com/full/1264434.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
    <div class="overlay">
    <div id="slider-1">
        <div class="p-10 md-p-l10 flex justify-center items-center flex-column text-center">
            <h2 class="white fs-l3 fw-900">Unlock Your Adventure!</h2>
        </div>
        <div class="p-10 md-p-l10 flex justify-center items-center flex-column text-center">
            <h2 class="white fs-l3 fw-900">Power Up Your Playtime!</h2>
            <router-link class="button-md bg-indigo white fs-s3 br-4 black fw-600 no-underline m-5" to="/games">Browse Game List</router-link>
        </div>
        <div class="p-10 md-p-l10 flex justify-center items-center flex-column text-center">
            <h2 class="white fs-l3 fw-900">Your One-Stop Shop for Gaming Delights!</h2>
            <router-link href="" class="button-md bg-indigo white fs-s3 br-4 black fw-600 no-underline m-5" to="/shop">Shop Now</router-link>
        </div>
    </div>
    <ul class="absolute list-none w-100pc flex justify-between top-50pc">
        <li><button class="prev ml-10 br-round border-indigo-lightest indigo-lightest  bg-transparent flex justify-center items-center p-2 focus-indigo-lighter outline-none"><i data-feather="chevron-left"></i></button></li>
        <li><button class="next mr-10 br-round border-indigo-lightest indigo-lightest  bg-transparent flex justify-center items-center p-2  focus-indigo-lighter outline-none"><i data-feather="chevron-right"></i></button></li>
    </ul>
</div>
</section>

</template>