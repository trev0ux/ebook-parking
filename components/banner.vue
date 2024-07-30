<template>
  <div class="banner">
    <div class="container">
      <div class="banner__details">
        <h3>{{ title }}</h3>
        <Breadcrumb />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './breadcrumb.vue';

export default {
  name: "Banner",
  components: {
    Breadcrumb
  }, 
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="sass">
@import "~/assets/styles/components/banner"
</style>