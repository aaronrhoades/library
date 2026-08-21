import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './auth/auth-service';
import { credentialsInterceptor } from './auth/credentials-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([credentialsInterceptor])
    ),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.checkSession();
    })
  ]
};
