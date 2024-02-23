<template>
  <div>
    <div
      v-for="route in routes"
      :key="route.name"
      class="my-2"
    >
      <router-link
        :to="{ name: route.name }"
        class="w-full py-2.5 rounded-lg flex justify-center items-center bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
      >
        {{ route.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dev page only, rolls up a link for each page in the router
import { useRouter } from 'vue-router'

const router = useRouter()

// Filter out routes without a name or paths you want to exclude
const routes = router.getRoutes().filter((route) => {
  // Ensure route.name is a string before comparison
//  console.log(route)
  const routeName = typeof route.name === 'string' ? route.name : ''
  return routeName && !['dev', 'notFound'].includes(routeName)
})
</script>
