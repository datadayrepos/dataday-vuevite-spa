/**
 * locales constants 220922 ivar.strand
 * Must match available langs in app
 */
import type { LocaleObject, LocaleType } from './types'

export const LOCALES_LIST = ['en', 'fr', 'no']

/** An enum map of constants of available locales */
export const LOCALE: { [key: string]: LocaleType } = {
  //  ZH_CN: 'zh_CN',
  EN_US: 'en',
  FR: 'fr',
  NO: 'nb-no',
}

/**
 * Holds config infofor each locales
 */
export const LOCALES_OBJECT: LocaleObject[] = [
  {
    label: 'English',
    value: LOCALE.EN_US,
    base: '',
    flag: 'us',
    translations: '', // '/translations/en.json'  // tbbd whether to use unified translation file
  },
  {
    label: 'Norsk',
    value: LOCALE.NO,
    base: '/no',
    flag: 'no',
    translations: '',
  },
  {
    label: 'Français',
    value: LOCALE.FR,
    base: '/fr',
    flag: 'fr',
    translations: '',
  },
]

/** If a translation si not found, we fall back here */
export const FALLBACK_LOCALE = LOCALE.EN_US
