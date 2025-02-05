// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: 'b9d368bff03d87c7b9ae',
  clientSecret: '5f65b02ff642bf23560f6f73d793b4f1b8387b70',
  redirectUri: 'http://localhost:4200/auth',
  apiUrl: 'https://api.github.com',
  authUrl: 'https://github.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
