// utils/errorUtils.js

import { navigateTo } from '#app'

export function handleApiError(error, validationErrors, errorMessage) {
  if (error.response) {
    if (error.response.status === 400 && validationErrors) {
      Object.assign(validationErrors, error.response.data.errors);
    } else if (error.response.status === 404) {
      return navigateTo('/404')
    } else {
      if (error.title) {
        errorMessage.value = error.title;
      } else if (error.response.data && error.response.data[""] && error.response.data[""][0]) {
        errorMessage.value = error.response.data[""][0];
      } else {
        errorMessage.value = "An unexpected error occurred.";
      }
    }
  } else {
    errorMessage.value = "Network error or server is unreachable.";
  }
  console.error("An error occurred:", error);
}