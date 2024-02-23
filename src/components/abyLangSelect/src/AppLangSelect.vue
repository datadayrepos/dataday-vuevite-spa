<!--
 * @Description: Multi-language switching component
 Ivar.Strand 220404
-->
<template>
  <div class="relative inline-block">
    <button ref="toggle" class="focus:outline-none" @click="toggleDropdown">
      <!-- Inline SVG for World Icon -->
      <WorldIcon class="inline-block w-6 h-6 mt-0.5" />
    </button>
    <div
      v-show="showDropdown" ref="menu" class="absolute  w-24 text-gray-500 text-sm dark:text-gray-400 bg-light-50 dark:bg-sharp-500 border border-gray-200 dark:border-gray-600 rounded shadow-md"
      @mouseleave="hideDropdown"
    >
      <div
        v-for="item in langList" :key="item.value" class="cursor-pointer px-4 py-2 hover:bg-gray-200"
        @click="handleCommand(item.value)"
      >
        <!-- Disable the currently active language -->
        <span :class="{ 'opacity-50': curLang === item.value }" :disabled=" curLang === item.value">
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue'

import { createPopper } from '@datadayrepos/popperts'
import { WorldIcon } from '@datadayrepos/icons'

import { getLocale, useAbyLocale } from '/@/locales/useAbyLocale'
import { LOCALES_OBJECT } from '/@/locales/init/constants'

// import { setAllEdStoreCaches } from "/@/stores/utils"; // mot needed
import { storeAppWithOut } from '/@/stores'
import type { LocaleObject, LocaleType } from '/@/locales/init/types'
import type { Instance } from '@datadayrepos/popperts'

const props = defineProps({
  /** Whether to display text */
  showText: { type: Boolean, default: true },
  // curLang: { type: String, default: 'en' },
  /** Whether to refresh the interface when changing */
  reload: { type: Boolean, default: true },
})
const toggle = ref(null)
const menu = ref(null)
const showDropdown = ref(false)
let popperInstance: Instance | null = null

const selectedKeys = ref<string[]>([])
const appStore = storeAppWithOut()

const curLang = computed(() => {
  // storeAppWithOut() // main editor store
  return appStore.getLocale
})

const langList = computed<LocaleObject[]>(() => {
  return LOCALES_OBJECT as LocaleObject[]
})

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
  if (!popperInstance)
    initializePopper()

  else popperInstance.update() // Update the position when shown

  // Do not destroy the popper instance here
}

function initializePopper() {
  if (!popperInstance && toggle.value && menu.value) {
    popperInstance = createPopper(toggle.value, menu.value, {
      placement: 'bottom', // This will place the dropdown centered below the toggle

      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10], // This provides a 10px "margin" on the vertical axis (x, y)
          },
        },
        {
          name: 'flip',
          options: {
            altBoundary: true,
            fallbackPlacements: ['bottom-end', 'bottom-start'],
            padding: 5, // Add a 5px "margin" from the flip boundaries
          },
        },
        {
          name: 'preventOverflow',
          options: {
            altBoundary: true,
            fallbackPlacements: ['bottom-end', 'bottom-start'],
            padding: 5, // Add a 5px "margin" from the flip boundaries
            tether: true, // Move the dropdown back into the viewport if it exceeds the boundaries
          },
        },
      ],
    })
  }
  else if (popperInstance) {
    popperInstance.update()
  }
}

function hideDropdown() {
  showDropdown.value = false
  if (popperInstance) {
    //  popperInstance.destroy();
    // Do not destroy the popper instance here to avoid repositioning

  }
}

/*
open these dependencies if using url prefix switch

import { unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
*/

/**
 * Handler for locale switch toggle
 * @param lang
 */
async function toggleLocale(lang: LocaleType | string) {
  const { changeLocale } = useAbyLocale()
  await changeLocale(lang as LocaleType)

  selectedKeys.value = [lang as string]
  // named route with params to let the router build the url on locales change - enable if using locales prefix
  /*
  if (route.name)
    router.push({ name: route.name, params: { locale: unref(curLang) } })
    */
  // placeholder reload page - reloads window on locales change if prop is true
  if (props.reload)
    location.reload() // props.reload && location.reload();
}

function handleCommand(command: string) {
  if (getLocale() !== command) // curLang.value
    toggleLocale(command)

  // Close the dropdown
  showDropdown.value = false

  // Destroy the popper instance if active
  if (popperInstance) {
    //   popperInstance.destroy();
  }

  // console.log("Selected language:", command);
}

watchEffect(() => {
  selectedKeys.value = [getLocale()]
})

onBeforeUnmount(() => {
  if (popperInstance)
    popperInstance.destroy()
})
</script>

<style>
#dropdown-menu {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
}

[data-popper-placement] {
  visibility: visible;
  opacity: 1;
}

/*
.app-locale-picker-overlay {
.ant-dropdown-menu-item {
  min-width: 160px;
}
}
*/
</style>
