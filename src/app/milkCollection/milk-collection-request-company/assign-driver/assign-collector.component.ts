import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { MilkCollectionService } from 'src/app/services/milk-collection.service';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-assign-collector',
  templateUrl: './assign-collector.component.html',
  styleUrls: ['./assign-collector.component.css',
  ]
})
export class AssignCollectorComponent implements OnInit {

  titlePopup = "Asignar Recolector";
  request: any;
  collectors: any;
  collector;

  @Output() reloadData = new EventEmitter<any>();

  constructor(
    private popoverController: PopoverController,
    private milkCollectionService: MilkCollectionService,
    public navParams: NavParams) {
    this.request = this.navParams.data;
  }

  ngOnInit() {
    this.milkCollectionService.getCollectorByCompany().subscribe(res => {
      this.collectors = res;
    })
  }

  assigneeCollector() {
    if (this.collector) {
      let pojo = {
        idRequest: this.request._id,
        collectorUsername: this.collector,
      }

      this.milkCollectionService.asociateRequest(pojo).subscribe(res => {
        this.popoverController.dismiss()
      })
    }
  }
}
