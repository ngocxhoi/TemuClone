// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxthub/core",
    "@nuxtjs/kinde",
    "@nuxt/content",
  ],
  css: ["~/assets/css/main.css"],

  appConfig: {
    title: "Temu",
    description: "Buy your sell products and more",
  },

  hub: {
    database: true,
    blob: true,
  },

  routeRules: {
    "/": {
      kinde: {
        public: true,
      },
    },
    // "/**": {
    //   appMiddleware: ["auth-logged-in"],
    //   kinde: {
    //     redirectUrl: "/api/login",
    //     external: true,
    //   },
    // },
    "/dashboard": {
      appMiddleware: ["auth-logged-in"],
      kinde: {
        redirectUrl: "/api/login",
        external: true,
      },
    },
  },

  // content: {
  //   database: {
  //     type: 'd1',
  //     bindingName: 'CF_BINDING_NAME'
  //   }
  // }
});
