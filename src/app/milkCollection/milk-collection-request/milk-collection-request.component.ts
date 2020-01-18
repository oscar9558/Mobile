import { Component, OnInit, Input } from '@angular/core';
import { MilkCollectionService } from 'src/app/services/milk-collection.service';

@Component({
  selector: 'app-milk-collection-request',
  templateUrl: './milk-collection-request.component.html',
  styleUrls: ['./milk-collection-request.component.css']
})
export class MilkCollectionRequestComponent implements OnInit {

  @Input() isCompany:boolean;
  request;
  constructor(private milkCollectionService: MilkCollectionService) { }

  ngOnInit() {
    this.milkCollectionService.getRequest().subscribe(res => {
      this.request = res;
    })
  }


}
