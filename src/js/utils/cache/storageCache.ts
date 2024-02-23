import { decodeByBase64, encodeByBase64, xorEncryptDecrypt } from '../cipher'

export type CreateStorageParams = {
  prefixKey: string
  storage: Storage
  timeout?: number | null
  hasEncrypt: boolean
  encryptKey: string
}

/**
 * Class that manages storage, local or session storage
 */
export function createStorage({
  prefixKey = '',
  storage = sessionStorage,
  timeout = null,
  hasEncrypt = false,
  encryptKey = '',
}: Partial<CreateStorageParams> = {}) {
  /**
   * Simplified Cache class without encryption.
   * Can be passed into sessionStorage or localStorage.
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage
    private prefixKey?: string
    private timeout: number | null
    private hasEncrypt: boolean
    private encryptKey: string

    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
      this.timeout = timeout
      this.hasEncrypt = hasEncrypt
      this.encryptKey = encryptKey
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    private encryptData(data: string): string {
      if (!this.hasEncrypt)
        return data
      const encrypted = xorEncryptDecrypt(data, this.encryptKey)
      return encodeByBase64(encrypted)
    }

    private decryptData(data: string): string {
      if (!this.hasEncrypt)
        return data
      const decrypted = decodeByBase64(data)
      return xorEncryptDecrypt(decrypted, this.encryptKey)
    }

    /**
     * Set cache
     * @param {string} key
     * @param {*} value
     * @param {*} expire Expiration time in seconds, if provided.
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = this.timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: expire !== null ? Date.now() + expire * 1000 : null,
      })

      const encryptedData = this.encryptData(stringData)
      this.storage.setItem(this.getKey(key), encryptedData)
    }

    /**
     * Read cache
     * @param {string} key
     * @param {*} def Default value to return if the key does not exist or is expired.
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const encryptedVal = this.storage.getItem(this.getKey(key))
      if (!encryptedVal)
        return def

      const val = this.decryptData(encryptedVal)
      try {
        const data = JSON.parse(val)
        const { value, expire } = data
        if (expire === null || expire >= Date.now())
          return value

        this.remove(key) // Remove expired item
        return def
      }
      catch (e) {
        return def // Return default value in case of any error
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * Delete all caches of this instance
     */
    clear() {
      this.storage.clear()
    }
  }

  return new WebStorage()
}
