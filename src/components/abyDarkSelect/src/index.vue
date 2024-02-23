<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Description: Dark-mode switching component built on vueuse
 Ivar.Strand 220831
-->
<template>
  <button @click="toggleDark()">
    <!-- Sun SVG -->
    <SunIcon v-if="isDark" class="inline-block w-6 h-6" />

    <!-- Moon SVG -->
    <MoonIcon v-if="!isDark" class="inline-block w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { useToggle } from '@datadayrepos/usevueshared'
import { useDark } from '@datadayrepos/usevuecore'
import { MoonIcon, SunIcon } from '@datadayrepos/icons'

const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>
