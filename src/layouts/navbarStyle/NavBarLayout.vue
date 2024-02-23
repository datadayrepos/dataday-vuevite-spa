<template>
  <div class="flex flex-col justify-between min-h-screen sm:bg-light-50 sm:dark:bg-sharp-500">
    <NavBar />
    <main class="flex-grow flex items-center justify-center positionThird z-10 bg-fog-50 dark:bg-fog-600">
      <router-view />
    </main>
    <FootField />
  </div>
</template>

<script setup lang="ts">
import FootField from '../components/FootField.vue'
import NavBar from '../components/NavBar.vue'
</script>

<style scoped>
@media screen and (max-width: 440px) {
    .positionThird {
        margin-top: calc(15vh - 300px);

        /*  top: calc(35vh - 200px); */
        /* 50px is the height of the element */
        /*   bottom: calc(65vh - 200px); */
        /* 50px is the height of the element */
    }
}
</style>
