<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <CBox mx="auto" class="container" max-w="1280px">
    <CBox p="16">
      <CHeading text-align="center" mb="4"
        >⚡️ Nuxt.js + Sanity + Chakra UI
      </CHeading>
      <h3>
        <strong>Site Title:</strong> {{ $store.state.siteSettings.title }}
      </h3>
      <h3>
        <strong>Site Description:</strong>
        {{ $store.state.siteSettings.description }}
      </h3>
      <c-simple-grid mb="4" min-child-width="220px" spacing="40px">
        <c-box
          v-for="book in books"
          :key="book._id"
          bg="gray.200"
          height="75px"
          textAlign="center"
        >
          <!-- <c-image :src="$urlFor(book.bookCover)" /> -->
          <!-- <nuxt-link to="/books/the-art-of-happiness">Test</nuxt-link> -->
          <c-link as="nuxt-link" :to="'/books/' + book.slug.current">
            {{ book.title }}
          </c-link>
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
import { groq } from '@nuxtjs/sanity'
console.log('groq', groq)

const query = groq`*[_type == "audiobook"] {
  _id,
  title,
  slug,
  bookCover,
  "link": adudiobookUrl
}`

export default {
  name: 'BooksList',
  inject: ['$chakraColorMode', '$toggleColorMode'],

  async asyncData({ $sanity }) {
    try {
      const books = await $sanity.fetch(query)
      return {
        books,
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
