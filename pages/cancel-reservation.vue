<template>
  <section class="cancelation-page">
    <div class="preloader" v-if="preloader">
      <div class="preloader__image"></div>
    </div>
    <div v-else>
    <Banner :title="content.name" hide-breadcrumb></Banner>
    <p class="invalid-feedback text-center d-flex py-5 justify-content-center" v-if="error">
    <div class="container" v-if="!errorMessage">{{ error }}</div>
    <div class="container" v-else v-html="errorMessage">
    </div>
    </p>
    <div v-else>
      <div class="container cancelation-page__container">
        <section class="cancelation-page__page-content">
          <ul class="cancelation-page__user-data">
            <li><h2>Uw Reservering</h2></li>
            <li>
              <h3>Reserveringsnummer:</h3>
              {{ data.reservationNumber }}
            </li>
            <li>
              <h3>Naam:</h3>
              {{ data.name }}
            </li>
            <li>
              <h3>Kenteken:</h3>
              {{ data.licensePlate }}
            </li>
            <li>
              <h3>Aankomstdatum:</h3>
              {{ data.arrivalDate }}
            </li>
            <li>
              <h3>Vertrekdatum:</h3>
              {{ data.departureDate }}
            </li>
            <li>
              <h3>Location:</h3>
              <div v-for="(item, index) in data.locations" :key="index">
                {{ item.name }}
              </div>
            </li>
            <li>
              <h3>Aantal autos:</h3>
              {{ data.numberOfCars }}
            </li>
            <li v-if="data.totalCost">
              <h3>Totale Kosten:</h3>
              {{ data.totalCost.toFixed(2) }}
            </li>
          </ul>
          <aside>
            <form @submit.prevent="submitCancelation">
              <div>
                <h4 v-if="content.properties">{{ content.properties.cancelationTitle }}</h4>
                <custom-checkbox
                  :label="content.properties.cancelationLabel"
                  v-model="postData.confirmCancellation"
                  v-if="content.properties"
                  id="confirmCancelation"
                ></custom-checkbox>
                <div
                      v-if="hasFieldError('ConfirmCancellation')"
                      class="invalid-feedback d-block"
                    >
                      {{ getFieldError("ConfirmCancellation") }}
                    </div>
              </div>
              <button class="btn btn-secondary">
                Bevestig Annulering
                <span
                  v-if="isSubmitting"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            </form>
          </aside>
        </section>
      </div>
    </div>
  </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNuxtApp } from "#app";
import Banner from "../components/banner.vue";
import CustomCheckbox from "../components/forms/custom-check.vue";
import { postCancelationFormData, getCancelationPage } from "@/services/api.ts";
import { handleApiError } from '@/utils/errorUtils'
import { useRouteStore } from "@/stores/routeStore";

const route = useRoute();
const router = useRouter();
const data = ref([]);
const error = ref(null);
const errorMessage = ref("");
const isSubmitting = ref(false);
const postData = ref({});
const validationErrors = ref([]);
const content = ref([]);
const preloader = ref(false);
const routeStore = useRouteStore();

const contentTypeRoutes = computed(() =>
  routeStore.getRoutesByContentType("canceledReservation")
);

const hasFieldError = (fieldName) => {
  return validationErrors.value && validationErrors.value[fieldName];
};

const getFieldError = (fieldName) => {
  return hasFieldError(fieldName) ? validationErrors.value[fieldName][0] : "";
};

const submitCancelation = async () => {
  isSubmitting.value = true;
  const confirmCancelationRoute = contentTypeRoutes.value[0];

  try {
    await postCancelationFormData(postData.value);
    router.push(confirmCancelationRoute.path);
  } catch (error) {
    handleApiError(error, validationErrors, errorMessage)
  } finally {
    isSubmitting.value = false;
  }
};

function populatePostData(token) {
  return {
    reservationNumber: data?.value?.reservationNumber ?? 0,
    name: data?.value?.name ?? '',
    emailAddress: data?.value?.emailAddress ?? '',
    licensePlate: data?.value?.licensePlate ?? '',
    arrivalDate: data?.value?.arrivalDate ?? '',
    departureDate: data?.value?.departureDate ?? '',
    locations: data?.value?.locations ?? [],
    numberOfCars: data?.value?.numberOfCars ?? 0,
    totalCost: data?.value?.totalCost ?? 0,
    services: Array.isArray(data?.value?.services)
      ? data.value.services.map((service) => ({
          serviceId: service.serviceId ?? 0,
          name: service.name ?? '',
          adminDescription: service.adminDescription ?? '',
          customerInfo: service.customerInfo ?? '',
          price: service.price ?? 0,
          adminOnly: service.adminOnly ?? false,
          fixedPrice: service.fixedPrice ?? false,
          selectedNumberOfSpaces: service.selectedNumberOfSpaces ?? 0,
          numberOfSpaces: service.numberOfSpaces ?? 0,
        }))
      : [],
    confirmCancellation: false ,
    token: token,
  };
}

const getPageContent = async () => {
  try {
    const response = await getCancelationPage();
    content.value = response;
  } catch (error) {
    handleApiError(error, null, errorMessage)
  }
};

const getData = async () => {
  const { $axios } = useNuxtApp();
  const token = route.query.token;

  try {
    const response = await $axios.get(`/api/Cancellation/Get?token=${token}`);
    data.value = response.data;
    postData.value = populatePostData(token)
  } catch (error) {
    handleApiError(error, null, errorMessage)
  } finally {
    preloader.value = false;
  }
}

onMounted(async () => {
  preloader.value = true;
  getData();
  getPageContent();
  await routeStore.initializeRoutes();
});
</script>
<style lang="sass">
@import "~/assets/styles/pages/cancel-reservation.scss"
</style>
