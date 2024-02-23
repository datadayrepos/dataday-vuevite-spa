/** Locales config ivar.strand 220922  */

import { FALLBACK_LOCALE, LOCALE, LOCALES_LIST, LOCALES_OBJECT } from './constants'

// import { getLocale } from "/@/locales/useAbyLocale";
import type { LocaleObject, LocaleSetting } from './types'

/** correction for filepaths */
function correctMatchKey(match: string) {
  let rematched
  if (match === 'no')
    rematched = 'nb-no' // to match file name convention

  return rematched
}

function checkDefaultLanguage() {
  // console.log(navigator.languages);
  // console.log(navigator.language);
  let matched: string | undefined = ''
  const languages = LOCALES_LIST
  languages.forEach((lang) => {
    if (lang === navigator.language)
      matched = lang
  })
  if (!matched) {
    languages.forEach((lang) => {
      const languagePartials = navigator.language.split('-')[0]
      if (lang === languagePartials)
        matched = lang
    })
  }
  if (!matched) {
    languages.forEach((lang) => {
      const languagePartials = navigator.language.split('-')[0]
      if (lang.split('-')[0] === languagePartials)
        matched = lang
    })
  }
  if (!matched) {
    languages.forEach((lang) => {
      const languageAll = navigator.languages
      languageAll.forEach((langNav) => {
        const languagePartials = langNav.split('-')[0]
        if (lang.split('-')[0] === languagePartials)
          matched = lang
      })
    })
  }
  matched = correctMatchKey(matched)
  return matched
}

function availLocales() {
  const langArr: string[] = []
  for (const key in LOCALE)
    langArr.push(LOCALE[key])

  return langArr
}

export function getLocaleObject(curLocale: string) {
  let curLocaleObject: LocaleObject | undefined
  for (let i = 0; i < LOCALES_OBJECT.length; i++) {
    if (!!LOCALES_OBJECT[i] && LOCALES_OBJECT[i]!.value === curLocale)
      curLocaleObject = LOCALES_OBJECT[i]
  }
  return curLocaleObject
}

/** Retrieves more advanced locale object, also checks default browser settings and matches aby list, default to FALLBACK_LOCALE if not set */
export function getDefaultLocaleSetting(): LocaleSetting {
  // let curLocale = getLocale()
  const curLocale = checkDefaultLanguage() || FALLBACK_LOCALE
  const localeObject = getLocaleObject(curLocale)
  return {
    showPicker: true,
    // Locale
    locale: curLocale,
    // Default locale
    fallback: FALLBACK_LOCALE,
    // available Locales
    availableLocales: availLocales(),
    localeObject: localeObject || undefined,
  }
}
