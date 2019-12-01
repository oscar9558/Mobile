import { Injectable } from '@angular/core';
import * as citys from "./citys.json";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {


  cities = (<any>citys).default;

  constructor() { }

  getCitys(idDepartment) {
    return this.cities.filter(x => x.departmentId === idDepartment);
  }

  getfirstCity() {
    let returnValue = this.cities.map(x => Object.assign({}, x));
    return returnValue[0];
  }

  getCityById(id: any): any {
    let returnValue = this.cities.map(x => Object.assign({}, x));
    return returnValue.find(x => {
      return x.id === id
    });
  }


}