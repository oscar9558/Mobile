import { Injectable } from '@angular/core';
import * as departments from "./departments.json";


@Injectable({
  providedIn: 'root'
})
export class DeparmentsService {

  departments = (<any>departments).default;

  getDeparmets() {
    let cloned = this.departments.map(x => Object.assign({}, x));
    return cloned;
  }

  getfirstDepartment() {
    let returnValue = this.departments.map(x => Object.assign({}, x));
    return returnValue[0];
  }

  getDeparmentById(id) {
    let returnValue = this.departments.map(x => Object.assign({}, x));
    return returnValue.find(x => {
      return x.id === id
    });
  }

  constructor() { }
}
