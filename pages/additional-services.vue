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
                    :label="'Aantal ' + service.unit"
                    :id="'service-' + index"
                    v-model="service.quantity"
                    :options="quantityOptions"
                    required
                  />
                </div>
                <div>
                  <p>{{ service.customerInfo }}</p>
                  <h5>Prijs € {{ calculateServicePrice(service) }}</h5>
                </div>
              </div>
            </div>
          </section>
          <div class="additional-services__buttons">
            <NuxtLink class="btn btn-secondary" to="/available-places"
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
  postAdditionalServicesData,
} from "@/services/api.ts";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";

const content = ref({});
const router = useRouter();

const calculateServicePrice = (service) => {
  return (service.basePrice + service.pricePerUnit * service.quantity).toFixed(
    2
  );
};

const services = ref([
  {
    id: uuidv4(),
    serviceId: 1,
    name: "Auto opladen",
    unit: "auto's",
    quantity: 1,
    basePrice: 3,
    pricePerUnit: 0.3,
    customerInfo:
      "Opladen via 230v aansluiting € 3,- plus 30 cent per kw/h. Totaalbedrag word achteraf berekend.",
    adminDescription: "Charging service for electric vehicles",
    adminOnly: false,
    fixedPrice: false,
  },
  {
    id: uuidv4(),
    serviceId: 2,
    name: "Parkeerplaats",
    unit: "plaatsen",
    quantity: 1,
    basePrice: 5,
    pricePerUnit: 0,
    customerInfo: "Parkeerplaats € 5,- per dag.",
    adminDescription: "Parking space rental",
    adminOnly: false,
    fixedPrice: true,
  },
]);

const quantityOptions = ref([]);

const populateSelect = () => {
  for (let i = 0; i <= 1; i++) {
    quantityOptions.value.push({
      value: i,
      label: i.toString(),
    });
  }
};

const servicesForAPI = computed(() => {
  return {
    services: services.value.map((service) => ({
      serviceId: service.serviceId,
      name: service.name,
      adminDescription: service.adminDescription,
      customerInfo: service.customerInfo,
      price: parseFloat(calculateServicePrice(service)),
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
  populateSelect();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/additional-services.scss"
</style>
