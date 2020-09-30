import { groq } from '@nuxtjs/sanity'

const settingsQuerys = groq`*[_type == "siteSettings"][0] {
  _id,
  title,
  description
}`

export const state = () => ({
  showDrafPreviewBanner: false,
  moviesSlugs: [],
  siteSettings: {},
})

export const mutations = {
  showBanner(state) {
    state.showDrafPreviewBanner = true
  },
  setMoviesSlugs(state, slugs) {
    state.moviesSlugs = slugs
  },

  setSiteSettings(state, settings) {
    state.siteSettings = settings
  },
}

export const actions = {
  // async nuxtServerInit({ commit }, { $sanity }) {
  //   const moviesSlugs = await $sanity
  //     .fetch('*[_type == "movie"].slug.current')
  //     .catch((e) => console.error(e))

  //   commit('setMoviesSlugs', moviesSlugs)
  // },

  async nuxtServerInit({ commit }, { $sanity }) {
    const siteSettings = await $sanity
      .fetch(settingsQuerys)
      .catch((e) => console.error(e))

    commit('setSiteSettings', siteSettings)
  },
}
