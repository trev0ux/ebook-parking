<template>
  <section class="reservation-form">
    <div class="preloader" v-if="preloader">
      <div class="preloader__image"></div>
    </div>
    <div v-else>
      <Banner :title="content.name"></Banner>
      <article class="reservation-form__main-content">
        <div class="container">
          <form @submit.prevent="submitReservation">
            <section class="reservation-form__form">
              <aside>
                <div class="reservation-form__card">
                  <div class="reservation-form__summary-header">
                    <h4>Boekingsgegevens</h4>
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
                        <h5
                          :class="
                            !item.fixedPrice && item.serviceId ? 'reservation-form--not-fixed-price' : ''
                          "
                        >
                          {{ item.name }}
                        </h5>
                        <p
                          :class="
                          !item.fixedPrice && item.serviceId ? 'reservation-form--not-fixed-price' : ''
                          "
                        >
                          € {{ item.price.toFixed(2) }}
                          <button
                            type="button"
                            class="btn p-0"
                            v-if="!item.fixedPrice && item.serviceId"
                            v-bs-tooltip:right="
                              'Deze dienst heeft geen vaste prijs. De prijs wordt berekend en in rekening gebracht bij het afrekenen.'
                            "
                          >
                            <Icon name="TooltipIcon"></Icon>
                          </button>
                        </p>
                        <p>{{ item.quantity }}</p>
                        <p
                          :class="
                          !item.fixedPrice && item.serviceId ? 'reservation-form--not-fixed-price' : ''
                          "
                        >
                          € {{ item.total.toFixed(2) }}
                        </p>
                      </div>
                    </article>
                    <div v-if="reservation.totalCostInlcudingVAT">
                      <h5>Totale kosten inclusief BTW:</h5>
                      <h6>€ {{ reservation.totalCostInlcudingVAT.toFixed(2) }}</h6>
                    </div>
                  </section>
                </div>
                <div class="reservation-form__card">
                  <h4>Routegegevens</h4>
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
                        label="Lidnaam"
                        @input="updateField('MemberName', $event.target.value)"
                        :error-message="getFieldError('MemberName')"
                        id="MemberName"
                        required
                        v-model="reservation.memberName"
                      ></custom-input>
                      <custom-input
                        label="Nummerplaat"
                        id="LicensePlate"
                        v-model="reservation.licensePlate"
                      ></custom-input>
                      <custom-input
                        label="Telefoon"
                        id="Telefoon"
                        v-bind="$attrs"
                        type="tel"
                        @input="updateField('PhoneNumber', $event.target.value)"
                        v-model="reservation.phoneNumber"
                        required
                        :error-message="getFieldError('PhoneNumber')"
                      ></custom-input>
                      <custom-input
                        label="E-mail"
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
                        label="Betalingsmogelijkheid"
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
                label="Ik accepteer de algemene voorwaarden"
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
                v-if="backRoute"
                class="btn btn-outline-secondary"
                :to="backRoute[0]"
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
    </div>
  </section>
</template>

<script setup>
import CustomInput from "../components/forms/custom-input.vue";
import CustomSelect from "../components/forms/custom-select.vue";
import CustomSwitch from "../components/forms/custom-switch.vue";
import CustomModal from "../components/custom-modal.vue";
import CustomCheckbox from "../components/forms/custom-check.vue";
import { useRouter } from "vue-router";
import Banner from "../components/banner.vue";
import { useRouteStore } from "@/stores/routeStore";
import { handleApiError } from "@/utils/errorUtils";
import { formatDate } from "@/utils/dateUtils";

import {
  getReservationPage,
  postReservationFormData,
  getReservationData,
} from "@/services/api.ts";
import { ref, onMounted, computed, watch } from "vue";

const reservation = ref([]);
const content = ref([]);
const showModal = ref(false);
const showTermsAndConditions = ref(false);
const errorMessage = ref("");
const isFastFerry = ref("No");
const validationErrors = ref([]);
const router = useRouter();
const isSubmitting = ref(false);
const routeStore = useRouteStore();
const contentTypeRoutes = computed(() =>
  routeStore.getRoutesByContentType("reservationComplete")
);

const contentPaymentRoutes = computed(() =>
  routeStore.getRoutesByContentType("bookingPaymentPage")
);
const paymentOptionString = ref(null);

const preloader = ref(false);

const backRoute = computed(() => routeStore.getRoutesByContentType("additionalServices"));

watch(() => reservation.value.paymentOption, (newVal) => {
  if (newVal != null) {
    if (newVal === 0) {
      paymentOptionString.value = "2";
    } else {
      paymentOptionString.value = newVal.toString();
    }
  }
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


const getData = async () => {
  try {
    const response = await getReservationData();
    reservation.value = response;

    if (reservation.value.memberId == null) {
      reservation.value.memberName = "";
    }

    reservation.value.paymentOptionsList.shift();
  } catch (error) {
    handleApiError(error, null, errorMessage);
  } finally {
    preloader.value = false;
  }
};

const getPageContent = async () => {
  try {
    const response = await getReservationPage();
    content.value = response;
  } catch (error) {
    handleApiError(error, errorMessage);
  }
};

const submitReservation = async () => {
  reservation.value.termsAndConditions = true;
  showTermsAndConditions.value = true;
  showModal.value = false;
  isSubmitting.value = true;
  const reservationCompleteRoute = contentTypeRoutes.value[0];
  const paymentRoute = contentPaymentRoutes.value[0];

  try {
    await postReservationFormData(postData.value);
    if(paymentOptionString.value == "2") {
      router.push(paymentRoute.path);
    } else {
      router.push(reservationCompleteRoute.path);
    }
  } catch (error) {
    handleApiError(error, validationErrors, errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  preloader.value = true;
  getPageContent();
  getData();
  routeStore.initializeRoutes();
});
</script>

<style scoped>
@import "~/assets/styles/pages/reservation-form.scss";
</style>
