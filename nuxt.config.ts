import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],
  
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },



  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@lucide/vue',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
        'class-variance-authority',
        'clsx',
        'date-fns',
        'reka-ui',
        'tailwind-merge',
        'vue-sonner',
      ]
    },
  },

  app: {
    head: {
      title: 'Kumpul.in',
      htmlAttrs: { lang: 'id' },
      meta: [{ name: 'description', content: 'Kumpulin event management system' }],
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue'],
      ignore: ['**/ui/**']
    }
  ],

  modules: ['shadcn-nuxt', '@vueuse/nuxt', '@nuxt/image', '@nuxt/eslint', '@nuxt/fonts' ],

  fonts: {
  families: [
    { 
      name: 'Poppins', 
      provider: 'google',
      weights: [300, 400, 500, 600, 700, 800, 900]
    }
  ]
},

  image: {
    provider: process.env.NODE_ENV === 'development' ? 'none' : 'ipx',
    domains: ['images.unsplash.com', 'storage.eliflab.site', 'api.qrserver.com'],
    quality: 75,
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },

  devServer: { port: 3004 },
  ssr: true,
  srcDir: 'app/',
})