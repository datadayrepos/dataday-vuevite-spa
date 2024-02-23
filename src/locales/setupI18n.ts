/**
 * Translator built by me.
 * Simpler i18n - main purpose was to avoid i18n dependency on "eval" which makes this more secure.
 *
 * ivar.strand 220922
 */

import { storeAppWithOut } from '../stores'
import { FALLBACK_LOCALE } from './init/constants'
import { getLangPacksFromFiles } from '/@/locales/lang'

// import { set } from "@datadayrepos/lodashts"; // the set function doesnt work as expected check
import type { LocaleType } from './init/types'

type Recordable<T = any> = Record<string, T>

export const loadLocalePool: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool)
}

/** returns aby langs consolidated  */
export function getAbyLangPacks() {
  const fallback = FALLBACK_LOCALE
  const localeStore = storeAppWithOut()
  let locale = localeStore.getLocale
  if (!locale)
    locale = FALLBACK_LOCALE

  setHtmlPageLang(locale)
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale)
  })

  // Load the language pack for the current locale
  const currentLangPack = getLangPacksFromFiles(locale)
  //  console.log(`Language pack for '${locale}':`, currentLangPack);

  let fallbackLangPack = {}
  if (locale !== fallback) {
    // Load the fallback language pack if the current locale is not the fallback
    fallbackLangPack = getLangPacksFromFiles(fallback)
    // console.log(`Fallback language pack for '${fallback}':`, fallbackLangPack);
  }

  // Assemble the final language packs object
  const langPacks = {
    aby: currentLangPack,
    ...(locale !== fallback ? { fallBack: fallbackLangPack } : {}),
  }

  return langPacks
}

/**
 * Used from the file reader
 * @param langs
 * @param prefix
 * @returns parsed line
 */
export function genMessage(
  langs: Record<string, Record<string, any>>,
  prefix = 'lang',
): Recordable<any> {
  const obj: Recordable = {}
  Object.keys(langs).forEach((key) => {
    // Access the default export of the module
    const langFileModule = langs[key].default

    // If langFileModule is undefined or not an object, skip this iteration
    if (typeof langFileModule !== 'object' || langFileModule === null)
      return

    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if (moduleName) {
      if (objKey) {
        // Ensure the module object exists and then assign the data
        if (!obj[moduleName])
          obj[moduleName] = {}

        obj[moduleName][objKey] = langFileModule
      }
      else {
        obj[moduleName] = langFileModule
      }
    }
  })

  return obj
}

/*

// Test function for set
function testSetFunction() {
  const dummyObj = {};

  // Simulate setting values as in genMessage
  set(dummyObj, 'module1', {});
  set(dummyObj['module1'], 'nestedKey1', 'value1');
  set(dummyObj, 'module2', 'value2');

  console.log('Test object after set operations:', dummyObj);
}

{
  "en": {
    "fields": {
      "aliasNameTitle": "Team name",
      "aliasNamePlaceholder": "Team name",
      "displayNameTitle": "Displayname",
      // ... other keys and values from the JSON files ...
    },
    // ... other modules from different files, if any ...
  },
  "nb-no": {
    // ... structure similar to 'en', based on nb-no JSON files ...
  },
  "fallBack": {
    // ... structure for fallback locale, if different from 'en' or 'nb-no' ...
  }
}

*/
