import {DatePipe} from '@angular/common';
export class Forecast {

    date: string;
    date_num: number;
    min_temp: number;
    max_temp: number;
    condition: string;
    icon: string;

    constructor(forecast:any){
        this.date = new DatePipe('en-US').transform(new Date(forecast.dt*1000), 'EEE');
        this.date_num = Number(new DatePipe('en-US').transform(new Date(forecast.dt*1000), 'yyyyMMdd'));
        this.min_temp = Math.round(forecast.temp.min);
        this.max_temp = Math.round(forecast.temp.max);
        this.condition = forecast.weather[0].description;
        this.icon = forecast.weather[0].icon;
    }

}

export class City {

    id?: number;
    name: string;
    country: string;
    day?: number;
    forecast?: any[];

    constructor(city:any, weather?: any[]){

        this.name = city.name;
        this.country = city.country;

        if(city.id) this.id = city.id;

        if(weather){
            this.day = Number(new DatePipe('en-US').transform(new Date(), 'yyyyMMddH'));
            this.forecast = weather.map((forecast) => new Forecast(forecast));
        }

        
    }

    getNameCountry()
    {
        return this.name +', '+ this.country
    }

}