<template>
  <section class="reserve-page">
    <div class="reserve-page__banner">
      <div class="container">
        <div class="reserve-page__details">
          <h3>Reserveer Nu!</h3>
          <ol class="breadcrumb">
            <li>
              <a href="#">Reserveer nu!</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <article class="reserve-page__main-content">
      <div class="container">
        <div class="custom-accordion accordion-item">
          <h4 class="custom-accordion__header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Belangrijke Informatie
            </button>
          </h4>
          <div
            id="collapseOne"
            class="accordion-collapse collapse custom-accordion__body"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <p>U kunt reserveren tot ca 1 jaar vooruit!</p>
              <p>
                Onze buitenplaatsen zijn niet meer te reserveren. Deze worden
                vanaf heden gebruikt voor jaarplaatsen en zelfservice.
              </p>
            </div>
          </div>
        </div>
        <form class="reserve-page__calendar">
          <div class="reserve-page__date-selected">
            <p>Wanneer wil je je auto parkeren?</p>
            <div>
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
import { useNuxtApp } from '#app';
import { addDays } from 'date-fns';

const dateRange = ref([]);

const { $format } = useNuxtApp();

const startDate = computed(() => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
})

const format = "dd-MM-yyyy";


const formattedDateRange = computed(() => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    return []
  }
  
  return dateRange.value.map(date => {
    if (!date) return ''
    return $format(new Date(date), 'dd-MM-yyyy')
  })
})

const setInitialDateRange = () => {
  const today = new Date()
  const tomorrow = addDays(today, 1)
  dateRange.value = [today, tomorrow]
}

onMounted(setInitialDateRange);

</script>

<style lang="sass">
@import "~/assets/styles/pages/reserve.scss"
</style>
