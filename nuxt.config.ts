// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  components: { global: true, dirs: ["~/components"] },
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-gtag",
  ],
  app: {
    head: {
      title: "traumtaenzer-paradiesvoegel",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "description",
          content: "A page that showcases Ingride's handmade clay figures.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Kablammo&family=Shadows+Into+Light&display=swap",
        },
      ],
    },
  },
  colorMode: {
    classSuffix: "",
  },
  css: ["~/assets/css/main.css"],
  image: {
    cloudflare: {
      // implementation see https://github.com/nuxt/image/issues/805#issuecomment-2483628222
      baseURL: "https://www.traumtaenzer-paradiesvoegel.de",
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  gtag: {
    id: "G-59KBT095C7",
  },
  nitro: {
    preset: "github-pages",
  },
  icon: {
    clientBundle: {
      scan: true, // the clientBundle.scan option will do a static scan for all components/markdowns and include them in the client bundle.
      // see https://github.com/nuxt/icon/pull/243#issue-2488902750 and
      // https://github.com/nuxt/icon/issues/34
      // -> necessary for static site generation
    },
    // no need to create a server bundle for static site generation
    serverBundle: false,
  },
});
