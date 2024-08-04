<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.statusMessage }}</h2>
    <p>{{ errorMessage }}</p>
    <button class="btn btn-secondary" @click="handleError">Go back</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useError } from "#app";

const props = defineProps({
  error: Object,
});

const error = useError();

const errorMessage = computed(() => {
  switch (error.value.statusCode) {
    case 404:
      return "Oops! The page you're looking for doesn't exist.";
    case 500:
      return "Uh oh! Something went wrong on our end.";
    default:
      return "An unexpected error occurred.";
  }
});

function handleError() {
  clearError({ redirect: "/" });
}
</script>

<style lang="scss">
@import "~/assets/styles/pages/error.scss";
</style>
