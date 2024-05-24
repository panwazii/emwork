<template>
  <v-app dark>
    <v-app-bar fixed app >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="!width"/>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <div v-if="width">
        <v-btn text to="/">home</v-btn>
        <v-btn text to="/create">create</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      bg: '#78909C',
      fixed: false,
      drawer: false,
      miniVariant: false,
      clipped: false,
      title: 'emwork',
    }
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return false
        case 'sm':
          return false
        case 'md':
          return true
        case 'lg':
          return true
        case 'xl':
          return true
      }
    },
  },
}
</script>