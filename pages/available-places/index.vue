<template>
  <section class="available-places">
    <div class="available-places__banner">
      <div class="container">
        <div class="available-places__details">
          <h3>{{ content.name }}</h3>
          <ol class="breadcrumb">
            <li>
              <a href="#">{{ content.name }}</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <article class="available-places__main-content">
      <div class="container">
        <div class="accordion" id="reserveAcordion"  v-if="content && content.properties">
          <custom-accordion
            :title="content.properties.accordionTitle"
            :description="content.properties.accordionContent.markup"
            item-id="collapse1"
            parent-id="reserveAcordion"
          />
        </div>
        <form class="available-places__calendar" @submit.prevent="submitBooking">

          <button class="btn btn-primary" type="submit">Reserveer Nu</button>
        </form>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import CustomAccordion from "../../components/custom-accordion.vue";
import { useRoute } from 'nuxt/app'

const route = useRoute()
const id = route.params.id

const { $axios } = useNuxtApp();
const dateRange = ref(new Date());
const content = ref({});
const defaultFormat = "dd-MM-yyyy";

const submitBooking = async () => {
  let bookingData = {
    arriveDate: dateRange.value[0],
    leaveDate: dateRange.value[1],
  };

  let url = "/api/parking-availability/Get";

  try {
    await $axios.post(url, bookingData);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getReserveContent = async () => {
  let url = "/umbraco/delivery/api/v2/content/item/reserveer-nu/beschikbare-plaatsen/";

  try {
    const response = await $axios.get(url);
    content.value = response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};


onMounted(() => {
  getReserveContent();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/available-places.scss"
</style>
