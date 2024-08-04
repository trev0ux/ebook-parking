<template>
  <div class="banner">
    <div class="container">
      <div class="banner__details">
        <h3 v-if="title">{{ title }}</h3>
        <Breadcrumb v-if="!hideBreadcrumb"/>
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
    hideBreadcrumb: {
      type: Boolean,
      required: false
    }
  },
};
</script>

<style lang="sass">
@import "~/assets/styles/components/banner"
</style>