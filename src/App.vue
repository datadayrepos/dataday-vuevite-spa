<template>
  <router-view />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title:  import.meta.env.VITE_BRAND_NAME_CAP,
  meta: [{ name: 'description', content: import.meta.env.VITE_GLOB_APP_TITLE}],
})
</script>

<style>
/* we use this to break lines in the array message for t() */
.break-lines {
  white-space: pre-line;
}
</style>