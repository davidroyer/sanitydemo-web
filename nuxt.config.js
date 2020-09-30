import { ChakraLoaderPlugin } from 'chakra-loader'

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  // plugins: ['~plugins/sanity.js', '~plugins/preview.client.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/sanity',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    // '@nuxtjs/tailwindcss',
  ],
  modules: ['@nuxtjs/pwa', '@chakra-ui/nuxt', '@nuxtjs/emotion'],

  /**
   * Add extend the plugin options under the `chakra` key.
   **/
  // chakra: {
  //   extendTheme: {
  //     colors: {
  //       brand: {
  //         /* ... */
  //       },
  //     },
  //   },
  // },
  generate: {
    fallback: true,
  },

  build: {
    extend(config) {
      config.plugins.push(new ChakraLoaderPlugin())
    },
  },
  sanity: {
    projectId: 'jyioe45g',
    dataset: 'production',
    useCdn: false,
    withCredentials: true,
  },
}
