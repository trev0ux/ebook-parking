import { useNuxtApp } from "#app";


export const fetchRoutes = async () => {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.get('/umbraco/delivery/api/v2/content?fetch=descendants%3A%2F&skip=0&take=10&fields=properties%5Burl%5D');
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
}

export const fetchPageData = async (endpoint: string, params: object = {}) => {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.get(endpoint, { params });
    console.log($axios);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const postPageData = async (endpoint: string, data: object = {}) => {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};


export const getReservePage = () => fetchPageData('/umbraco/delivery/api/v2/content/item/reserveer-nu/');

export const postReserveData = (data: any) => postPageData('/api/parking-availability/Get', data);

export const getAvailablePlacesPage = () => fetchPageData('/umbraco/delivery/api/v2/content/item/reserveer-nu/beschikbare-plaatsen/');

export const postAvailablePlacesData = (data: any) => postPageData('/api/selection/Post', data);

export const getAdditionalServicesPage = () => fetchPageData('/umbraco/delivery/api/v2/content/item/reserveer-nu/beschikbare-plaatsen/aanvullende-diensten/');

export const getServices = () => fetchPageData('/api/services/Get');

export const postAdditionalServicesData = (data: any) => postPageData('/api/selection/Price', data);

export const getReservationPage = () => fetchPageData('/umbraco/delivery/api/v2/content/item/reserveer-nu/beschikbare-plaatsen/aanvullende-diensten/uw-gegevens/')