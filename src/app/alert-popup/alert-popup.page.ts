import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.page.html',
  styleUrls: ['./alert-popup.page.scss'],
})
export class AlertPopupPage implements OnInit {

  left: number = 0;
  right: number = 0;
  showPopup: boolean = false;
  message: string;
  urlImage: string;


  ngOnInit() {
  }

  calculatePopupPosition() {
    return { 'top.px': window.innerHeight / 4, 'left.px': window.innerWidth / 4, 'height.px': window.innerHeight / 2 };
  }

  closePopup() {
    this.showPopup = false;
  }

  openPopup() {
    this.showPopup = true;
  }

  showError(errorCode) {
    this.openPopup();
    this.urlImage = urlImage.ERROR;
  }

  showSuccess(errorCode) {
    this.openPopup();
    this.urlImage = urlImage.SUCCESS;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculatePopupPosition();
  }

}

export enum urlImage{
  ERROR="../../../assets/images/cancel.svg",
  WARNING="../../../assets/images/warning.svg",
  SUCCESS="../../../assets/images/checked.svg"
}
