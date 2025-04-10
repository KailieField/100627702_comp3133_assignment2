import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideApollo} from 'apollo-angular'; //<--- not needed for Angular v19, will have to consider Reactive Components in .ts'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { routes } from './app.routes';


//------------[ APOLLO CLIENT ]------------ **** Mental Note: may have to change localhost

const apolloClientOptions: ApolloClientOptions<any> = {

  uri: 'https//100627702-comp3133-assignment2-50sv.vercel.app/graphql',
  cache: new InMemoryCache(),

};

export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideApollo(() => apolloClientOptions), //<---*** mental note

  ]

};
