<template>
  <section class="available-places">
    <Banner :title="content.name"></Banner>
    <article class="available-places__main-content">
      <div class="container">
        <div class="accordion" id="reserveAcordion" v-if="content && content.properties">
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

              <div
                v-for="(place, index) in places"
                :key="'places' + place.index"
                class="available-places__quantity"
              >
                <p>{{ place.name }}</p>
                <div>
                  <custom-select
                    label="Aantal auto's"
                    id="name"
                    v-bind="$attrs"
                    v-model="place.selectedNumberOfSpaces"
                    :options="populateSelect(place.numberOfSpaces)"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="available-places__card">
              <h4>Prijs</h4>
              <div class="available-places__summary-total">
                <div v-for="(place, index) in places" :key="index">
                  <p>{{ place.name }}</p>
                  <h5>€ {{ place.price.toFixed(2) }}</h5>
                </div>
                <div v-if="places.length > 0">
                  <p>Totale prijs parkeren</p>
                  <h5>€ {{ totalValue }}</h5>
                </div>
              </div>
            </div>
          </section>
          <div class="invalid-feedback text-center d-block mt-3" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          <div class="available-places__buttons">
            <NuxtLink class="btn btn-outline-secondary" to="/"
              >Vorige</NuxtLink
            >
            <div>
              <ul class="progress-steps">
                <li class="progress-steps--previous"></li>
                <li class="progress-steps--active"></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <button class="btn btn-secondary" type="submit" :disabled="isSubmitting">
              Doorgann Met
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
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useNuxtApp } from "#app";
import CustomAccordion from "../components/custom-accordion.vue";
import CustomSelect from "../components/forms/custom-select.vue";
import Banner from "../components/banner.vue";
import { getAvailablePlacesPage, postAvailablePlacesData } from "@/services/api.ts";
import { useRouter } from "vue-router";

import { v4 as uuidv4 } from "uuid";

const router = useRouter();

const { $axios } = useNuxtApp();
const content = ref({});
const errorMessage = ref("");
const places = ref([]);
const isSubmitting = ref(false);

const placeData = computed(() => {
  if (!places.value || places.value.length === 0) {
    return { places: [] };
  }

  return {
    places: places.value.map((place) => ({
      parkingLotId: place.parkingLotId || uuidv4(),
      name: place.name,
      price: place.price,
      rateItems: place.rateItems,
      selectedNumberOfSpaces: parseInt(place.selectedNumberOfSpaces),
      numberOfSpaces: parseInt(place.numberOfSpaces),
    })),
  };
});

const totalValue = computed(() => {
  let rawValue = 0;
  places.value.forEach(
    (place) => (rawValue += place.price * place.selectedNumberOfSpaces)
  );
  return rawValue.toFixed(2);
});

const submitPlaces = async () => {
  isSubmitting.value = true;
  try {
    await postAvailablePlacesData(placeData.value);
    router.push("/reserveer-nu/beschikbare-plaatsen/aanvullende-diensten/");
  } catch (error) {
    errorMessage.value = error.response.data[""][0];
  } finally {
    isSubmitting.value = false;
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
    places.value = response.data.places;
  } catch (error) {
    console.error("Error:", error);
  }
};

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

onMounted(() => {
  getPageContent();
  getPlaces();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/available-places.scss"
</style>
