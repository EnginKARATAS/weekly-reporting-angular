// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const origin = "http://10.41.150.82:4000";//backend
const origin = "http://localhost:4000";//window.location.origin;

// const ngUrl = "http://10.41.150.82"
const ngUrl = "http://localhost:4200"
export const environment = {
  production: false,
  apiUrl: origin,
  ngUrl: ngUrl
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames €such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
