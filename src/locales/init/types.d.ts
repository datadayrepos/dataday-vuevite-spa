export type LocaleType = string

export type LocaleSetting = {
  showPicker: boolean
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
  localeObject?: LocaleObject
}

export type LocaleObject = {
  label: string
  value: LocaleType
  base: string
  flag: string
  translations: string
}
