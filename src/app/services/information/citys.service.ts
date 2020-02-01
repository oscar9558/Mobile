import { Injectable } from '@angular/core';
import * as cities from "./cities.json";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  citys = (<any>cities).default;

  constructor() { }

  getCitys(idDepartment) {
    return this.citys.filter(x => x.departmentId === idDepartment);
  }

  getfirstCity() {
    let returnValue = this.citys.map(x => Object.assign({}, x));
    return returnValue[0];
  }

  getCityById(id: any): any {
    let returnValue = this.citys.map(x => Object.assign({}, x));
    return returnValue.find(x => {
      return x.id === id
    });
  }


}
