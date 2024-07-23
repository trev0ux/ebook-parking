<template>
  <section class="reservation-form">
    <div class="reservation-form__banner">
      <div class="container">
        <div class="reservation-form__details">
          <!-- <h3>{{ content.name }}</h3> -->
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
                    <custom-select
                      label="Payment Option"
                      id="name"
                      v-bind="$attrs"
                      v-model="quantity"
                      :options="quantityOptions"
                      required
                    />
                    <custom-select
                      label="Payment Option"
                      id="name"
                      v-bind="$attrs"
                      v-model="quantity"
                      :options="quantityOptions"
                      required
                    />
                  </div>
                </div>
                <div class="reservation-form__switch">
                  <p>Betreft sneldienst?</p>
                  <custom-switch
                      id="name"
                    />
                </div>
                <div class="reservation-form__double-select">
                  <p>Veerboot vertrektijd</p>
                  <div>
                    <custom-select
                      label="Payment Option"
                      id="name"
                      v-bind="$attrs"
                      v-model="quantity"
                      :options="quantityOptions"
                      required
                    />
                    <custom-select
                      label="Payment Option"
                      id="name"
                      v-bind="$attrs"
                      v-model="quantity"
                      :options="quantityOptions"
                      required
                    />
                  </div>
                </div>
                <div class="reservation-form__single-select">
                  <p>Veerboot vertrektijd</p>
                  <custom-select
                    label="Payment Option"
                    id="name"
                    v-bind="$attrs"
                    v-model="quantity"
                    :options="quantityOptions"
                    required
                  />
                </div>
              </div>
            </aside>
            <article>
              <div class="reservation-form__card">
                <div class="reservation-form__content-fields">
                  <h4>Boekingsdetails</h4>
                  <p>
                    Voordat we de reservering kunnen bevestigen, hebben we
                    onderstaande gegevens nodig, klik vervolgens op reservering
                    bevestigen.
                  </p>
                  <fieldset>
                    <custom-input
                      label="Member Name"
                      required
                      id="name"
                    ></custom-input>
                    <custom-input
                      label="Member Name"
                      required
                      id="name"
                    ></custom-input>
                    <custom-input
                      label="Member Name"
                      required
                      id="name"
                    ></custom-input>
                    <custom-input
                      label="Member Name"
                      required
                      id="name"
                    ></custom-input>
                    <div>
                      <label class="form-label">Bericht</label>
                      <small>
                        Aanvullende gegevens, tips en/of vragen mag u hier
                        invullen.</small
                      >
                      <textarea
                        rows="4"
                        cols="20"
                        class="form-control"
                      ></textarea>
                    </div>
                    <custom-select
                      label="Payment Option"
                      id="name"
                      v-bind="$attrs"
                      v-model="quantity"
                      :options="quantityOptions"
                      required
                    />
                  </fieldset>
                </div>
              </div>
            </article>
          </section>
          <div class="reservation-form__buttons">
            <NuxtLink class="btn btn-secondary" to="/available-places"
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
</script>

<style>
@import "~/assets/styles/pages/reservation-form.scss";
</style>
