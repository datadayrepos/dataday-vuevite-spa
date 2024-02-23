/**
 * Ivar.strannd 220922 supports the language picker. and at App.vue to set initial lang for global config. Multi-language related operations
 */

import { computed, ref, unref } from 'vue'
import { storeApp, storeAppWithOut } from '../stores'
import { loadLocalePool, setHtmlPageLang } from './setupI18n'

// import { setupI18n } from '/@/locales/setupI18n';
import { getAbyLangPacks } from '/@/locales/setupI18n'

import { FALLBACK_LOCALE } from '/@/locales/init/constants'
import type { LocaleType } from './init/types'

/*
interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}
*/
/** Sets locale to store and updates html lang */
function setI18nLanguage(l: LocaleType) {
  const appStore = storeApp()
  appStore.setLocaleInfo({ locale: l })
  setHtmlPageLang(l)
}

const localeStore = storeAppWithOut() // storeApp()//

/** Retrieves locale if set from store */
export function getLocale() {
  return localeStore.getLocale
}

export function getLocaleRefreshed() {
  const appStore = storeApp() // storeApp()//
  return appStore.getLocale
}

/** changes locale and updates stores. called from AppLangSelect */
export function useAbyLocale() {
  /** returns local store locale */
  const getL = computed(() => localeStore.getLocale)
  const getShowLocalePicker = computed(() => localeStore.getShowPicker)

  /**
   * changeLocale switches the language
   * - will change the locale of useI18n
   * - And submit to configuration modification
   */
  async function changeLocale(locale: LocaleType) {
    const currentLocale = unref(getL)

    if (!locale)
      return FALLBACK_LOCALE
    if (currentLocale === locale)
      return locale
    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }
    /*
        const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
        if (!langModule) return;
        loadLocalePool.push(locale);
        */
    setI18nLanguage(locale)
    //   useAbyLangPacks()
    return locale
  }
  return {
    getL,
    getShowLocalePicker,
    changeLocale,
  }
}

type LangPacks = {
  [key: string]: any // Replace 'any' with a more specific type if possible
}
const cachedLangPacks = ref<LangPacks>({}) // Cache for language packs

/**
 * Returns package of aby and el lang packs separated by namespace.
 * Returns an object for the language currently set
 */
export async function useAbyLangPacks() {
  const loadLanguagePacks = () => {
    const locale = getLocale()// getLocale() // Assuming getLocale returns a string like 'en' or 'nb-no'

    if (!cachedLangPacks.value[locale]) {
      const loadedPack = getAbyLangPacks()
      // Include the name property in the language pack
      cachedLangPacks.value[locale] = loadedPack
      // console.log(`Loaded language pack for locale '${locale}':`, cachedLangPacks.value[locale]);
    }
    return cachedLangPacks.value[locale]
  }

  const currentLangPack = ref(loadLanguagePacks())

  return computed(() => {
    return { ...unref(currentLangPack) }
  })
}
