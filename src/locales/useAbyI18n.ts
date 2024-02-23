/**
 * Translator built by me.
 * Simpler i18n - main purpose was to avoid i18n dependency on "eval" which makes this more secure.
 *
 * ivar.strand 220922
 */

import { computed, ref, watch, watchEffect } from 'vue'
import { get } from '@datadayrepos/lodashts'
import { getLocale, useAbyLangPacks } from './useAbyLocale'

type TranslatorOption = Record<string, string | number>

function translate(namespace: string, path: string, option: undefined | TranslatorOption, locale: object): string {
  const key = getKey(namespace, path)

  const x = (l: object, k: string | any[]) => {
    let value = get(l, k, k) // Get the value, which can now be a string or an array

    // If the value is an array, join the elements with a line break or other separator
    if (Array.isArray(value))
      value = value.join('\n\n') // Join array elements with a line break

    // Replace placeholders in the string
    return (value as string).replace(
      /\{(\w+)\}/g,
      (_, key) => `${option?.[key] ?? `{${key}}`}`,
    )
  }

  let k = x(locale, key)
  // Handles fallback
  if (k === key)
    k = x(locale, key.replace(namespace, 'fallBack'))

  return k
}

function getKey(namespace: string | undefined, key: string) {
  if (!namespace)
    return key

  if (key.startsWith(namespace))
    return key

  return `${namespace}.${key}`
}

/**
 * Main translator: For use in components:
 *  - import { useAbyI18n } from '/@/locales/useAbyI18n'
 *  - const { t } = useAbyI18n('aby') // pass in namespace constant
 *  - then reactive components myText =  t('sys.login.forgotpage')
 *  - or in DOM -  {{ t('sys.login.forgotpage') }}
 * This updates the langpacks, in principle everyt time this is called, which could be a lot.
 */
export function useAbyI18n(namespace: string) {
  // console.trace('USEABY18 trace: ')
  const localeStr = ref(getLocale()) // Make localeStr reactive  // getLocaleRefreshed
  // const localeStr = ref(getLocale()) // Make localeStr reactive
  const langPacks = ref({}) // Create a reactive reference for the language packs

  // Load language packs
  async function updateLangPacks() {
    const packs = await useAbyLangPacks()
    langPacks.value = packs.value
  }

  updateLangPacks()

  // Watch for changes in locale and update language packs
  watch(localeStr, () => {
    updateLangPacks()
  })

  const t = computed(() => {
    // This function will now be reactive
    return (path: string, option?: TranslatorOption) => translate(namespace, path, option, langPacks.value || {})
  })

  // Watch for locale changes and update localeStr reactively
  watchEffect(() => {
    localeStr.value = getLocale() // getLocaleRefreshed()// getLocale() getLocaleRefreshed
  })

  return {
    locale: langPacks.value, // Directly use langPacks as the locale
    lang: localeStr.value, // Use localeStr for language code
    t: t.value, // Use computed translation function
  }
}

// Why write this function？
// Mainly to configure the vscode i18nn ally plugin. This function is only used for routing and menus. Please use useI18n for other places
export const t = (key: string) => key
