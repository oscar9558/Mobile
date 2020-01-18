import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AssignCollectorComponent } from './assign-driver/assign-collector.component';
import { MilkCollectionService } from 'src/app/services/milk-collection.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-milk-collection-request-company',
  templateUrl: './milk-collection-request-company.component.html',
  styleUrls: ['./milk-collection-request-company.component.css']
})
export class MilkCollectionRequestCompanyComponent implements OnInit {

  requests;

  constructor(
    private milkCollectionService: MilkCollectionService,
    public popoverController: PopoverController
  ) { }

  async presentPopover(ev: any, request: any) {
    const popover = await this.popoverController.create({
      component: AssignCollectorComponent,
      event: ev,
      translucent: true,
      componentProps: request
    });

    popover.onDidDismiss().then(res=>{
      this.reloadData();
    })
    return await popover.present();

  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.milkCollectionService.getCompanyRequest().subscribe(res => {
      this.requests = res;
    })
  }
}
