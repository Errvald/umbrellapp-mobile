export class Place {
    id: string;
    name: string;
    country: string;

    constructor(prediction:any){
        this.id = prediction.place_id;
        let des = prediction.description.split(",");
        this.name = des.shift();
        this.country = des.join();
    }

  static fromJSONArray(predictions: Array<Object>): Place[] {
    return predictions.map(obj => new Place(obj));
  }

  getFullName()
  {
    return this.name+this.country;
  }

}
