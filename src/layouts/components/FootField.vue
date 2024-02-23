<template>
  <footer class="p-2 text-center xs:items-center xs:flex xs:justify-between md:p-4 bg-light-50 dark:bg-sharp-500">
    <ul class="flex flex-wrap items-center justify-center mt-3 text-xs text-gray-500 dark:text-gray-400 sm:mt-0">
      <li>
        <a href="#" class="mr-4 hover:underline md:mr-6">About</a>
      </li>
      <li>
        <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
      </li>
      <li>
        <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
      </li>
      <li>
        <a href="#" class="hover:underline">Contact</a>
      </li>
    </ul>
    <span class="pt-2 text-xs text-gray-500 sm:text-center dark:text-gray-400">© <a
      :href="copyrightHref"
      class="hover:underline"
    >{{ copyrightText }}</a>
      {{ year }}. All Rights Reserved.
    </span>
  </footer>
</template>

<script setup lang="ts">
const copyrightHref = import.meta.env.VITE_BRAND_URL
const copyrightText = import.meta.env.VITE_BRAND_NAME_COPY

const dt = new Date()
const year = dt.getFullYear()
</script>

<style scoped></style>
