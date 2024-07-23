<template>
  <section class="available-places">
    <div class="available-places__banner">
      <div class="container">
        <div class="available-places__details">
          <h3>{{ content.name }}</h3>
          <Breadcrumb />
        </div>
      </div>
    </div>
    <article class="available-places__main-content">
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
        <form @submit.prevent="submitPlaces">
          <section class="available-places__services-form">
            <div class="available-places__card">
              <h4>Aantal parkeerplaatsen</h4>
              <div class="available-places__quantity">
                <p>Overdekt</p>
                <div>
                  <custom-select
                    label="Aantal auto's"
                    id="name"
                    v-bind="$attrs"
                    v-model="quantity"
                    :options="quantityOptions"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="available-places__card">
              <h4>Prijs</h4>
              <div class="available-places__summary-total">
                <div v-for="(place, index) in places.places" :key="index">
                  <p>{{ place.name }}</p>
                  <h5>€ {{ place.price.toFixed(2) }}</h5>
                </div>
                <div>
                  <p>Totale prijs parkeren </p>
                  <h5>€ {{ totalValue }}</h5>
                </div>
              </div>
            </div>
          </section>
          <div class="invalid-feedback" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="available-places__buttons">
            <NuxtLink class="btn btn-secondary" to="/">Vorige</NuxtLink>
            <div>
              <ul class="progress-steps">
                <li class="progress-steps--previous"></li>
                <li class="progress-steps--active"></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <button class="btn btn-primary" type="submit">Doorgann Met</button>
          </div>
        </form>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useNuxtApp } from "#app";
import CustomAccordion from "../components/custom-accordion.vue";
import CustomSelect from "../components/forms/custom-select.vue";
import Breadcrumb from "../components/breadcrumb.vue";
import { getAvailablePlacesPage, postAvailablePlacesData } from "@/services/api.ts";
import { useRouter } from 'vue-router';

import { v4 as uuidv4 } from "uuid";

const router = useRouter();

const { $axios } = useNuxtApp();
const content = ref({});
const quantity = ref(1);
const baseValue = ref(10);
const quantityOptions = ref([]);
const errorMessage = ref("")
const places = ref([]);

const placeData = computed(() => {
  if (!places.value || places.value.length === 0) {
    return { places: [] }
  }

  return {
    items: places.value.places.map((place) => ({
      parkingLotId: place.parkingLotId || uuidv4(),
      name: place.name,
      price: place.price,
      rateItems: [place.rateItems[0]] || [0],
      selectedNumberOfSpaces: parseInt(quantity.value),
      numberOfSpaces: parseInt(place.numberOfSpaces)
    }))
  }
})

const totalValue = computed(() => {
  const rawValue = quantity.value * baseValue.value;
  return rawValue.toFixed(2);
});

const submitPlaces = async () => {
  console.log(placeData.value)
  try {
    await postAvailablePlacesData(placeData.value);
    router.push({ name: 'additional-services' });
  } catch (error) {
    errorMessage.value = error;
  }
};

const getPageContent = async () => {
  try {
    const response = await getAvailablePlacesPage();
    content.value = response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getPlaces = async () => {
  let url = "/api/selection/Get";
  try {
    const response = await $axios.get(url);
    places.value = response.data;
    baseValue.value = places.value.places[0].price
    console.log(places.value)
    populateSelect();
  } catch (error) {
    console.error("Error:", error);
  }
};

const populateSelect = () => {
  const numberOfSpaces = places.value.places[0].numberOfSpaces;
  for (let i = 0; i <= numberOfSpaces; i++) {
    quantityOptions.value.push({
      value: i,
      label: i.toString(),
    });
  }
};

onMounted(() => {
  getPageContent();
  getPlaces();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/available-places.scss"
</style>
