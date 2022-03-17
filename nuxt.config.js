export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'admin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    icons: {
      // solid: ['faHome', 'faAlignLeft', 'faClone', 'faShoePrints', 'faBook', 'faAngleRight'],
      solid: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    baseURL: 'http://127.0.0.1:8000/api/'
  },

  auth: {
    redirect: {
      callback: '/dasboard' //sau khi login sẽ chuyển hướng về đây
    },
    strategies: {
      local: {
        endpoints: {
          // các đường dẫn đến API
          // propertyName: kết quả từ API trả về, nhớ xem kết quả để đặt key cho đúng
          login: { url: '/auth/login', method: 'post', propertyName: 'meta.token' },

          register: { url: '/auth/register', method: 'post', propertyName: 'meta.token' },
          // sau khi login, sẽ tự động chạy cái API này nữa để lấy dữ liệu user
          user: { url: '/auth/user', method: 'get', propertyName: 'data' },
          logout: false
        }
      },
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['auth']
  },

  
}
