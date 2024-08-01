<template>
    <section class="confirmed-cancelation">
        <Banner :title="content.name"></Banner>
        <div class="container">
            <article class="confirmed-cancelation__content" v-if="content.properties">
                <h2>{{ content.properties.topMessage }}</h2>
                <p>{{ content.properties.resultMessage }}</p>
                <div v-html="content.properties.donation.markup">
                </div>
            </article>      
        </div>
    </section>
</template>
<script setup>
import Banner from "../components/banner.vue";
import {
  getCancelationConfirmedPage,
} from "@/services/api.ts";
import { ref, onMounted } from "vue";


const content = ref([])

const getPageContent = async () => {
  try {
    const response = await getCancelationConfirmedPage();
    content.value = response;
    console.log(content.value);
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  getPageContent();
});

</script>

<style scoped>
@import "~/assets/styles/pages/confirmed-cancelation.scss";
</style>
