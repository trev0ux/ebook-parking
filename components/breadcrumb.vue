<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <router-link v-if="index < breadcrumbs.length - 1" :to="breadcrumb.path">
          {{ breadcrumb.name }}
        </router-link>
        <span v-else>
          {{ breadcrumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRoutes } from '@/composables/useRoutes';

const route = useRoute();
const router = useRouter();
const { routes } = useRoutes()

onMounted(async () => {
  await useRoutes()
  console.log(routes);
})



const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter((segment) => segment);
  const breadcrumbsArray = [];

  paths.forEach((_, index) => {
    const breadcrumbPath = "/" + paths.slice(0, index + 1).join("/");
    const matchedRoute = router.resolve(breadcrumbPath);

    if (matchedRoute && matchedRoute.name) {
      breadcrumbsArray.push({
        name: matchedRoute.name,
        path: breadcrumbPath,
      });
    } else {
      breadcrumbsArray.push({
        name: "Unnamed Route",
        path: breadcrumbPath,
      });
    }
  });

  return breadcrumbsArray;
});
</script>
