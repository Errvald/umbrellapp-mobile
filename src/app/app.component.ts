import { Component } from '@angular/core';
import { Platform,App } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { IntroComponent } from './pages/intro/intro.component';
import { StorageService } from './services/storage';

@Component({
  templateUrl: 'app.html'
})
export class UmbrellaApp {

  public rootPage: any = IntroComponent;
  public navClass: string = 'intro';

  constructor(platform: Platform, storage: StorageService,app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.clearOldCities().then(function(){
         StatusBar.styleDefault();
         Splashscreen.hide();
      });

      // Update view class based on page.
      app.viewWillEnter.subscribe(
        view => {
          this.navClass = this.getPageClass(view.name);
        }
      )
      
    });
  }

  getPageClass(key:string){
    let classes = {
      SearchComponent: "search",
      FavoritesComponent: "favorites",
      ForecastComponent: "forecast",
      IntroComponent: "intro"
    }
    return classes[key];
  }



}
