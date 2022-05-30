const options = {
  moduleCache: {
    vue: Vue,
  },
  async getFile(url) {
    const res = await fetch('build/vue/' + url)
    if (!res.ok) throw Object.assign(new Error(res.statusText + ' ' + url), { res })
    return {
      getContentData: (asBinary) => (asBinary ? res.arrayBuffer() : res.text()),
    }
  },
  addStyle(textContent) {
    const style = Object.assign(document.createElement('style'), { textContent })
    const ref = document.head.getElementsByTagName('style')[0] || null
    document.head.insertBefore(style, ref)
  },
}
const { loadModule, version } = window['vue3-sfc-loader']

const Home = Vue.defineAsyncComponent(() => loadModule('./pages/Home.vue', options))
const About = Vue.defineAsyncComponent(() => loadModule('./pages/About.vue', options))
const Portfolio = Vue.defineAsyncComponent(() => loadModule('./pages/Portfolio.vue', options))
// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/portfolio', component: Portfolio },
]

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})

const app = Vue.createApp({})
app.use(router)
app.mount('#app')
