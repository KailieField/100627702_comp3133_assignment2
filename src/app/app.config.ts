import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideApolloClient } from '@apollo/angular'; //<--- not needed for Angular v19, will have to consider Reactive Components in .ts'
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { routes } from './app.routes';


//------------[ APOLLO CLIENT ]------------ **** Mental Note: may have to change localhost

const apolloClient = new ApolloClient({

  uri: 'http://localhost:8081/graphql',
  cache: new InMemoryCache(),

});
export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // provideApolloClient(apolloClient) //<---*** mental note

  ]

};
