import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { City } from '../models/city';
import { AppConfig } from '../app.config';
import { StorageService } from './storage';
import { AppService } from '../services/app';

@Injectable()
export class ForecastService {

  private weatherApiUrl:string = '/weather/data/2.5/forecast/daily?cnt=7&units=metric&appid='+AppConfig.WeatherApiKey;
  // Live api
  //private weatherApiUrl:string = 'http://api.openweathermap.org/data/2.5/forecast/daily?cnt=6&units=metric&appid='+AppConfig.WeatherApiKey;

  constructor(private http: Http,private storage: StorageService,private appSrv: AppService) {}
  
  /*
  * Get city forecast
  * @param action $string
  * @param data $any
  * @return Observable<City>
  */
  getCity(action:string, data:any): Observable<City> {

    let apiUrl:string = this.weatherApiUrl;

    switch (action) {
      case AppConfig.actions.id:
        apiUrl += '&id='+data.id;
        break;
      case AppConfig.actions.geo:
        apiUrl +='&lat='+data.lat+'&lon='+data.lon;
        break;
      case AppConfig.actions.query:
        apiUrl +='&q='+encodeURI(data.name);
        break;
    }

    let today = this.appSrv.getDateFormat(new Date(), 'yyyyMMdd');

    return this.http.get(apiUrl)
      .map(response => response.json())
      .map(({city, list}) => {

        if(today > this.appSrv.getDateFormat(new Date(list[0].dt*1000),'yyyyMMdd'))
          list.shift();
          
        return new City(city, list);
      })
      .catch(this.handleError);

  };

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }


}
