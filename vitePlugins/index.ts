// --------------------------------------------------------------------------------
// CSP dev plugin
// --------------------------------------------------------------------------------

// Define the CSP as a constant - dev mode only
function CSP_CONTENT(env: any) {
    return `
      base-uri 'self';
      block-all-mixed-content;
      child-src 'none';
      connect-src 'self' ${env.VITE_API_BASE_URL};
      font-src 'self';
      form-action 'self';
      frame-ancestors 'none';
      frame-src 'self';
      img-src 'self' data: https://*.aby.dev;
      manifest-src 'self';
      media-src 'self';
      object-src 'self';
      script-src 'self';
      style-src 'self' 'unsafe-inline';
      worker-src 'self' blob:;
  `
  }
  
  // default-src 'self';
  /**
   * Custom plugin for setting csp in dev enviro - for prod it is injected at server level
   * @param html
   * @returns string of metatag for dev enviro
   */
  export function injectCspTag(html: string, isDev = false, env: any): string {
    if (isDev) {
      const cspTag = `<meta http-equiv="Content-Security-Policy" content="${CSP_CONTENT(env).trim()}">`
      return html.replace(/<\/head>/, `${cspTag}</head>`)
    }
    return html
  }