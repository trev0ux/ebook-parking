<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="updateValue"
    >
    <label class="form-check-label" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  const isChecked = event.target.checked;

  emit('update:modelValue', event.target.checked);
  emit('valueChanged', isChecked ? 'Yes' : 'No')
}

</script>

<style scoped>
/** You can add custom styles here if needed **/
</style>