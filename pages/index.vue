<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <CBox mx="auto" class="container" max-w="1280px">
    <CBox p="16">
      <CHeading text-align="center" mb="4"
        >⚡️ Nuxt.js + Sanity + Chakra UI
      </CHeading>
      <c-simple-grid mb="4" min-child-width="220px" spacing="40px">
        <c-box
          v-for="movie in movies"
          :key="movie._id"
          bg="gray.200"
          height="75px"
          textAlign="center"
        >
          <CLink as="nuxt-link" :to="'/' + movie.link">
            {{ movie.title }}
          </CLink>
        </c-box>
      </c-simple-grid>

      <CFlex justify="center" direction="column" align="center">
        <CBox mb="3">
          <CIconButton
            mr="3"
            :icon="colorMode === 'light' ? 'moon' : 'sun'"
            :aria-label="`Switch to ${
              colorMode === 'light' ? 'dark' : 'light'
            } mode`"
            @click="toggleColorMode"
          />
          <CButton left-icon="info" variant-color="blue" @click="showToast"
            >Show Toast</CButton
          >
        </CBox>

        <CButton
          left-icon="close"
          variant-color="red"
          mt="3"
          @click="showModal = true"
          >Delete Account</CButton
        >
      </CFlex>
    </CBox>
  </CBox>
</template>

<script>
const query = `
*[_type == 'movie'] {
  _id,
  title,
  "link": slug.current
}
`

export default {
  name: 'MoviesList',
  inject: ['$chakraColorMode', '$toggleColorMode'],

  async asyncData({ $sanity }) {
    try {
      const movies = await $sanity.fetch(query)
      return {
        movies,
      }
    } catch (error) {
      console.error(error)
    }
  },

  data() {
    return {
      movies: [],
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900',
        },
        light: {
          bg: 'white',
          color: 'gray.900',
        },
      },
    }
  },
  computed: {
    colorMode() {
      return this.$chakraColorMode()
    },
    theme() {
      return this.$chakraTheme()
    },
    toggleColorMode() {
      return this.$toggleColorMode
    },
  },
  methods: {
    showToast() {
      this.$toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 10000,
        isClosable: true,
      })
    },
  },
}
</script>
