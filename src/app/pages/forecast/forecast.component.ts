import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ForecastService } from '../../services/forecast';
import { StorageService } from '../../services/storage';
import { City } from '../../models/city';
import { AppConfig } from '../../app.config';
import { AppService } from '../../services/app';

import { FavoritesComponent } from '../favorites/favorites.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'page-forecast',
  templateUrl: './forecast.html'
})
export class ForecastComponent{

  @ViewChild('slider') slider: Slides;

  city: City ;

  private action:string;
  private data:any;
  private weekdays: boolean = false;

  private icons: any = {
    no: 'heart-outline',
    yes: 'heart'
  };

  private favored: any = {
    status: false,
    icon: this.icons.no
  };

  constructor(
    private navCtrl: NavController,
    private service: ForecastService,
    private navParams: NavParams,
    private storage: StorageService,
    private appSrv: AppService
    ) {}

  ionViewWillEnter() 
  {

    // Page Params
    this.action = this.navParams.get('action');
    this.data = this.navParams.get('data');
    
    // If action is ID
    if(this.action == AppConfig.actions.id)
    {
      // See if ID exists in storage else query by ID
      this.storage.getCity(this.data.id).then(city => {

        if(city && !this.appSrv.dayDifference(city.day)){
          this.city = city;
          this.updateSlider();
        }else{
          this.getCity();
        }
        
      });

      this.getFavoriteStatus();

    }else{
     
     this.getCity();
      
    }

  }
  
  /*
  * Toggle city add to favorites
  * @return void
  */
  toggleFavorite()
  {
  
    if(this.favored.status)
      this.storage.removeFavorite(this.city.id).then(()=>this.setFavoriteStatus(false));
    else
      this.storage.setFavorite(this.city.id,this.city).then(()=>this.setFavoriteStatus(true));

  }
  
  /*
  * Update status for favorite
  * @param status $boolean
  * @return void
  */
  setFavoriteStatus($status:boolean)
  {
    
    this.favored = { 
      status: $status, 
      icon: ($status? this.icons.yes : this.icons.no)
    }

  }

  /*
  * Get status for favorite
  * @return void
  */
  getFavoriteStatus()
  {
    this.storage.getFavorite(this.data.id).then(city => {
      if(city) this.setFavoriteStatus(true);
    });
  }
  
  // Navigate to pages
  showSearchPage()
  {
    this.navCtrl.push(SearchComponent,{},{ animate: false});
  }

  showFavoritesPage()
  {
    this.navCtrl.push(FavoritesComponent,{},{ animate: false});
  }
  
  updateSlider()
  {
      this.weekdays = true;
      this.slider.centeredSlides = true;
      setTimeout(() => {
        this.slider.slideTo(0);
      }, 50);
  }
  
  /*
  * Get City forecast from API
  * @return void
  */
  getCity()
  {
      this.service.getCity(this.action, this.data)
        .subscribe(
          data => {

            this.city = data;
            this.storage.setCity(this.city.id,this.city);
                        
            // Update favorite
            if(this.data.fav_id)
              this.storage.updateFavorite(this.data.fav_id, {city_id: this.city.id});
            
            // Update device location status
            if(this.action == AppConfig.actions.geo)
              this.storage.set(AppConfig.dbKeys.device_location, this.city);

            this.updateSlider();
            this.getFavoriteStatus();
            
          },
          err => console.log(err)
        );
  }

}