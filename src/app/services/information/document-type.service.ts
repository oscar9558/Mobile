import { Injectable } from '@angular/core';
import * as documentTypes from "./documentType.json";


@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  documents = (<any>documentTypes).default;

  constructor() { }

  getDocuments() {
    let cloned = this.documents.map(x => Object.assign({}, x));
    return cloned;
  }

  getfirstDocument() {
    let returnValue = this.documents.map(x => Object.assign({}, x));
    return returnValue[0];
  }

  getDocumentById(id) {
    let returnValue = this.documents.map(x => Object.assign({}, x));
    return returnValue.find(x => {
      return x.id === id
    });
  }
}