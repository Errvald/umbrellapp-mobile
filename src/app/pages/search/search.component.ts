import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { AppConfig } from '../../app.config';
import { Geolocation } from 'ionic-native';
import { ForecastComponent } from '../forecast/forecast.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { StorageService } from '../../services/storage';
import { City } from '../../models/city';
import { Animations } from '../../shared/animations';

@Component({
  selector: 'page-search',
  templateUrl: './search.html',
  animations: [
    Animations.fadeInX,
    Animations.fadeOutX
  ]
})
export class SearchComponent{

  isIntroEnd: boolean = false;
  isLocated: boolean = false;
  locatedCity: City;
  tracking: boolean = false;
  clearing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    private storage: StorageService
    ) {}

  ionViewWillEnter() 
  {

    // Check if we already know device location 
    this.storage.get(AppConfig.dbKeys.device_location)
    .then(val => {
      if(val){
        this.isLocated = true;
        this.locatedCity = val;
      } 
    });

  }

  showFavoritesPage()
  {
    this.navCtrl.push(FavoritesComponent,{},{animate: false});
  }
  

  /*
  * Select city to view forecast
  * @param place $Place
  * @return void
  */
  selectCity(place)
  {
    this.appCtrl.getRootNav().push(ForecastComponent,{
      action: AppConfig.actions.query,
      data: {
        name: place.getFullName()
      }
    },
    { animate: false }
    );
  }
  
  /*
  * Select device location to view forecast
  * @return void
  */
  getLocatedCity(){
    this.appCtrl.getRootNav().push(ForecastComponent,{
      action: AppConfig.actions.id,
      data: {
        id: this.locatedCity.id
      }
    },{ animate: false });
  }

  /*
  * Track device location to view forecast
  * @return void
  */
  getMyLocation()
  {

    this.tracking = true;

    Geolocation.getCurrentPosition()
      .then((resp) => {
          this.appCtrl.getRootNav().push(
            ForecastComponent,
            {
              action: AppConfig.actions.geo,
              data: {
                lat: resp.coords.latitude,
                lon: resp.coords.longitude
              }
            },
            { animate: false }
          );
      }).catch((error) => {
          this.tracking = false;
      });

  }

  clearLocation()
  {
    this.clearing = true;
    
    this.storage.remove(AppConfig.dbKeys.device_location).then(() => {
      setTimeout(()=>{ 
        this.isLocated = false;
        this.clearing = false;
        this.locatedCity = null;
      }, 300);
    });

  }

}