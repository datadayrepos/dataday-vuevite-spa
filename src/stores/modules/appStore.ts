import { defineStore } from 'pinia'

import { store } from '..'
import { LOCALE_KEY, USER_KEY } from '/@/constants/cacheEnums'
import { ls } from '../../js/utils/cache'

// createSessionStorage
import { getDefaultLocaleSetting, getLocaleObject } from '/@/locales/init'
import type { LocaleSetting, LocaleType } from '/@/locales/init/types'

type AppState = {
  localInfo: LocaleSetting
  userInfo: UserObject
  // storage: IWebStorage | null
}

 type UserSettings = {
   visualMode: 'dark' | 'light'
 }

/** UserObject holds all info returned during a login - we include an addition flag isAuth and some local user settings  */
type UserObject = {
  isAuth: boolean // flag indicating authentication status
  accessToken: string // access token for the user
  expiresAt: number // token expiration timestamp
  settings: UserSettings // user settings including visual mode
  userObject: {
    email: string // user's email address
    displayName: string // user's display name
    userId: string // unique identifier for the user
  }
  accountList: Array<any> // list of user's accounts (type can be specified based on actual structure)
  appList: Array<any> // list of user's apps (type can be specified based on actual structure)
}

/** userDefaultSetting sets a default userobject with no values */
function userDefaultSetting(): UserObject {
  return {
    isAuth: false,
    accessToken: '',
    expiresAt: 0,
    settings: {
      visualMode: 'dark',
    },
    userObject: {
      email: '',
      displayName: '',
      userId: '',
    },
    accountList: [],
    appList: [],
  }
}

const lsLocaleSetting: LocaleSetting = ls.get(LOCALE_KEY) || getDefaultLocaleSetting()
const defaultUserSetting = userDefaultSetting()

const keysOf = <T extends object>(obj: T) => Object.keys(obj) as Array<keyof T>

function mergeLocales(a: LocaleSetting, b: LocaleSetting): Partial<LocaleSetting> {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
  const obj: Record<string, any> = {}
  for (const key of keys)
    obj[key] = b[key] ?? a[key]

  return obj
}

/** storeApp holds app and user information */
export const storeApp = defineStore('app', {
  state: (): AppState => ({
    localInfo: lsLocaleSetting,
    userInfo: defaultUserSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker
    },
    getLocale(): LocaleType {
      return this.localInfo.locale
    },
    getAllLocale(): LocaleSetting {
      return this.localInfo
    },
    getToken(): string | undefined {
      return this.userInfo.accessToken
    },
    getTokenExpiry(): number | undefined {
      return this.userInfo.expiresAt
    },
    getAuthStatus(): boolean {
      return this.userInfo.isAuth
    },
    getUserInfo(): UserObject['userObject'] | undefined {
      return this.userInfo.userObject
    },
    getClientInfo(): UserObject['accountList'] | undefined {
      return this.userInfo.accountList
    },
  },
  actions: {
    initStorage() {
      this.localInfo = ls.get(LOCALE_KEY, getDefaultLocaleSetting())
      this.userInfo = ls.get(USER_KEY, userDefaultSetting())
    },
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      // console.trace('DEBUG setLocaleInfo: ')
      //  console.log("DEBUG setLocaleInfo", info)
      this.localInfo = { ...this.localInfo, ...info }
      this.localInfo.localeObject = getLocaleObject(this.localInfo.locale)
      ls.set(LOCALE_KEY, this.localInfo, null)
    },
    setUser(info: Partial<UserObject>) {
      this.userInfo = { ...this.userInfo, ...info }
      ls.set(USER_KEY, this.userInfo, null)
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      const merged = mergeLocales(
        getDefaultLocaleSetting(),
        this.localInfo,
      )
      this.setLocaleInfo(
        merged,
      )

      // console.log("DEBUG initLocale",this.localInfo)
    },
    /**
     * Initialize user information and load the existing configuration from the local cache
     */
    initUser() {
      this.setUser({
        ...userDefaultSetting,
        ...this.userInfo,
      })
    },
  },
})

/** storeAppWithOut returns store for use outside setup func */
export function storeAppWithOut() {
  // console.trace('DEBUG storeAppWithOut')
  return storeApp(store)
}
