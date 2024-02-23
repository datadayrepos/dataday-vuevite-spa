// import { getStorageShortName } from '/@/utils/env';
import type { CreateStorageParams } from './storageCache'
import { createStorage as create } from './storageCache'

// import { enableStorageEncryption } from '/@/constants/encryptionSetting';
// const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
const DEFAULT_CACHE_TIME = import.meta.env.VITE_DEFAULT_CACHE_TIME
// flag for using default cipher
const DEFAULT_CACHE_ENCRYPTION_BOOL = import.meta.env.VITE_DEFAULT_CACHE_ENCRYPTION_BOOL
export type Options = Partial<CreateStorageParams>

function createOptions(storage: Storage, options: Options = {}): Options {
  const e = DEFAULT_CACHE_ENCRYPTION_BOOL === 'true'
  return {
    // No encryption in debug mode
    hasEncrypt: e, // false,//DEFAULT_CACHE_ENCRYPTION_BOOL, //enableStorageEncryption
    storage,
    //  prefixKey: 'abyx', //getStorageShortName
    ...options, // This spreads the user-provided options, which can include `encryptKey`.
  }
}

export const WebStorage = create(createOptions(sessionStorage))

export function createStorage(storage: Storage = sessionStorage, options: Options = {}) {
  return create(createOptions(storage, options))
}

export function createSessionStorage(options: Options = {}) {
  return createStorage(sessionStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  })
}

export function createLocalStorage(options: Options = {}) {
  return createStorage(localStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  })
}

export default WebStorage
