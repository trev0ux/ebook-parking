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
            <VueDatePicker
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
              focus-start-date
              :week-start="1"
              auto-apply
            />
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
import { ref, computed, onMounted } from "vue";
import { addDays, format } from "date-fns";
import CustomAccordion from "../components/custom-accordion.vue";
import { getReservePage, getReservationData, postReserveData } from "@/services/api.ts";
import { useRouter } from "vue-router";
import Banner from "../components/banner.vue";
import { useRouteStore } from "@/stores/routeStore";
import { handleApiError } from '@/utils/errorUtils'

const router = useRouter();
const dateRange = ref(new Date());
const content = ref({});
const defaultFormat = "dd-MM-yyyy";
const errorMessage = ref("");
const isSubmitting = ref(false);
const date = ref([]);
const routeStore = useRouteStore();
const preloader = ref(false);

const contentTypeRoutes = computed(() =>
  routeStore.getRoutesByContentType("availablePlaces")
);

const startDate = computed(() => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
});

const isArrivalPast = computed(() => isDatePast(dateRange.value[0]));
const isDeparturePast = computed(() => isDatePast(dateRange.value[1]));

const isDatePast = (dateString) => {
  const now = new Date();
  const dateObj = new Date(dateString);
  return dateObj < now;
};

const formattedDateRange = computed(() => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    const today = new Date();
    return [format(today, defaultFormat), format(addDays(today, 1), defaultFormat)];
  }
  return dateRange.value.map((date) =>
    date ? format(new Date(date), defaultFormat) : ""
  );
});

const submitBooking = async () => {
  let bookingData = {
    arriveDate: dateRange.value[0],
    leaveDate: dateRange.value[1],
  };
  const availablePlacesRoute = contentTypeRoutes.value[0];
  isSubmitting.value = true;

  try {
    localStorage.setItem("dateRange", JSON.stringify(dateRange.value));
    await postReserveData(bookingData);
    router.push(availablePlacesRoute.path);
  } catch (error) {
    handleApiError(error, null, errorMessage)
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
    handleApiError(error, null, errorMessage)
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
      dateRange.value = [date.value.arrivelDate, date.value.departureDate];
      localStorage.setItem("dateRange", JSON.stringify(dateRange.value));
    }
  } catch (error) {
    console.log(error)
  }
};

const setInitialDateRange = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  dateRange.value = [today, tomorrow];
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
