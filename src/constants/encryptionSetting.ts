// aes encryption keys used for obfuscation not real protection
export const cacheCipher = {
  key: import.meta.env.VITE_CACHE_CIPHER_KEY, // 16 bytes
  iv: import.meta.env.VITE_CACHE_CIPHER_IV, // 16 bytes
}
