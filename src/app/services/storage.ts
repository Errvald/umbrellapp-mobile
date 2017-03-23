import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../app.config';
import { AppService } from './app';

@Injectable()
export class StorageService {

    // Initialize storage databases
    private cities: any = this.initStorage('cities');
    private favorites: any = this.initStorage('favorites');
    private app: any = this.initStorage('app');

    constructor(private appSrv: AppService){}
    
    /*
    * Initialize Storage
    * @param name $string
    * @return Storage
    */
    initStorage(name:string)
    {
        return new Storage(undefined, { name: AppConfig.DB, storeName: name });
    }

    /*
    * Get item by key from `app` storage db
    * @param key $string
    * @return Promise
    */
    get(key: string)
    {
        return this.app.get(key);
    }
    
    /*
    * Stores item by key to `app` storage db
    * @param key $string
    * @param val $any
    * @return Promise
    */
    set(key: string, val: any)
    {
        return this.app.set(key,val);
    }
    
    /*
    * Delete item by key from `app` storage db
    * @param key $string
    * @return Promise
    */
    remove(key: string)
    {
        return this.app.remove(key);
    }

    /*
    * Get city by `id`
    * @param id $any
    * @return Promise
    */
    getCity(id: any)
    {
        return this.cities.get(String(id));
    }
  
    /*
    * Store city by `id`
    * @param id $any
    * @param val $any
    * @return Promise
    */
    setCity(id: any, val: any)
    {
        return this.cities.set(String(id), val);
    }
     
    /*
    * Deletes city by `id`
    * @param id $any
    * @return Promise
    */
    removeCity(id: any)
    {
        return this.cities.remove(String(id));
    }
    
    /*
    * Clears cities that are older than 3 hours
    * @return Promise<any>
    */
    clearOldCities():Promise<any>
    {
       return this.cities.forEach((city) => {
           if(this.appSrv.dayDifference(city.day)){
               this.removeCity(city.id);
           }
        });
    }

    /*
    * List favorite cities
    * @return Promise<any[]>
    */
    getFavorites():Promise<any[]>
    {
       let list:any[] = [];
       return this.favorites.forEach((city) => {
            list.push(city);
        }).then(() => {
            return list;
        });
    }
    
    /*
    * Store city to favorites by `id`
    * @param id $any
    * @param val $any
    * @return Promise
    */
    setFavorite(id: any, val: any)
    {
        return this.favorites.set(id, val);
    }
  
    /*
    * Update city from favorites
    * @param id $any
    * @param obj $any
    * @return Promise
    */
    updateFavorite(id: any, obj: any)
    {
        this.favorites.get(id).then(fav => {
            return this.favorites.set(id, Object.assign(fav, obj));
        });
    }
    
    /*
    * Get favorite city
    * @param id $any
    * @return Promise
    */
    getFavorite(id: any)
    {
        return this.favorites.get(id);
    }
    
    /*
    * Deletes favorite city
    * @param id $any
    * @return Promise
    */
    removeFavorite(id: any)
    {
        return this.favorites.remove(id);
    }

}