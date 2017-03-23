import { Component,EventEmitter } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';
import { PlacesService } from '../../services/places';
import { Place } from '../../models/places';
import { Animations } from '../../shared/animations';

@Component({
  selector: 'place-input',
  templateUrl: './places.html',
  animations: [Animations.fadeInX]
})
export class PlacesComponent{

  private places: Place[] = [];
  place: string;
  isDone: boolean = false;
  isLoading: boolean = false;
  private minChars: number = 3;

  @Output() func: EventEmitter<any> = new EventEmitter();

  constructor(public service: PlacesService) {}

  search()
  {

      this.isLoading = true;
      
      if(this.place.length < this.minChars){
        this.places = [];
        this.isDone = false;
        this.isLoading = false;
      }else{
        
        this.service.search(this.place)
        .subscribe(data => {

            this.isLoading = false;

            if(data.length > 0) this.isDone = true;

            this.places = [];
            
            // Stagger effect
            for (let i = 0; i < data.length; i++) {
                setTimeout(() => { 
                  this.places.push(data[i]);
                 }, 50 * i);
            }

        }, err => console.log(err));
      }

  }

  cancelSearch()
  {
      this.places = [];
      this.place = '';
      this.isDone = false;
  }

  selectPlace(place)
  {
      this.func.emit(place);
      this.cancelSearch();
  }

}
