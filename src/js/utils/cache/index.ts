import { createLocalStorage, createSessionStorage } from '/@/js/utils/cache/cache'
import { cacheCipher } from '/@/constants/encryptionSetting'

export const ls = createLocalStorage({ encryptKey: cacheCipher.key }) // we send in the cipher key as default whether or not encryption is used
export const ss = createSessionStorage({ encryptKey: cacheCipher.key })
