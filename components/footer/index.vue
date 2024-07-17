<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__company-details">
        <NuxtImg src="/logo.png" alt="Ebook Parking Logo"></NuxtImg>
        <p>
          Is er iets niet zo gegaan als gewenst? Of heeft u andere tips of
          vragen? Neem contact met ons op zodat we hier iets mee kunnen doen.
        </p>
      </div>
      <div class="footer__copyright">
        <p>
          © Copyrights 2024 <a href="/">parkeren harlingen</a>. | All Rights
          Reserved. | v 1.2.0.0
        </p>
        <a
          class="poweredByLink"
          href="https://double.pt/en"
          target="_blank"
          title="Web Design and Development based in Portugal"
        >
          by
          <NuxtImg
            class="made-logo"
            alt="Double - Umbraco Register Partner Agency based in Portugal"
            src="/double.png"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="sass">
@import "~/assets/styles/components/footer"
</style>
