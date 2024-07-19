<template>
  <section class="reserve-page">
    <div class="reserve-page__banner">
      <div class="container">
        <div class="reserve-page__details">
          <h3>{{ content.name }}</h3>
          <ol class="breadcrumb">
            <li>
              <a href="#">{{ content.name }}</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <article class="reserve-page__main-content">
      <div class="container">
        <div class="accordion" id="reserveAcordion"  v-if="content && content.properties">
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
          <button class="btn btn-primary" type="submit">Reserveer Nu</button>
        </form>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { addDays, format } from "date-fns";
import CustomAccordion from "../components/custom-accordion.vue";

const { $axios } = useNuxtApp();
const dateRange = ref(new Date());
const content = ref({});
const defaultFormat = "dd-MM-yyyy";

const startDate = computed(() => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
});

const formattedDateRange = computed(() => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    const today = new Date();
    return [
      format(today, defaultFormat),
      format(addDays(today, 1), defaultFormat),
    ];
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

  let url = "/api/parking-availability/Get";

  try {
    this.$router.push({ name: 'AvailablePlaces' });
    await $axios.post(url, bookingData);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getReserveContent = async () => {
  let url = "/umbraco/delivery/api/v2/content/item/reserveer-nu/";

  try {
    const response = await $axios.get(url);
    content.value = response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const setInitialDateRange = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  dateRange.value = [today, tomorrow];
};

onMounted(() => {
  setInitialDateRange();
  getReserveContent();
});
</script>

<style lang="sass">
@import "~/assets/styles/pages/reserve.scss"
</style>
