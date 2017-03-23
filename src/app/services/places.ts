import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';
import { Place } from '../models/places';

@Injectable()
export class PlacesService {
  
  constructor(private http: Http) { }
  
  private baseUrl = '/places/maps/api/place/autocomplete/json?types=(cities)&key='+AppConfig.GoogleApiKey;
  // Live
  // private baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&key='+AppConfig.GoogleApiKey;
  
  /*
  * Search google place for city with given name
  * @param input $string
  * @return Observable<Place[]>
  */
  search(input: string): Observable<Place[]> {
      return this.http.get(this.baseUrl+'&input='+input)
        .map(response => response.json())
        .map(({predictions}) => Place.fromJSONArray(predictions.slice(0,5)))
        .catch(this.handleError);
  };

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}

