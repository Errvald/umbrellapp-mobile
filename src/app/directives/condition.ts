import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../app.config';

@Directive({
    selector: 'weather-condition'
})
export class WeatherCondition implements OnInit {

    @Input() icon: string;

    constructor (
        private element: ElementRef,
        private http: Http
    ) {}

    ngOnInit(): void {
        this.getSVG(this.icon)
            .then(svg => this.element.nativeElement.innerHTML = svg);
    }
    
    /*
    * Load the SVG and add to element.
    * @param name $string
    * @return Promise
    */
    getSVG(name:string)
    {
        return this.http.get(AppConfig.meteocons_path+name+'.svg')
            .map(res => res.text())
            .toPromise()
            .catch(err => console.log(err));
    }


}