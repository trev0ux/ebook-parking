<template>
  <section class="reservation-form">
    <Banner :title="content.name"></Banner>
    <article class="reservation-form__main-content">
      <div class="container">
        <form @submit.prevent="submitReservation">
          <section class="reservation-form__form">
            <aside>
              <div class="reservation-form__card">
                <div class="reservation-form__summary-header">
                  <h4>Boekingsdetails</h4>
                  <div>
                    <p>Aankomstdatum:</p>
                    <p>{{ formatDate(reservation.arrivelDate) }}</p>
                  </div>
                  <div>
                    <p>Vertrekdatum:</p>
                    <p>{{ formatDate(reservation.departureDate) }}</p>
                  </div>
                </div>
                <section class="reservation-form__summary-details">
                  <header>
                    <h5>Diensten</h5>
                    <h5>Evalueer</h5>
                    <h5>Aantal stuks</h5>
                    <h5>Totaal</h5>
                  </header>
                  <article
                    v-for="(item, index) in reservation.invoiceDetails"
                    :key="index"
                  >
                    <div>
                      <h5>{{ item.name }}</h5>
                      <p>€ {{ item.price.toFixed(2) }}</p>
                      <p>{{ item.quantity }}</p>
                      <p>€ {{ item.total.toFixed(2) }}</p>
                    </div>
                  </article>
                  <div v-if="reservation.totalCostInlcudingVAT">
                    <h5>Total Cost Including VAT:</h5>
                    <h6>€ {{ reservation.totalCostInlcudingVAT.toFixed(2) }}</h6>
                  </div>
                </section>
              </div>
              <div class="reservation-form__card">
                <h4>Boekingsdetails</h4>
                <p>
                  Voordat we de reservering kunnen bevestigen, hebben we onderstaande
                  gegevens nodig, klik vervolgens op reservering bevestigen.
                </p>
                <div class="reservation-form__double-select">
                  <p>Veerboot vertrektijd<span class="required">*</span></p>

                  <div>
                    <custom-select
                      aria-label="Hour"
                      id="name"
                      v-bind="$attrs"
                      v-model="reservation.ferryDepartureHour"
                      :options="populateSelect(reservation.ferryHours)"
                      @change="updateField('FerryDepartureHour', $event.target.value)"
                      required
                    />
                    <custom-select
                      aria-label="Min"
                      id="name"
                      v-bind="$attrs"
                      v-model="reservation.ferryDepartureMinutes"
                      :options="populateSelect(reservation.ferryMinutes)"
                      required
                    />
                    <div
                      v-if="hasFieldError('FerryDepartureHour')"
                      class="invalid-feedback d-block"
                    >
                      {{ getFieldError("FerryDepartureHour") }}
                    </div>
                  </div>
                </div>
                <div class="reservation-form__switch">
                  <p>Betreft sneldienst?</p>
                  <div>
                    <custom-switch
                      id="name"
                      v-model="reservation.isFastFerry"
                      @valueChanged="handleFastFerry"
                    />
                    <span>{{ isFastFerry }}</span>
                  </div>
                </div>
                <div class="reservation-form__double-select">
                  <p>Veerboot vertrektijd<span class="required">*</span></p>
                  <div>
                    <custom-select
                      aria-label="Hours"
                      id="name"
                      v-bind="$attrs"
                      @change="updateField('FerryReturnHour', $event.target.value)"
                      v-model="reservation.ferryReturnHour"
                      :options="populateSelect(reservation.ferryHours)"
                    />
                    <custom-select
                      aria-label="Minutes"
                      id="name"
                      v-bind="$attrs"
                      v-model="reservation.ferryReturnMinutes"
                      :options="populateSelect(reservation.ferryMinutes)"
                    />
                    <div
                      v-if="hasFieldError('FerryReturnHour')"
                      class="invalid-feedback d-block"
                    >
                      {{ getFieldError("FerryReturnHour") }}
                    </div>
                  </div>
                </div>
                <div class="reservation-form__single-select">
                  <p>Veerboot vertrektijd<span class="required">*</span></p>
                  <div>
                    <custom-select
                      aria-label="Payment Option"
                      id="name"
                      v-bind="$attrs"
                      @change="updateField('FerryReturn', $event.target.value)"
                      v-model="reservation.ferryReturn"
                      :options="populateSelect(reservation.ferries)"
                    />
                    <div
                      v-if="hasFieldError('FerryReturn')"
                      class="invalid-feedback d-block"
                    >
                      {{ getFieldError("FerryReturn") }}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <article>
              <div class="reservation-form__card">
                <div class="reservation-form__content-fields">
                  <h4 v-if="content.properties">
                    {{ content.properties.titleFerryForm }}
                  </h4>
                  <p v-if="content.properties">
                    {{ content.properties.descriptionFerryForm }}
                  </p>
                  <fieldset>
                    <custom-input
                      label="MemberName"
                      @input="updateField('MemberName', $event.target.value)"
                      :error-message="getFieldError('MemberName')"
                      id="MemberName"
                      required
                      v-model="reservation.memberName"
                    ></custom-input>
                    <custom-input
                      label="LicensePlate"
                      id="LicensePlate"
                      v-model="reservation.licensePlate"
                    ></custom-input>
                    <custom-input
                      label="Telefoon"
                      id="Telefoon"
                      @input="updateField('PhoneNumber', $event.target.value)"
                      v-model="reservation.phoneNumber"
                      required
                      :error-message="getFieldError('PhoneNumber')"
                    ></custom-input>
                    <custom-input
                      label="Email"
                      id="Email"
                      @input="updateField('Email', $event.target.value)"
                      required
                      v-model="reservation.email"
                      :error-message="getFieldError('Email')"
                    ></custom-input>
                    <div>
                      <label class="form-label" for="bericht">Bericht</label>
                      <small>
                        Aanvullende gegevens, tips en/of vragen mag u hier
                        invullen.</small
                      >
                      <textarea
                        rows="4"
                        cols="20"
                        id="bericht"
                        class="form-control"
                        v-model="reservation.message"
                      ></textarea>
                    </div>
                    <custom-select
                      label="Payment Option"
                      id="name"
                      v-bind="$attrs"
                      v-model="paymentOptionString"
                      :options="populateSelect(reservation.paymentOptionsList)"
                    />
                  </fieldset>
                </div>
              </div>
            </article>
          </section>
          <div class="reservation-form__terms-and-conditions">
            <p>
              Uw reservering wordt direct in het systeem geplaatst, tevens ontvangt u
              direct een reserveringsbevestiging op het door u ingevoerde e-mailadres!
            </p>
            <button @click="showModal = true" class="btn btn-link">Voorwaarden</button>
            <custom-checkbox
              v-if="showTermsAndConditions"
              v-model="reservation.termsAndConditions"
              label="I Accept the Terms and Conditions"
              v-bind="$attrs"
              id="terms-and-conditions"
            ></custom-checkbox>
            <div class="invalid-feedback text-center d-block mt-3" v-if="errorMessage">
              {{ errorMessage }}
            </div>
          </div>
          <custom-modal
            v-if="showModal"
            @close="showModal = false"
            :title="content.properties.modelTitle"
          >
            <template #body>
              <div v-html="content.properties.modelText.markup"></div>
            </template>
            <template #footer>
              <button type="submit" class="btn btn-primary">IK GA AKKOORD</button>
            </template>
          </custom-modal>
          <div class="reservation-form__buttons">
            <NuxtLink
              class="btn btn-outline-secondary"
              to="/reserveer-nu/beschikbare-plaatsen/aanvullende-diensten/"
              >Vorige</NuxtLink
            >
            <div>
              <ul class="progress-steps">
                <li class="progress-steps--previous"></li>
                <li class="progress-steps--previous"></li>
                <li class="progress-steps--previous"></li>
                <li class="progress-steps--active"></li>
                <li></li>
              </ul>
            </div>
            <button
              class="btn btn-secondary"
              type="button"
              @click="showModal = true"
              :disabled="isSubmitting"
            >
              Bevestig
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
import CustomInput from "../components/forms/custom-input.vue";
import CustomSelect from "../components/forms/custom-select.vue";
import CustomSwitch from "../components/forms/custom-switch.vue";
import CustomModal from "../components/custom-modal.vue";
import CustomCheckbox from "../components/forms/custom-check.vue";
import { format } from "date-fns";
import { useRouter } from "vue-router";
import Banner from "../components/banner.vue";

import {
  getReservationPage,
  postReservationFormData,
  getReservationData,
} from "@/services/api.ts";
import { ref, onMounted, computed } from "vue";

const reservation = ref([]);
const content = ref([]);
const showModal = ref(false);
const showTermsAndConditions = ref(false);
const errorMessage = ref("");
const isFastFerry = ref("No");
const validationErrors = ref([]);
const router = useRouter();
const isSubmitting = ref(false);

const paymentOptionString = computed(() => {
  return reservation.value.paymentOption != null
    ? reservation.value.paymentOption === 0
      ? ""
      : reservation.value.paymentOption.toString()
    : "";
});

const postData = computed(() => {
  if (!reservation.value) return null;

  const selectedFerry = reservation.value.ferries.find(
    (ferry) => ferry.value === reservation.value.ferryReturn?.toString()
  );

  const selectedPayment = reservation.value.paymentOptionsList.find(
    (pay) => pay.value === reservation.value.paymentOption?.toString()
  );
  return {
    invoiceDetails: reservation.value.invoiceDetails.map((item) => ({
      reservationItemId: item.reservationItemId,
      serviceId: item.serviceId || 0,
      rateItemId: item.rateItemId,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      days: item.days || 1,
    })),
    memberId: reservation.value.memberId || 0,
    memberName: reservation.value.memberName,
    phoneNumber: reservation.value.phoneNumber,
    email: reservation.value.email || "",
    licensePlate: reservation.value.licensePlate || "",
    message: reservation.value.message,
    termsAndConditions: reservation.value.termsAndConditions,
    ferryReturn: parseInt(reservation.value.ferryReturn) || null,
    ferries: selectedFerry
      ? [
          {
            text: selectedFerry.text,
            value: selectedFerry.value,
            selected: true,
          },
        ]
      : [],
    isFastFerry: reservation.value.isFastFerry,
    ferryDepartureHour: parseInt(reservation.value.ferryDepartureHour) || 0,
    ferryDepartureMinutes: parseInt(reservation.value.ferryDepartureMinutes) || 0,
    ferryReturnHour: parseInt(reservation.value.ferryReturnHour) || 0,
    ferryReturnMinutes: parseInt(reservation.value.ferryReturnMinutes) || 0,
    paymentOption: parseInt(reservation.value.paymentOption),
    paymentOptionsList: selectedPayment
      ? [
          {
            text: selectedPayment.text,
            value: selectedPayment.value,
            selected: true,
          },
        ]
      : [],
    numberOfPlaces: parseInt(reservation.value.numberOfPlaces),
    totalCostInlcudingVAT: parseInt(reservation.value.totalCostInlcudingVAT),
    reservationId: reservation.value.reservationId,
    departureDate: reservation.value.departureDate,
    arrivelDate: reservation.value.arrivelDate,
    payNow: true,
  };
});

const handleFastFerry = (value) => {
  isFastFerry.value = value;
};

const hasFieldError = (fieldName) => {
  return validationErrors.value && validationErrors.value[fieldName];
};

const getFieldError = (fieldName) => {
  return hasFieldError(fieldName) ? validationErrors.value[fieldName][0] : "";
};

const clearValidationIfPopulated = (fieldName, fieldValue) => {
  if (hasFieldError(fieldName) && fieldValue) {
    delete validationErrors.value[fieldName];
  }
};

const updateField = (fieldName, value) => {
  reservation[fieldName] = value;

  clearValidationIfPopulated(fieldName, value);
};

const populateSelect = (arr) => {
  if (!arr) {
    return [];
  }

  let options = [];

  options = arr.map((i) => ({
    value: i.value,
    label: i.text,
  }));

  return options;
};

function formatDate(inputDate) {
  const defaultFormat = "dd-MM-yyyy";

  if (!inputDate) {
    return format(new Date(), defaultFormat);
  }

  return format(new Date(inputDate), defaultFormat);
}

const getData = async () => {
  try {
    const response = await getReservationData();
    reservation.value = response;

    if (reservation.value.memberId == null) {
      reservation.value.memberName = "";
    }

  } catch (error) {
    console.error("Error:", error);
  }
};

const getPageContent = async () => {
  try {
    const response = await getReservationPage();
    content.value = response;
    console.log(content.value);
  } catch (error) {
    console.error("Error:", error);
  }
};

const submitReservation = async () => {
  reservation.value.termsAndConditions = true;
  showTermsAndConditions.value = true;
  showModal.value = false;
  isSubmitting.value = true;

  try {
    await postReservationFormData(postData.value);
    router.push(
      "/reserveer-nu/beschikbare-plaatsen/aanvullende-diensten/uw-gegevens/uw-reservering-is-bevestigd/"
    );
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        validationErrors.value = error.response.data.errors;
      } else {
        if (error.title) {
          errorMessage.value = error.title;
        } else {
          errorMessage.value = error.response.data[""][0];
        }
        console.error("An error occurred:", error);
      }
    } else {
      console.error("An error occurred:", error);
    }
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  getPageContent();
  getData();
});
</script>

<style scoped>
@import "~/assets/styles/pages/reservation-form.scss";
</style>
