import { genMessage } from '/@/locales/setupI18n'

// this loads the files from the lang directories dependening on what locale is used

/**
 * Actual file reader function
 * A small problem here is that it needs to be hardcoded at compile time
 * So, if adding more languages, thsi actually needs to be updated
 *
 * Read about the problem here:
 * Vite needs to know the pattern at compile time
 * clumsy, but note https://github.com/vitejs/vite/issues/5478
 *
 * @param loc
 * @returns parsed content
 */
function str(loc: string): Record<string, Record<string, any>> | undefined {
  switch (loc) {
    case 'nb-no':
      return import.meta.glob('./nb-no/**/*.json', {
        eager: true,
      }) as Record<string, Record<string, any>>
    case 'fr':
      return import.meta.glob('./fr/**/*.json', {
        eager: true,
      }) as Record<string, Record<string, any>>
    default: // Default case for 'en' or any other locale
      return import.meta.glob('./en/**/*.json', {
        eager: true,
      }) as Record<string, Record<string, any>>
  }
}

/**
 * We fetch the files and process the emssage strings
 * Imports path, note import.meta.glob() can only accept string literals.
 */
export function getLangPacksFromFiles(locale: string) {
  // const y = str(locale)
  // console.log(str(locale))
  //  testmme(locale, 'authPages')
  const x = genMessage(str(locale)!, locale)
  return x
}

/*
async function testmme(locale, module) {
    const localesobject = await import(`./${locale}/${module}.json`)
    console.log('DEBUG testme locales ', localesobject)
    const xx = {}
    xx[module] = {} // Initialize the new higher-level key as an empty object

    for (const key in localesobject) {
        //   console.log(key);
        xx[module][key] = localesobject[key]
    }
    // console.log(xx);
    const x = genMessage(JSON.parse(JSON.stringify(localesobject)), locale)
    //   console.log(x)
}

*/
