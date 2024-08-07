<template>
  <section class="payment">
    <div class="preloader" v-if="preloader">
      <div class="preloader__image"></div>
    </div>
    <div v-else>
      <Banner :title="content.name"></Banner>
      <div class="container">
        <div class="accordion" id="reserveAcordion" v-if="content && content.properties">
          <custom-accordion
            :title="content.properties.accordionTitle"
            :description="content.properties.accordionContent.markup"
            item-id="collapse1"
            parent-id="reserveAcordion"
          />
        </div>
        <div class="payment__stripe-fields">
          <form @submit.prevent="handleSubmit">
            <div id="card-element"></div>
            <div class="payment__buttons">
              <NuxtLink
                v-if="backRoute"
                class="btn btn-outline-secondary"
                :to="backRoute[0]"
                >Vorige</NuxtLink
              >
              <div>
                <ul class="progress-steps">
                  <li class="progress-steps--previous"></li>
                  <li class="progress-steps--previous"></li>
                  <li class="progress-steps--previous"></li>
                  <li class="progress-steps--active"></li>
                  <li></li>
                </ul>
              </div>
              <button
                class="btn btn-secondary"
                type="submit"
                :disabled="isSubmitting"
              >
                Pay
                <span
                  v-if="isSubmitting"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useRouteStore } from "@/stores/routeStore";
import { handleApiError } from "@/utils/errorUtils";
import { getPaymentPage } from "@/services/api.ts";
import CustomAccordion from "../components/custom-accordion.vue";
import { loadStripe } from "@stripe/stripe-js";
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app";
import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";

const routeStore = useRouteStore();
const content = ref({});
const preloader = ref(false);
const errorMessage = ref("");
const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const config = useRuntimeConfig();
const isSubmitting = ref(false);
const { $axios } = useNuxtApp();
const router = useRouter();

const contentTypeRoutes = computed(() =>
  routeStore.getRoutesByContentType("reservationComplete")
);

const backRoute = computed(() => routeStore.getRoutesByContentType("bookingForm"));

const getPaymentContent = async () => {
  try {
    const response = await getPaymentPage();
    content.value = response;
  } catch (error) {
    handleApiError(error, null, errorMessage);
  } finally {
    preloader.value = false;
  }
};

const initStripe = async () => {
  stripe.value = await loadStripe(config.public.stripePublicKey);
  try {
    const response = await $axios.get("/api/booking/createpaymentIntent", {
      items: [{ id: "xl-tshirt" }],
    });
    const clientSecret = response.data.clientSecret;
    const appearance = { theme: "stripe" };
    elements.value = stripe.value.elements({ appearance, clientSecret, locale: "nl" });
    cardElement.value = elements.value.create("payment", { layout: "tabs" });
    cardElement.value.mount("#card-element");
  } catch (error) {
    handleApiError(error, null, errorMessage);
  } finally {
    preloader.value = false;
  }
};

const handleSubmit = async () => {
  const reservationCompleteRoute = contentTypeRoutes.value[0];
  isSubmitting.value = true;
  const returnUrl = `${window.location.origin}${reservationCompleteRoute.path}`;
  try {
    const result = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: returnUrl,
      },
    });
  } catch (error) {
    handleApiError(error, null, errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  preloader.value = true;
  initStripe();
  getPaymentContent();
  await routeStore.initializeRoutes();
});
</script>
<style lang="sass">
@import "~/assets/styles/pages/payment.scss"
</style>
