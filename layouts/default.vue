<template>
  <div class="site">
    <the-aside />
    <nuxt class="main" />
  </div>
</template>

<script>
import TheAside from '~/components/TheAside/index.vue'

export default {
  name: 'LayoutDefault',
  components: {
    TheAside
  }
}
</script>

<style lang="scss" scoped>
.site {
  display: flex;

  @media screen and (max-width: 1023px) {
    display: block;
  }
}

.main {
  align-self: stretch;
  padding: 70px 60px;

  @media screen and (max-width: 1023px) {
    padding: 15px;
  }
}
</style>

