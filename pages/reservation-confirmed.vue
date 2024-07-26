<template>
  <section class="reservation-confirm">
    <div class="reservation-confirm__banner">
      <div class="container">
        <div class="reservation-confirm__details">
          <h3>Uw reservering is bevestigd</h3>
          <Breadcrumb />
        </div>
      </div>
    </div>
    <article class="reservation-confirm__payment-summary">
      <div class="container">
        <div class="reservation-confirm__thanks">BEDANKT VOOR HET BOEKEN BIJ ONS!</div>
        <div class="reservation-confirm__warning">
          <h4>Controleer alstublieft alle onderstaande informatie!</h4>
          <p>
            U ontvangt ook een bevestigingsmail, controleer nogmaals of u het juiste
            e-mailadres heeft ingevoerd, als dit niet correct is, maak dan een foto van
            deze pagina ter bevestiging.
          </p>
        </div>
        <h5 class="reservation-confirm__payment-complete">Payment complete</h5>
        <section class="reservation-confirm__total-summary">
          <h4>Boeking Hervatten</h4>
          <div>
            <p>Reserveringsnummer:</p>
            <p>{{ reservation.reservationItemId }}</p>
          </div>
          <div>
            <p>Naam:</p>
            <p>{{ reservation.name }}</p>
          </div>
          <div>
            <p>Email adres:</p>
            <p>{{ reservation.email }}</p>
          </div>
          <div>
            <p>Kenteken:</p>
            <p>{{ reservation.licensePlate }}</p>
          </div>
          <div>
            <p>Aankomstdatum:</p>
            <p>{{ reservation.arrivelDate }}</p>
          </div>
          <div>
            <p>Vertrekdatum:</p>
            <p>{{ reservation.departureDate }}</p>
          </div>
          <div>
            <p>Locatie:</p>
            <p>{{ reservation.location }}</p>
          </div>
          <div>
            <p>Aantal auto's:</p>
            <p>{{ reservation.numberOfPlaces }}</p>
          </div>
          <div>
            <p>Aanvullende diensten:</p>
            <p>{{ reservation.additionalServices }}</p>
          </div>
          <div class="reservation-confirm__total">
            <h6>Total Costs</h6>
            <h6>{{ reservation.totalCostInlcudingVAT }}</h6>
          </div>
        </section>
        <div class="reservation-confirm__buttons">
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
@import "~/assets/styles/pages/reservation-confirmed.scss";
</style>

<script setup>
import { ref, onMounted } from "vue";

import {
  getReservationConfirmedData,
  getReservationConfirmedPage,
} from "@/services/api.ts";

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
    additionalServices: []
  },
]);

const getData = async () => {
  try {
    const response = await getReservationConfirmedData();
    reservation.value = response;
    console.log(reservation.value);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getPageContent = async () => {
  try {
    const response = await getReservationConfirmedPage();
    content.value = response;
    console.log(content.value);
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  //getData();
  //getPageContent();
});
</script>
