import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { UmbrellaApp } from './app.component';

// Modules
import { Ng2OrderModule } from 'ng2-order-pipe';

// Components
import { DayComponent } from './components/day/day.component';
import { PlacesComponent } from './components/places/places.component';

// Directives
import { Debounce } from './directives/debounce';
import { WeatherCondition } from './directives/condition';

// Services
import { StorageService } from './services/storage';
import { PlacesService } from './services/places';
import { ForecastService } from './services/forecast';
import { AppService } from './services/app';

// Views
import { IntroComponent } from './pages/intro/intro.component';
import { SearchComponent } from './pages/search/search.component';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

@NgModule({
  declarations: [
    UmbrellaApp,
    IntroComponent,
    SearchComponent,
    FavoritesComponent,
    ForecastComponent,
    DayComponent,
    PlacesComponent,
    Debounce,
    WeatherCondition
  ],
  imports: [
    IonicModule.forRoot(UmbrellaApp),
    Ng2OrderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UmbrellaApp,
    IntroComponent,
    SearchComponent,
    ForecastComponent,
    FavoritesComponent
  ],
  providers: [
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
    StorageService,
    PlacesService,
    ForecastService,
    AppService
    ]
})
export class AppModule {}