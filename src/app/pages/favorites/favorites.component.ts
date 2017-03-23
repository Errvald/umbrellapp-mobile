import { Component } from '@angular/core';
import { App,NavController } from 'ionic-angular';
import { StorageService } from '../../services/storage';
import { Place } from '../../models/places';
import { ForecastComponent } from '../forecast/forecast.component';
import { AppConfig } from '../../app.config';
import { Animations } from '../../shared/animations';

@Component({
  selector: 'page-favorites',
  templateUrl: './favorites.html',
  animations: [
      Animations.fadeInYBottom,
      Animations.fadeInOutX
      ]
})
export class FavoritesComponent {

    private favorites: Place[];
    private toastOpen: boolean = false;
    private toBeRemoved: Place;
    private timeout;

    constructor(
        private navCtrl: NavController,
        private storage: StorageService,
        private appCtrl: App
    ){}

    ionViewWillEnter() 
    {  
        // Get stored favorites
        this.storage.getFavorites().then(favs => {
            if(favs) this.favorites = favs
         } );
    }

    /*
    * Store city to favorites
    * @param favorite $Place
    * @return void
    */
    addToFavorites(favorite)
    {
        this.storage.setFavorite(favorite.id, favorite)
            .then( fav => this.favorites.push(fav));
    }
    
    /*
    * Deletes city from favorites
    * @param fav $Place
    * @return void
    */
    removeFavorite(fav)
    {

        if(this.toastOpen) this.closeToast();

        this.toBeRemoved = fav;
        this.toastOpen = true;
        this.storage.removeFavorite(fav.id).then(() => {
            let index = this.favorites.indexOf(fav);
            this.favorites.splice(index, 1);

            if(fav.city_id)
                this.storage.removeCity(fav.city_id);

            this.timeout = setTimeout(()=>{
                this.toastOpen = false;
                this.toBeRemoved = null;
            }, 5000);

        });


    }
    

    /*
    * Select city to view forecast
    * @param fav $Place
    * @return void
    */
    selectCity(fav)
    {

        let body = {};
        if(fav.city_id){
            body = { 
                action: AppConfig.actions.id, 
                data: { id: fav.city_id, fav_id: fav.id } 
            };

        }else{
            body = {
                action: AppConfig.actions.query, 
                data: { name: fav.name+fav.country, fav_id: fav.id } 
            };

        }

        this.navCtrl.push(ForecastComponent,body,{ animate: false});

    }
    

    /*
    * Undo delete action
    * @return void
    */
    undoAction()
    {

        this.storage.setFavorite(this.toBeRemoved.id, this.toBeRemoved)
            .then( fav => {
                clearTimeout(this.timeout);
                this.toBeRemoved = null;
                this.toastOpen = false;
                this.favorites.push(fav);
            });
    }

    goBack()
    {
        this.navCtrl.pop({ animate: false });
    }

    closeToast()
    {   
        this.toastOpen = false;
        clearTimeout(this.timeout);
    }

}