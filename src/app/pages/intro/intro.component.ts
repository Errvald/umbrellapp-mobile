import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'page-intro',
  templateUrl: './intro.html'
})
export class IntroComponent{

  constructor(
    public navCtrl: NavController,
    public appCtrl: App
    ) {}

  playIntro: boolean = false;
  preIntro: boolean = false;

  ionViewDidLoad() 
  {
    // Navigate to Search page after animation
    setTimeout(() => {
      this.preIntro = true;
      this.playIntro = true;

      setTimeout(() => {
        this.navCtrl.push(SearchComponent,{},{animate: false});
      }, 1600);

    }, 2500);

  }

}