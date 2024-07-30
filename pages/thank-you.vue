<template>
  <section class="thank-you">
    <Banner :title="content.name"></Banner>
    <article class="thank-you__payment-summary">
      <div class="container">
        <div class="thank-you__thanks" v-if="content.properties">
          {{ content.properties.thankYouMessage }}
        </div>
        <div
          class="thank-you__warning"
          v-if="content.properties"
          v-html="content.properties.emailMessage.markup"
        ></div>
        <h5 class="thank-you__payment-complete">Payment complete</h5>
        <section class="thank-you__total-summary">
          <h4>Boeking Hervatten</h4>
          <div>
            <h5>Reserveringsnummer:</h5>
            <p>{{ reservation.reservationId }}</p>
          </div>
          <div>
            <h5>Naam:</h5>
            <p>{{ reservation.reservationName }}</p>
          </div>
          <div>
            <h5>Email adres:</h5>
            <p>{{ reservation.emailAddress }}</p>
          </div>
          <div>
            <h5>Kenteken:</h5>
            <p>{{ reservation.carIdentifier }}</p>
          </div>
          <div>
            <h5>Aankomstdatum:</h5>
            <p>{{ reservation.checkinDate }}</p>
          </div>
          <div class="accordion thank-you__accordion" id="finalAcordion2">
          <custom-accordion
            title="Reservation Items"
            item-id="collapse3"
            parent-id="finalAcordion2"
          >
          <template #description>
            <section class="thank-you__summary-details thank-you__summary-details--four-columns">
            <header>
              <h5>Vergoeding</h5>
              <h5>Prijs</h5>
              <h5>Aantal auto's</h5>
              <h5>Totaal</h5>
            </header>
            <article v-for="(item, index) in reservation.reservationItems" :key="index">
              <div>
                <p>
                  {{ item.name }}
                </p>
                <p>€ {{ item.price.toFixed(2) }}</p>
                <p>{{ item.quantity }}</p>
                <p>€ {{ item.total.toFixed(2) }}</p>
              </div>
            </article>
          </section>
          </template>
          </custom-accordion>
        </div>
        <div class="accordion thank-you__accordion" id="finalAcordion">
          <custom-accordion
            title="Services"
            item-id="collapse2"
            parent-id="finalAcordion"
          >
          <template #description>
            <section class="thank-you__summary-details">
            <header>
              <h5>Diensten</h5>
              <h5>Evalueer</h5>
              <h5>Aantal stuks</h5>
              <h5>Totaal</h5>
              <h5>Vaste prijs</h5>
            </header>
            <article v-for="(item, index) in reservation.services" :key="index">
              <div>
                <p>
                <b>{{ item.name }}</b>   
                  <p v-html="item.customerInfo"></p>
                </p>
                <p>€ {{ item.price.toFixed(2) }}</p>
                <p>{{ item.selectedNumberOfSpaces }}</p>
                <p>€ {{ item.totalPrice.toFixed(2) }}</p>
                <p class="d-flex justify-content-end align-items-start">
                  <button
                    type="button"
                    class="btn p-0"
                    v-if="!item.fixedPrice"
                    v-bs-tooltip:right="'Deze dienst heeft geen vaste prijs. De prijs wordt berekend en in rekening gebracht bij het afrekenen.'"
                  >
                    <Icon name="TooltipIcon"></Icon>
                  </button>
                  <button
                    type="button"
                    class="btn p-0"
                    v-else
                    v-bs-tooltip:right="'Deze dienst heeft geen vaste prijs. De prijs wordt berekend en in rekening gebracht bij het afrekenen.'"
                  >
                    <Icon name="TooltipIcon"></Icon>
                  </button>
                </p>
              </div>
            </article>
          </section>
          </template>
          </custom-accordion>
        </div>
          <div class="thank-you__total">
            <h6>Total Costs</h6>
            <h6>{{ reservation.totalPrice }}</h6>
          </div>
        </section>
        <div class="thank-you__buttons">
          <div>
            <ul class="progress-steps">
              <li class="progress-steps--previous"></li>
              <li class="progress-steps--previous"></li>
              <li class="progress-steps--previous"></li>
              <li class="progress-steps--previous"></li>
              <li class="progress-steps--active"></li>
            </ul>
          </div>
          <NuxtLink class="btn btn-primary" to="/">Vorige</NuxtLink>
        </div>
      </div>
    </article>
  </section>
</template>

<style>
@import "~/assets/styles/pages/thank-you.scss";
</style>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Banner from "~/components/banner.vue";
import { Icon } from "#components";
import CustomAccordion from "../components/custom-accordion.vue";

import {
  getReservationConfirmedData,
  getReservationConfirmedPage,
} from "@/services/api.ts";

const content = ref([]);
const reservation = ref([
  {
    reservationItemId: 17981,
    name: "test",
    email: "test@hotmail.com ",
    licensePlate: "1234 and 1234",
    arrivelDate: "27 Jul 2024 - 20:55",
    departureDate: "27 Jul 2024 - 20:55",
    location: "The cover and the overked",
    totalCostInlcudingVAT: "€ 10.00",
    numberOfPlaces: 1,
    additionalServices: [],
  },
]);

const getData = async () => {
  try {
    const response = await getReservationConfirmedData();
    reservation.value = response;
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getPageContent = async () => {
  try {
    const response = await getReservationConfirmedPage();
    content.value = response;
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  getData();
  getPageContent();
});
</script>
