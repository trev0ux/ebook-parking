<template>
  <div class="form-check custom-form-check">
    <input
      type="checkbox"
      class="form-check-input custom-form-check__input"
      :class="dataError ? 'is-invalid' : null"
      @change="updateValue"
      :checked="modelValue"
      v-bind="$attrs"
    />
    <label class="form-check-label" :for="$attrs.id" v-if="label">{{ label }}</label>
    <div v-if="dataError" class="invalid-feedback">
      {{ dataError }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomCheckbox",
  inheritAttrs: false,
  data() {
    return {
      dataError: this.errorMessage,
    };
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  },
  watch: {
    errorMessage() {
      this.dataError = this.errorMessage;
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.checked);
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/styles/_elements/forms";
</style>
