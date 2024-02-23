/**
 * Trivial encryption for obscufiation more than security
 * Not for real security but meant to provide protection against reverse engeneering mostly
 * @param input
 * @param key
 */
export function xorEncryptDecrypt(input: string, key: string) {
  let output = ''
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    output += String.fromCharCode(charCode)
  }
  return output
}

export type EncryptionParams = {
  key: string
  iv: string
}

/**
 * AesEncryption Class Usage
 * We originally used this for local cache, but the async nature caused problems.
 * Instead we use a basic XOR encryption for cache (where security is more trivial)
 * We keep this code here to allow for real client side encryption for future proofing
 *
 * The AesEncryption class provides methods to encrypt and decrypt data using AES-CBC mode.
 *
 * To use this class, you must first create an instance and then initialize it with a key and an IV (Initialization Vector).
 * The key and IV should be strings. The IV must be exactly 16 bytes (characters) long.
 *
 * Example:
 *   const aes = new AesEncryption();
 *   await aes.init({ key: 'your-32-byte-key-here', iv: 'your-16-byte-iv-here' });
 *
 * To encrypt data:
 *   const encryptedData = await aes.encryptByAES('Your plain text');
 *   // encryptedData will be a Base64 encoded string
 *
 * To decrypt data:
 *   const decryptedData = await aes.decryptByAES(encryptedData);
 *   // decryptedData will be the original plain text
 *
 * Note:
 * - The key should be a string of appropriate length for AES (e.g., 32 bytes for AES-256).
 * - Both the key and the IV should be securely generated and managed.
 * - The encrypted data is returned as a Base64 encoded string.
 */
export class AesEncryption {
  private key: CryptoKey | null = null
  private iv: ArrayBuffer | null = null

  constructor() { }

  async init(opt: { key?: string; iv?: string }) {
    if (opt.key)
      this.key = await this.importKey(opt.key)

    if (opt.iv) {
      if (opt.iv.length !== 16)
        throw new Error('IV must be 16 bytes long for AES-CBC')

      this.iv = this.convertStringToArrayBuffer(opt.iv)
    }
    else {
      throw new Error('IV is required for AES-CBC')
    }
  }

  private importKey(key: string): Promise<CryptoKey> {
    const keyBuffer = this.convertStringToArrayBuffer(key)
    const k = crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-CBC' },
      false,
      ['encrypt', 'decrypt'],
    ) // this makes the init function async
    return k
  }

  private convertStringToArrayBuffer(str: string): ArrayBuffer {
    return new TextEncoder().encode(str)
  }

  private convertArrayBufferToString(buffer: ArrayBuffer): string {
    return new TextDecoder().decode(buffer)
  }

  async encryptByAES(plainText: string): Promise<string> {
    if (!this.key || !this.iv)
      throw new Error('Key and IV must be set')

    const data = this.convertStringToArrayBuffer(plainText)
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: this.iv },
      this.key,
      data,
    )
    return this.arrayBufferToBase64(encrypted)
  }

  async decryptByAES(cipherText: string): Promise<string> {
    if (!this.key || !this.iv)
      throw new Error('Key and IV must be set')

    const data = this.base64ToArrayBuffer(cipherText)
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: this.iv },
      this.key,
      data,
    )
    return this.convertArrayBufferToString(decrypted)
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
  }

  base64ToArrayBuffer(base64: string) {
    const binaryString = atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++)
      bytes[i] = binaryString.charCodeAt(i)

    return bytes.buffer
  }
}

/**
 * Base64 Encoding and Decoding Functions
 *
 * These functions provide a way to encode and decode strings using Base64 encoding.
 *
 * To encode a string to Base64:
 *   const base64Encoded = encodeByBase64('Your plain text');
 *
 * To decode a Base64 encoded string:
 *   const plainText = decodeByBase64(base64Encoded);
 *
 * Note:
 * - The encodeByBase64 function converts the input string to UTF-8 and then encodes it to Base64.
 * - The decodeByBase64 function decodes a Base64 string back to UTF-8 encoded plain text.
 */
export function encodeByBase64(plainText: string) {
  // Convert the string to UTF-8 encoded data
  const utf8Encoded = new TextEncoder().encode(plainText)
  // Convert the Uint8Array to a regular string with binary encoding
  const binaryString = String.fromCharCode(...utf8Encoded)
  // Encode the binary string to Base64
  return btoa(binaryString)
}

/**
 * Base64 Encoding and Decoding Functions
 *
 * These functions provide a way to encode and decode strings using Base64 encoding.
 *
 * To encode a string to Base64:
 *   const base64Encoded = encodeByBase64('Your plain text');
 *
 * To decode a Base64 encoded string:
 *   const plainText = decodeByBase64(base64Encoded);
 *
 * Note:
 * - The encodeByBase64 function converts the input string to UTF-8 and then encodes it to Base64.
 * - The decodeByBase64 function decodes a Base64 string back to UTF-8 encoded plain text.
 */
export function decodeByBase64(base64Encoded: string) {
  // Decode the Base64 string to a binary string
  const binaryString = atob(base64Encoded)
  // Convert the binary string to a Uint8Array
  const charCodes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++)
    charCodes[i] = binaryString.charCodeAt(i)

  // Decode the UTF-8 encoded data to a regular string
  return new TextDecoder().decode(charCodes)
}
