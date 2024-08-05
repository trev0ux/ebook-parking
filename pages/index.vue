<template>
  <section class="reserve-page">
    <div class="preloader" v-if="preloader">
      <div class="preloader__image"></div>
    </div>
    <div v-else>
      <Banner :title="content.name"></Banner>
      <article class="reserve-page__main-content">
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
          <form class="reserve-page__calendar" @submit.prevent="submitBooking">
            <div class="reserve-page__date-selected">
              <div
                v-html="content.properties.calendarTitle.markup"
                v-if="content && content.properties"
              ></div>
              <div class="reserve-page__date-field">
                <div>{{ formattedDateRange[0] }}</div>
                <div>{{ formattedDateRange[1] }}</div>
              </div>
            </div>
            <VDatePicker
              v-model.range="dateRange"
              :rows="2"
              locale="nl"
              :attributes="attributes"
              :masks="{ input: defaultFormat }"
            />
            <!-- <VueDatePicker
              v-model="dateRange"
              range
              inline
              model-auto
              locale="nl"
              :enable-time-picker="false"
              :format="defaultFormat"
              :preview-format="defaultFormat"
              :multi-calendars="{ count: 2 }"
              :start-date="startDate"
              :week-start="1"
              auto-apply
              :is-mobile="true"
              teleport-to="body"
              :z-index="9999"
            /> -->
            <div class="invalid-feedback text-center d-block mt-3" v-if="errorMessage">
              {{ errorMessage }}
            </div>
            <button class="btn btn-secondary" type="submit" :disabled="isSubmitting">
              Reserveer Nu
              <span
                v-if="isSubmitting"
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </form>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { addDays, format } from "date-fns";
import CustomAccordion from "../components/custom-accordion.vue";
import { getReservePage, getReservationData, postReserveData } from "@/services/api.ts";
import { useRouter } from "vue-router";
import Banner from "../components/banner.vue";
import { useRouteStore } from "@/stores/routeStore";
import { handleApiError } from "@/utils/errorUtils";
import { formatDateRange, defaultFormat } from "@/utils/dateUtils";

const router = useRouter();
const dateRange = ref({});
const content = ref({});
const errorMessage = ref("");
const isSubmitting = ref(false);
const date = ref([]);
const routeStore = useRouteStore();
const preloader = ref(false);

const attributes = computed(() => [
  {
    key: "start",
    highlight: true,
    dates: new Date(),
  },
  {
    key: "start-date",
    highlight: {
      fillMode: "solid",
      contentClass: "start-date",
    },
    dates: dateRange.value.start,
  },
  {
    key: "end-date",
    highlight: {
      fillMode: "solid",
      contentClass: "end-date",
    },
    dates: dateRange.value.end,
  },
]);

const contentTypeRoutes = computed(() =>
  routeStore.getRoutesByContentType("availablePlaces")
);

const isArrivalPast = computed(() => isDatePast(dateRange.value.start));
const isDeparturePast = computed(() => isDatePast(dateRange.value.end));

const isDatePast = (dateString) => {
  const now = new Date();
  const dateObj = new Date(dateString);
  return dateObj < now;
};

const formattedDateRange = computed(() => {
  return formatDateRange(dateRange.value);
});

const submitBooking = async () => {
  let bookingData = {
    arriveDate: dateRange.value.start,
    leaveDate: dateRange.value.end,
  };
  const availablePlacesRoute = contentTypeRoutes.value[0];
  isSubmitting.value = true;

  try {
    localStorage.setItem("dateRange", JSON.stringify(dateRange.value));
    await postReserveData(bookingData);
    router.push(availablePlacesRoute.path);
  } catch (error) {
    handleApiError(error, null, errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

const getReserveContent = async () => {
  preloader.value = true;
  try {
    const response = await getReservePage();
    content.value = response;
  } catch (error) {
    handleApiError(error, null, errorMessage);
  } finally {
    preloader.value = false;
  }
};

const getReserveDate = async () => {
  const storedDateRange = localStorage.getItem("dateRange");

  if (!storedDateRange) {
    return;
  }

  try {
    const response = await getReservationData();
    date.value = response;

    const isEntireStayPast = computed(() => isArrivalPast.value && isDeparturePast.value);
    if (isEntireStayPast && date.value.arrivelDate && date.value.departureDate) {
      dateRange.value = {start: date.value.arrivelDate, end: date.value.departureDate};
      localStorage.setItem("dateRange", JSON.stringify(dateRange.value));
    }
  } catch (error) {
    console.log(error);
  }
};

const setInitialDateRange = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  dateRange.value = {start: today, end: tomorrow};
};

onMounted(async () => {
  setInitialDateRange();
  getReserveContent();
  getReserveDate();
  await routeStore.initializeRoutes();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/reserve.scss"
</style>
