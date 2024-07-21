<template>
  <div class="custom-accordion accordion-item">
    <h4 class="custom-accordion__header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + itemId"
        aria-expanded="false"
        :aria-controls="itemId"
      >
        {{ title }}
      </button>
    </h4>
    <div
      :id="itemId"
      class="accordion-collapse collapse custom-accordion__body"
      :aria-labelledby="'heading' + itemId"
      :data-bs-parent="parentId ? '#' + parentId : null"
    >
      <div v-html="description"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CustomAccordion",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/styles/_elements/custom-accordion";
</style>
