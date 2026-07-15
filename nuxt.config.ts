// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/ngrok'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  runtimeConfig: {
    mongoUri: process.env.MONGO_URI || '',
    jwtSecret: process.env.JWT_SECRET || 'gao_cute_2026_dang_yeu_vo_cung',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
    public: {
      facebookAppId: process.env.FACEBOOK_APP_ID || ''
    }
  },

  routeRules: {
    '/': { prerender: true }
  },
  devServer: {
    port: 4000
  },

  compatibilityDate: '2026-06-30',
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.dev']
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ngrok: {
    // Tự động lấy NGROK_AUTHTOKEN từ biến môi trường hệ thống (không cần lưu trong .env)
    authtoken_from_env: true
  }
})
