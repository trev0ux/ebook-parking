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
        <div class="custom-accordion accordion-item">
          <h4
            class="custom-accordion__header"
            v-if="content && content.properties"
          >
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              {{ content.properties.accordionTitle }}
            </button>
          </h4>
          <div
            id="collapseOne"
            class="accordion-collapse collapse custom-accordion__body"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
            v-if="content && content.properties"
          >
            <div
              class="accordion-body"
              v-html="content.properties.accordionContent.markup"
            ></div>
          </div>
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
            :enable-time-picker="false"
            :format="format"
            locale="de"
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
import { addDays } from "date-fns";
const { $axios } = useNuxtApp();

const dateRange = ref([]);
const content = ref({});
const dateTest = ref([]);

const { $format } = useNuxtApp();

const startDate = computed(() => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
});

const format = ref("dd-MM-yyyy");

const formattedDateRange = computed(() => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    const today = new Date();
    const nextDay = addDays(today, 1);
    dateTest.value = [
      $format(today, "yyyy-MM-dd"),
      $format(nextDay, "yyyy-MM-dd"),
    ];

    return dateTest.value.map((date) => {
      if (!date) return "";
      return $format(new Date(date), "dd-MM-yyyy");
    });
  }

  return dateRange.value.map((date) => {
    if (!date) return "";
    return $format(new Date(date), "dd-MM-yyyy");
  });
});

const submitBooking = async () => {
  let bookingData = {
    arriveDate: dateRange.value[0],
    leaveDate: dateRange.value[1],
  };

  let url = "/api/parking-availability/Get";

  try {
    const response = await $axios.post(url, bookingData);
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
};

const getReserveContent = async () => {
  let url = "/umbraco/delivery/api/v2/content/item/reserveer-nu/";

  try {
    const response = await $axios.get(url);
    content.value = response.data;
    console.log(content.value.properties);
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
