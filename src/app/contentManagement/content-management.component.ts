import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContentManagementService } from '../services/content-management.service';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent implements OnInit {

  userName: any;
  content: any;
  upload: boolean;
  download: boolean;


  constructor(
    private contentManagementService: ContentManagementService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getContent();
    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    this.userName = map.keys().next().value;
  }

  getContent() {
    this.contentManagementService.getContent().subscribe(
      response => {
        this.content = response;
      }
    )
  }

  deleteContent(content) {
    this.contentManagementService.delete(content._id).subscribe(
      response => {
        this.getContent();
      }
    )
  }

  inspectContent(content) {
    if (content.type === 'Video') {
      window.location.href = content.url;
    } else {
      this.router.navigate([this.router.url, 'contentInspection', content._id]);
    }
  }

}
