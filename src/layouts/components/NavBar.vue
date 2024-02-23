<template>
  <header class="relative z-20 flex items-center justify-end w-full h-12 pb-0 bg-light-50 dark:bg-sharp-500 sm:mr-0 sm:right-auto">
    <a href="#" class="block pr-5">
      <AppLangSelect :reload="reload" class="w-6 h-6 dark:text-white" />
    </a>
    <a href="#" class="block pr-5">
      <AppDarkSelect class="w-6 h-6 dark:text-white" />
    </a>
  </header>
</template>

<script setup lang="ts">
import { AppLangSelect } from '/@/components/abyLangSelect'
import { AppDarkSelect } from '/@/components/abyDarkSelect'

const reload = false
</script>
