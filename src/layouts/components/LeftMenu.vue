<template>
  <aside class="relative z-20 w-64 h-full bg-light-50 dark:bg-sharp-500 flex flex-col">
    <div class="px-4 py-4 flex items-center space-x-2 border-b dark:border-sharp-600 h-12">
      <!-- path to icon and customize brand -->
      <img src="/@/assets/abyrint_favicon.png" alt="Brand Icon" class="h-8 w-8">
      <span class="text-xl text-gray-800 dark:text-white font-semibold">BrandName</span>
    </div>
    <nav class="flex flex-col p-4 flex-grow text-gray-700 space-y-2 dark:text-gray-200">
      <router-link to="/" class="hover:bg-light-100 dark:hover:bg-sharp-600">
        {{ t(`navlink.home`) }}
      </router-link>
      <div class="my-2 border-t border-gray-200 dark:border-sharp-600" /> <!-- Divider -->
      <!-- customize router links -->
      <router-link to="/dashboard/dashboard-1" class="py-2 px-4 hover:bg-light-100 dark:hover:bg-sharp-600 ">
        {{ t(`navlink.dashboard`) }}
      </router-link>
      <router-link to="/dashboard/dashboard-2" class="py-2 px-4 hover:bg-light-100 dark:hover:bg-sharp-600">
        {{ t(`navlink.profile`) }}
      </router-link>
      <router-link to="/dashboard/dashboard-1" class="py-2 px-4 hover:bg-light-100 dark:hover:bg-sharp-600">
        {{ t(`navlink.settings`) }}
      </router-link>
      <router-link to="/dashboard/dashboard-2" class="py-2 px-4 hover:bg-light-100 dark:hover:bg-sharp-600">
        {{ t(`navlink.messages`) }}
      </router-link>
      <button class="block text-left py-2 hover:bg-light-100 dark:hover:bg-sharp-600" @click="handleLogout">
        {{ t(`navlink.logout`) }}
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
// Import any additional components or utilities if needed
// Import the Vue Router useRoute and useRouter composable if needed for navigation or getting current route info.
import { useRouter } from 'vue-router'
import { useAbyI18n } from '/@/locales/useAbyI18n'

const { t } = useAbyI18n('aby')
const router = useRouter()

function handleLogout() {
  // Implement your logout logic here.
  // This might involve clearing authentication tokens, notifying the server, etc.
  // After logout, redirect the user. For example, to the login page:
  router.push('/login')
}
</script>
