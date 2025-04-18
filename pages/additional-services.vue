<template>
  <section class="additional-services">
    <div class="preloader" v-if="preloader">
      <div class="preloader__image"></div>
    </div>
    <div>
      <Banner :title="content.name"></Banner>
      <article class="additional-services__main-content">
        <div class="container">
          <div
            class="accordion"
            id="reserveAcordion"
            v-if="content && content.properties"
          >
            <custom-accordion
              :title="content.properties.accordionTitle"
              :description="content.properties.accordionContent.markup"
              item-id="collapse1"
              parent-id="reserveAcordion"
            />
          </div>
          <form @submit.prevent="submitServices">
            <section class="additional-services__services-form">
              <div class="additional-services__card">
                <div
                  v-for="(service, index) in services"
                  :key="service.id"
                  class="additional-services__row-service"
                >
                  <div>
                    <p>{{ service.name }}</p>
                    <custom-select
                      label="Aantal auto's"
                      :id="'service-' + index"
                      v-model="service.quantity"
                      :options="populateSelect(service.numberOfSpaces)"
                      required
                    />
                  </div>
                  <div>
                    <p>{{ service.customerInfo }}</p>
                    <h5>
                      Prijs € {{ calculateServicePrice(service.price, service.quantity) }}
                    </h5>
                  </div>
                </div>
              </div>
            </section>
            <div class="invalid-feedback text-center d-block mt-3" v-if="errorMessage">
              {{ errorMessage }}
            </div>
            <div class="additional-services__buttons">
              <NuxtLink class="btn btn-outline-secondary" :to="backRoute[0]"
                >Vorige</NuxtLink
              >
              <div>
                <ul class="progress-steps">
                  <li class="progress-steps--previous"></li>
                  <li class="progress-steps--previous"></li>
                  <li class="progress-steps--active"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <button class="btn btn-secondary" type="submit" :disabled="isSubmitting">
                Reserveer Nu
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
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CustomAccordion from "../components/custom-accordion.vue";
import CustomSelect from "../components/forms/custom-select.vue";
import Banner from "../components/banner.vue";
import {
  getAdditionalServicesPage,
  getServices,
  postAdditionalServicesData,
} from "@/services/api.ts";
import { useRouter } from "vue-router";
import { useRouteStore } from "@/stores/routeStore";
import { handleApiError } from '@/utils/errorUtils'

const routeStore = useRouteStore();
const contentTypeRoutes = computed(() =>
  routeStore.getRoutesByContentType("bookingFormPage")
);
const content = ref({});
const router = useRouter();
const calculateServicePrice = (price, quantity) => {
  return (price * quantity).toFixed(2);
};
const errorMessage = ref("");
const isSubmitting = ref(false);
const preloader = ref(false);

const backRoute = computed(() => routeStore.getRoutesByContentType("availablePlaces"));

const services = ref([]);

const quantityOptions = ref([]);

const populateSelect = (numberOfSpaces) => {
  let options = [];

  for (let i = 0; i <= numberOfSpaces; i++) {
    options.push({
      value: i,
      label: i.toString(),
    });
  }

  return options;
};

const servicesForAPI = computed(() => {
  return {
    services: services.value.map((service) => ({
      serviceId: service.serviceId,
      selectedNumberOfSpaces: parseInt(service.quantity),
    })),
  };
});

const submitServices = async () => {
  isSubmitting.value = true;
  const bookingFormRoute = contentTypeRoutes.value[0];

  try {
    await postAdditionalServicesData(servicesForAPI.value);
    router.push(bookingFormRoute.path);
  } catch (error) {
    handleApiError(error, null, errorMessage)
  } finally {
    isSubmitting.value = false;
  }
};

const getServicesData = async () => {
  try {
    const response = await getServices();
    services.value = response.services;
    services.value = services.value.map((service) => ({
      ...service,
      quantity: 0,
    }));
    quantityOptions.value = services.value;
  } catch (error) {
    handleApiError(error, null, errorMessage)
  } finally {
    preloader.value = false
  }
};

const getPageContent = async () => {
  try {
    const response = await getAdditionalServicesPage();
    content.value = response;
  } catch (error) {
    handleApiError(error, null, errorMessage)
  }
};

onMounted(async () => {
  preloader.value = true;
  getPageContent();
  getServicesData();
  await routeStore.initializeRoutes();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/additional-services.scss"
</style>
