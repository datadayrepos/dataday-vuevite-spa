<template>
  <div class="flex flex-col items-center justify-center p-8 mx-auto w-full max-w-md rounded-lg shadow-lg text-black dark:text-white">
    <h2 class="text-xl font-bold text-center mb-4">
      {{ t(`navbar.content.page1.header`) }}
    </h2>
    <p class="text-sm text-center mb-6">
      {{ t(`navbar.content.page1.description`) }}
    </p>
    <button class="w-full py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white" @click="handleButton">
      {{ t(`navbar.content.page1.actionButton`) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAbyI18n } from '/@/locales/useAbyI18n'

const { t } = useAbyI18n('aby')

defineOptions({
  name: 'Navbar1',
})

function handleButton() {
//  console.log('Placeholder...')
}
</script>
