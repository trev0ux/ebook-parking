<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <NuxtLink v-if="index < breadcrumbs.length - 1" :to="breadcrumb.path">
          <Icon name="ChevronIcon"></Icon>
          {{ breadcrumb.name }}
        </NuxtLink>
        <span v-else>
          <Icon name="ChevronIcon"></Icon>
          {{ breadcrumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "#components";

const route = useRoute();
const router = useRouter();

function formatRouteName(name: string): string {
  const words = name.split(/[-_]/);
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter((segment) => segment);
  const breadcrumbsArray = [];

  paths.forEach((_, index) => {
    const breadcrumbPath = "/" + paths.slice(0, index + 1).join("/");
    const matchedRoute = router.resolve(breadcrumbPath).matched[0];

    if (matchedRoute && matchedRoute.name) {
      breadcrumbsArray.push({
        name: formatRouteName(matchedRoute.name as string),
        path: breadcrumbPath,
      });
    } else {
      const namePart = paths[index];
      breadcrumbsArray.push({
        name: formatRouteName(namePart),
        path: breadcrumbPath,
      });
    }
  });

  return breadcrumbsArray;
});
</script>
