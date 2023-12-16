import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.route';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
  ]
});