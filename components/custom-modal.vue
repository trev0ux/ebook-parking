<template>
    <div class="modal custom-modal fade show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);" @click.self="closeModal">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header custom-modal__header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body custom-modal__body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer custom-modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true
      }
    },
    emits: ['close'],
    setup(props, { emit }) {
      const closeModal = () => {
        emit('close');
      };
  
      return {
        closeModal
      };
    }
  });
  </script>
  
  <style lang="scss">
  @import "~/assets/styles/_elements/custom-modal";
  </style>
  