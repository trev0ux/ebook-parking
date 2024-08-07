import axios from 'axios'


export const fetchRoutes = async (path) => {

  try {
    const response = await axios.get(`${path}/umbraco/delivery/api/v2/content?fetch=descendants%3A%2F&skip=0&take=10&fields=properties%5Burl%5D`, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data.items.map((item) => ({
      name: item.name,
      path: item.route.path,
      contentType: item.contentType
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}


export const staticRoutes = {
  'reservationPage': '~/pages/index.vue',
  'availablePlaces': '~/pages/available-places.vue',
  'additionalServices': '~/pages/additional-services.vue',
  'reservationComplete': '~/pages/thank-you.vue',
  'bookingFormPage': '~/pages/reservation-form.vue',
  'cancelReservation': '~/pages/cancel-reservation.vue',
  'canceledReservation': '~/pages/confirmed-cancelation.vue',
  'bookingPaymentPage': '~/pages/payment.vue'
};