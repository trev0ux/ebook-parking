<template>
  <section class="additional-services">
    <div class="additional-services__banner">
      <div class="container">
        <div class="additional-services__details">
          <h3>{{ content.name }}</h3>
          <Breadcrumb />
        </div>
      </div>
    </div>
    <article class="additional-services__main-content">
      <div class="container">
        <div class="accordion" id="reserveAcordion" v-if="content && content.properties">
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
            <NuxtLink class="btn btn-secondary" :to="{ name: 'available-places' }">Vorige</NuxtLink>
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
            <button class="btn btn-primary" type="submit">Reserveer Nu</button>
          </div>
        </form>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CustomAccordion from "../components/custom-accordion.vue";
import CustomSelect from "../components/forms/custom-select.vue";
import Breadcrumb from "../components/breadcrumb.vue";
import {
  getAdditionalServicesPage,
  getServices,
  postAdditionalServicesData,
} from "@/services/api.ts";
import { useRouter } from "vue-router";

const content = ref({});
const router = useRouter();
const calculateServicePrice = (price, quantity) => {
  return (price * quantity).toFixed(2);
};
const errorMessage = ref("");

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
    items: services.value.map((service) => ({
      serviceId: service.serviceId,
      name: service.name,
      adminDescription: service.adminDescription,
      customerInfo: service.customerInfo,
      price: service.price,
      adminOnly: service.adminOnly,
      fixedPrice: service.fixedPrice,
      selectedNumberOfSpaces: service.quantity,
      numberOfSpaces: service.quantity,
    })),
  };
});

const submitServices = async () => {
  try {
    await postAdditionalServicesData(servicesForAPI.value);
    router.push({ name: "reservation-form" });
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = error.response.data[""][0];
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
    console.error("Error:", error);
  }
};

const getPageContent = async () => {
  try {
    const response = await getAdditionalServicesPage();
    content.value = response;
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  getPageContent();
  getServicesData();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/additional-services.scss"
</style>
