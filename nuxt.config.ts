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
        'lucide-vue-next',
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

  modules: ['shadcn-nuxt', '@vueuse/nuxt', '@nuxt/image', '@nuxt/eslint'],

  image: {
    // Matikan pemrosesan gambar lokal saat development agar tidak OOM
    provider: process.env.NODE_ENV === 'development' ? 'none' : 'ipx',
    domains: ['images.unsplash.com', 'storage.eliflab.site', 'api.qrserver.com'],
  },

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },

  devServer: { port: 3004 },
  ssr: true,
  srcDir: 'app/',
})