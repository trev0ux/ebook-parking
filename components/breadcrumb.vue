<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-if="previousRoute">
        <router-link :to="previousRoute.path">
          {{ previousRoute.name }}
        </router-link>
      </li>
      <li class="active" aria-current="page">
        {{ currentRoute.name }}
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const currentRoute = computed(() => {
  if (!route.name) return null;
  return {
    name: route.meta.breadcrumb || route.name,
    path: route.path,
  };
});

const previousRoute = computed(() => {
  if (router.options.history.state && router.options.history.state.back) {
    const prevRoute = router.resolve(router.options.history.state.back);
    return {
      name: prevRoute.meta?.breadcrumb || prevRoute.name,
      path: prevRoute.path,
    };
  }
  return null;
});
</script>

<style lang="scss">
@import "~/assets/styles/_elements/breadcrumb";
</style>
