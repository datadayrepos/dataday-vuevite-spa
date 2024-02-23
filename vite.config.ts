import path, { resolve } from 'node:path'
import fs from 'node:fs'
import { defineConfig, loadEnv } from 'vite'

// /*, ConfigEnv, UserConfigExport*/
import vue from '@vitejs/plugin-vue'
import { injectCspTag } from './vitePlugins'

// https://vitejs.dev/config/
// https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
export default defineConfig(({ command, mode }) => {
// This loads the env dependent on th eniro, ie .env.development, .env.production.
  const env = loadEnv(mode, process.cwd(), '')
  // This is the local DEV config
  if (command === 'serve') {
    return {
      test: {
        includeSource: ['src/**/*.{js,ts}'],
      },
      //  assetsInclude: ["**/*.wasm"],
      define: {
        __APP_ENV__: env.APP_ENV,
      },
      root: '.',
      base: env.VITE_SPA_PATH,
      // https://vitejs.dev/config/index.html#dep-optimization-options
      optimizeDeps: {
        include: [
          'vue',
          'vue-router',
          '@vueuse/head',
        ],
        // https://github.com/vitejs/vite/issues/8427
        exclude: [],
      },
      esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
      },
      build: {
        sourcemap: false,
        brotliSize: false,
        chunkSizeWarningLimit: 2000,
      },
      plugins: [
        vue(),
        {
          name: 'csp-injector',
          transformIndexHtml(html) {
            return injectCspTag(html, process.env.NODE_ENV === 'development', env)
          },
        },
      ],
      resolve: {
        alias: [
          {
            find: /\/@\//,
            replacement: `${pathResolve('src')}/`,
          },
          {
            find: /\/#\//,
            replacement: `${pathResolve('types')}/`,
          },
        ],
      },
      server: {
        port: Number.parseInt(env.VITE_PORT, 10), // Converts the string to an integer
        host: '0.0.0.0',
        https: {
          key: fs.readFileSync('./.cert/key.pem'),
          cert: fs.readFileSync('./.cert/cert.pem'),
        },
      },
    }
    // This is the PRODUCTION config
  }
  else if (command === 'build') {
    return {
      test: {
        includeSource: ['src/**/*.{js,ts}'],
      },

      root: '.',
      base: env.VITE_SPA_PATH, // dir we serve from
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'), // Add this line
        '__APP_ENV__': env.APP_ENV,
        'import.meta.vitest': 'undefined',
        '__VUE_PROD_DEVTOOLS__': true,
      },
      // https://vitejs.dev/config/index.html#dep-optimization-options
      optimizeDeps: {
        include: [
          'vue',
          'vue-router',
          '@vueuse/head',
        ],
        exclude: [],
      },
      // https://github.com/vitejs/vite/issues/1286#issuecomment-753495099
      esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
      },
      build: {
        sourcemap: false, // This enables source maps
        brotliSize: false,
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          output: {
            // Format: index-[hash].js // here we rename all files to index to obscufsiate the code
            entryFileNames: `assets/index-[hash].js`,
            chunkFileNames: `assets/index-[hash].js`,
            assetFileNames: `assets/index-[hash].[ext]`,
          },
        },
      },
      plugins: [vue()],
      resolve: {
        alias: {
          '/@': path.resolve(__dirname, './src'),
          // https://github.com/intlify/bundle-tools/issues/23
          // 'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
        },
      },
    }
  }
  else { return {} }
})