// import { defineNuxtPlugin, useRouter } from '#app';
// import { fetchRoutes } from '@/services/api';

// const componentNames = [
//     'reserving',
//     'available-places',
//     'additional-services',
//     'booking-form'
// ];

// export default defineNuxtPlugin(async (nuxtApp) => {
//   const router = useRouter();
//   const routes = await fetchRoutes();

//   console.log(router.getRoutes());

//   router.getRoutes().forEach((route, i)=>{
//     router.removeRoute(route.name)
//  })
//  console.log(router.getRoutes());


//   const newRoutes = routes.map((route, index) => {
//     const componentName = componentNames[index];

//     if (!componentName) {
//       console.warn(`No component name found for index: ${index}`);
//       return null;
//     }

//     return {
//       name: `${componentName}`, // Optionally, use a unique name for each route
//       path: index == 0 ? '/' : route.route.path,
//       component: () => import(`@/pages/${componentName}.vue`), // Dynamically import the component
//       redirect: `/${componentName}`
//     };
//   });
//   // Add dynamic routes to the router
  
//   newRoutes.forEach(route => {
//     router.addRoute(route);
//   });

//   console.log(newRoutes);

//   console.log('Dynamic routes added:', router.getRoutes());
// });
