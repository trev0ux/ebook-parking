<template>
    <div class="form-check custom-form-check">
        <input
            type="checkbox"
            class="form-check-input custom-form-check__input"
            :class="dataError ? 'is-invalid' : null"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs">
        <label
            class="form-check-label"
            :for="$attrs.id"
            v-if="label">{{ label }}</label>
        <div
            v-if="dataError"
            class="invalid-feedback">
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
                required:false
            },
            errorMessage: {
                type: String,
                required:false
            },
        },
        watch: {
            errorMessage() {
                this.dataError = this.errorMessage;
            }
        },
    };
  </script>
  
  <style lang="scss">
  @import "~/assets/styles/_elements/forms";
  </style>
  