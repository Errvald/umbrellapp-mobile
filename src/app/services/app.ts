import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { DatePipe } from '@angular/common';

@Injectable()
export class AppService {
    
    private now: number;

    constructor(){
        this.now = Number(new DatePipe('en-US').transform(new Date(), 'yyyyMMddH'));
    }
    
    /*
    * Formate date
    * @param date $any
    * @param format $string
    * @return Number
    */
    getDateFormat(date:any, format:string): number
    {
        return Number(new DatePipe('en-US').transform(date, format));
    }

    /*
    * Get day difference from 2 dates
    * and compare with `cached-hours`
    * @param date $number
    * @return Boolean
    */
    dayDifference(date: number): Boolean
    {
         if((this.now - date) > AppConfig.cacheHours ){
            return true;
         }else{
            return false;
         }

    }

}