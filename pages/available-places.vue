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
                <div>
                  <p>Overdekt</p>
                  <h5>€ {{ totalValue }}</h5>
                </div>
                <div>
                  <p>Overdekt</p>
                  <h5>€ {{ totalValue }}</h5>
                </div>
              </div>
            </div>
          </section>
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
import { ref, onMounted } from "vue";
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

const totalValue = computed(() => {
  const rawValue = quantity.value * baseValue.value;
  return rawValue.toFixed(2);
});

const submitPlaces = async () => {
  let data = {
    parkingLotId: uuidv4(),
    numberOfSpaces: quantity,
  };
  try {
    await postAvailablePlacesData(data);
    router.push({ name: 'additional-services' });
  } catch (error) {
    console.error("Error:", error);
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
  } catch (error) {
    console.error("Error:", error);
  }
};

const populateSelect = () => {
  for (let i = 1; i <= 55; i++) {
    quantityOptions.value.push({
      value: i,
      label: i.toString(),
    });
  }
};

onMounted(() => {
  getPageContent();
  populateSelect();
  getPlaces();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/available-places.scss"
</style>
