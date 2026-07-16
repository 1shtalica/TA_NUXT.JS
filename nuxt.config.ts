import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
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
      htmlAttrs: { lang: 'id' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap' },
      ],
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

  modules: ['shadcn-nuxt', '@vueuse/nuxt', '@nuxt/eslint'],

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },

  devServer: { port: 3004 },
  ssr: true,
  srcDir: 'app/',
})