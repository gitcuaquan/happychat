// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      facebookAppId: ''
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],
  devServer: {
    port: 4000
  },

  ngrok: {
    // Tự động lấy NGROK_AUTHTOKEN từ biến môi trường hệ thống (không cần lưu trong .env)
    authtoken_from_env: true
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod'
      ]
    }
  }
})
