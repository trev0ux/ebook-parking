<template>
  <div>
    <header-component></header-component>
    <slot></slot>
    <footer-component></footer-component>
  </div>
</template>

<script>
import HeaderComponent from "../components/header/index.vue";
import FooterComponent from "../components/footer/index.vue";

export default {
  components: { HeaderComponent, FooterComponent },
};
</script>

<style></style>
