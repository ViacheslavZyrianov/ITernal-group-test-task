<template>
  <aside class="the-aside"></aside>
</template>

<script>
export default {
  name: 'TheAside'
}
</script>

<style lang="scss">
  .the-aside {
    width: 270px;
    align-self: stretch;
    background-color: #F9FAFB;

    @media screen and (max-width: 1023px) {
      width: 100%;
      height: 70px;
    }
  }
</style>