<template>
  <div class="flex flex-col min-h-screen sm:bg-light-50 sm:dark:bg-sharp-500">
    <div class="flex flex-row min-h-screen">
      <!-- Left Menu -->
      <LeftMenu class="h-full" />

      <!-- Main Content Wrapper -->
      <div class="flex flex-col flex-grow">
        <!-- NavBar -->
        <NavBar class="flex-grow-0" />

        <!-- Main Content Area -->
        <main class="flex-grow flex items-center justify-center z-10 bg-fog-50 dark:bg-fog-600">
          <router-view />
        </main>

        <!-- Footer -->
        <FootField class="flex-grow-0" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FootField from '../components/FootField.vue'
import NavBar from '../components/NavBar.vue'
import LeftMenu from '../components/LeftMenu.vue'
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
