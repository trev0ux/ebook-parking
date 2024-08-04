<template>
    <section class="confirmed-cancelation">
        <Banner :title="content.name" hide-breadcrumb></Banner>
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
import { handleApiError } from '@/utils/errorUtils'


const content = ref([])

const getPageContent = async () => {
  try {
    const response = await getCancelationConfirmedPage();
    content.value = response;
  } catch (error) {
    handleApiError(error, null, errorMessage)
  }
};

onMounted(() => {
  getPageContent();
});

</script>

<style scoped>
@import "~/assets/styles/pages/confirmed-cancelation.scss";
</style>
