<template>
  <section class="reservation-form">
    <div class="reservation-form__banner">
      <div class="container">
        <div class="reservation-form__details">
          <h3>{{ content.name }}</h3>
          <Breadcrumb />
        </div>
      </div>
    </div>
    <article class="reservation-form__main-content">
      <div class="container">
        <form @submit.prevent="submitServices">
          <section class="reservation-form__form">
            <aside>
              <div class="reservation-form__card">
                <div class="reservation-form__summary-header">
                  <h4>Boekingsdetails</h4>
                  <div>
                    <p>Aankomstdatum:</p>
                    <p>21-07-2024</p>
                  </div>
                  <div>
                    <p>Aankomstdatum:</p>
                    <p>21-07-2024</p>
                  </div>
                </div>
                <section class="reservation-form__summary-details">
                  <header>
                    <h5>Diensten</h5>
                    <h5>Evalueer</h5>
                    <h5>Aantal stuks</h5>
                    <h5>Totaal</h5>
                  </header>
                  <article>
                    <div>
                      <h5>Overdekt default : 2 Day(s)</h5>
                      <p>€ 10,00</p>
                      <p>1</p>
                      <p>€ 10,00</p>
                    </div>
                    <div>
                      <h5>Overdekt default : 2 Day(s)</h5>
                      <p>€ 10,00</p>
                      <p>1</p>
                      <p>€ 10,00</p>
                    </div>
                    <div>
                      <h5>Overdekt default : 2 Day(s)</h5>
                      <p>€ 10,00</p>
                      <p>1</p>
                      <p>€ 10,00</p>
                    </div>
                  </article>
                  <div>
                    <h5>Total Cost Including VAT:</h5>
                    <h6>€ 10,00</h6>
                  </div>
                </section>
              </div>
              <div class="reservation-form__card">
                <h4>Boekingsdetails</h4>
                <p>
                  Voordat we de reservering kunnen bevestigen, hebben we
                  onderstaande gegevens nodig, klik vervolgens op reservering
                  bevestigen.
                </p>
                <div class="reservation-form__double-select">
                  <p>Veerboot vertrektijd</p>
                  <div>
                    <custom-select label="Payment Option" id="name" v-bind="$attrs" v-model="quantity"
                      :options="quantityOptions" required />
                    <custom-select label="Payment Option" id="name" v-bind="$attrs" v-model="quantity"
                      :options="quantityOptions" required />
                  </div>
                </div>
                <div class="reservation-form__switch">
                  <p>Betreft sneldienst?</p>
                  <custom-switch id="name" />
                </div>
                <div class="reservation-form__double-select">
                  <p>Veerboot vertrektijd</p>
                  <div>
                    <custom-select label="Payment Option" id="name" v-bind="$attrs" v-model="quantity"
                      :options="quantityOptions" required />
                    <custom-select label="Payment Option" id="name" v-bind="$attrs" v-model="quantity"
                      :options="quantityOptions" required />
                  </div>
                </div>
                <div class="reservation-form__single-select">
                  <p>Veerboot vertrektijd</p>
                  <custom-select label="Payment Option" id="name" v-bind="$attrs" v-model="quantity"
                    :options="quantityOptions" required />
                </div>
              </div>
            </aside>
            <article>
              <div class="reservation-form__card">
                <div class="reservation-form__content-fields">
                  <h4 v-if="titleFerryForm"> {{ content.properties.titleFerryForm }}
                  </h4>
                  <p v-if="descriptionFerryForm">
                    {{ content.properties.descriptionFerryForm }}
                  </p>
                  <fieldset>
                    <custom-input label="Member Name" required id="name"></custom-input>
                    <custom-input label="Member Name" required id="name"></custom-input>
                    <custom-input label="Member Name" required id="name"></custom-input>
                    <custom-input label="Member Name" required id="name"></custom-input>
                    <div>
                      <label class="form-label" for="bericht">Bericht</label>
                      <small>
                        Aanvullende gegevens, tips en/of vragen mag u hier
                        invullen.</small>
                      <textarea rows="4" cols="20" id="bericht" class="form-control"></textarea>
                    </div>
                    <custom-select label="Payment Option" id="name" v-bind="$attrs" v-model="quantity"
                      :options="quantityOptions" required />
                  </fieldset>
                </div>
              </div>
            </article>
          </section>
          <div class="reservation-form__terms-and-conditions">
            <p>Uw reservering wordt direct in het systeem geplaatst, tevens ontvangt u direct een
              reserveringsbevestiging op het door u ingevoerde e-mailadres!</p>
            <button @click="showModal = true" class="btn btn-link">Voorwaarden</button>
            <custom-checkbox v-if="showTermsAndConditions" label="I Accept the Terms and Conditions" v-bind="$attrs"
              id="terms-and-conditions"></custom-checkbox>
          </div>
          <custom-modal v-if="showModal" @close="showModal = false" title="Voorwaarden">
            <template #body>
              <ol>
                <li>The storage is entirely at the expense, risk and liability of the owner / possessor of the stored
                  object.</li>
                <li>The owner of the storage facility is not liable for damage, loss, in whatever form, to the stored
                  objects during the storage period.</li>
                <li>We do our utmost to protect and guard your property as best we can.</li>
                <li>You can collect your stored object up to 15 minutes after arrival of the boat.</li>
                <li>Just email (info@parkeren-harlingen.nl) or send a text message (whatsapp to +31517412986) if the
                  date of departure changes.</li>
                <li>You can cancel by clicking on the link at the bottom of the confirmation email.</li>
                <li>As long as you have not reported to us, we are never responsible for parking fines / additional tax
                  assessments. We also strongly advise you not to park your car without a parking ticket on public land
                  in Harlingen due to strict controls (per ticket per day approx.</li>
                <li>When you reserve a place with a minimum parking time (for example, at least 1 week of parking). Then
                  you will receive a refund for earlier collection up to the minimum parking time associated with the
                  place.</li>
              </ol>
            </template>
            <template #footer>
              <button type="button" class="btn btn-primary" @click="acceptTermsAndConditions()">IK GA AKKOORD</button>
            </template>
          </custom-modal>
          <div class="reservation-form__buttons">
            <NuxtLink class="btn btn-secondary" to="/available-places">Vorige</NuxtLink>
            <div>
              <ul class="progress-steps">
                <li class="progress-steps--previous"></li>
                <li class="progress-steps--previous"></li>
                <li class="progress-steps--previous"></li>
                <li class="progress-steps--active"></li>
                <li></li>
              </ul>
            </div>
            <button class="btn btn-primary" type="submit">Bevestig</button>
          </div>
        </form>
      </div>
    </article>
  </section>
</template>

<script setup>
import CustomInput from "../components/forms/custom-input.vue";
import CustomSelect from "../components/forms/custom-select.vue";
import CustomSwitch from "../components/forms/custom-switch.vue";
import CustomModal from "../components/custom-modal.vue";
import CustomCheckbox from "../components/forms/custom-check.vue";

import {
  getReservationPage,
} from "@/services/api.ts";
import { ref, onMounted} from "vue";


const reservation = ref([]);
const content = ref([]);
const showModal = ref(false);
const showTermsAndConditions = ref(false);

const acceptTermsAndConditions = () => {
  showModal.value = false;
  showTermsAndConditions.value = true;
}

const getReservationData = async () => {
  let url = "/api/selection/Get";
  try {
    const response = await $axios.get(url);
    reservation.value = response.data.places;
    console.log(reservation.value)
    populateSelect();
  } catch (error) {
    console.error("Error:", error);
  }
};

const getPageContent = async () => {
  try {
    const response = await getReservationPage();
    content.value = response;
    console.log(content.value)
  } catch (error) {
    console.error("Error:", error);
  }
}

onMounted(() => {
  getPageContent();
});
</script>

<style>
@import "~/assets/styles/pages/reservation-form.scss";
</style>
