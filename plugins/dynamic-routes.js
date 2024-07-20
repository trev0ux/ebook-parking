// import { defineNuxtPlugin, useRouter } from '#app';
// import { fetchRoutes } from '@/services/api';

// const componentNames = [
//     'reservation',
//     'available-places',
//     'additional-services',
//     'booking-form'
// ];

// export default defineNuxtPlugin(async (nuxtApp) => {
//   const router = useRouter();
//   const routes = await fetchRoutes();

//   const newRoutes = routes.map((route, index) => {
//     const componentName = componentNames[index];

//     if (!componentName) {
//       console.warn(`No component name found for index: ${index}`);
//       return null;
//     }

//     return {
//       name: `route-${index}`, // Optionally, use a unique name for each route
//       path: route.route.path,
//       component: () => import(`~/pages/${componentName}.vue`) // Dynamically import the component
//     };
//   }).filter(route => route !== null); // Filter out null entries

//   // Add dynamic routes to the router
//   newRoutes.forEach(route => {
//     router.addRoute(route);
//   });

//   console.log('Dynamic routes added:', router.getRoutes());
// });
