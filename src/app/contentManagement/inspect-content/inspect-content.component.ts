import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentManagementService } from 'src/app/services/content-management.service';

@Component({
  selector: 'app-inspect-content',
  templateUrl: './inspect-content.component.html',
  styleUrls: ['./inspect-content.component.css']
})
export class InspectContentComponent implements OnInit {

  items = [
    {
      autor: "",
      fecha: "",
      comentario: ""
    },
    {
      autor: "Camilo",
      fecha: "12564",
      comentario: ""
    }
  ]

  id: any;
  content: any;

  constructor(public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private contentManagementService: ContentManagementService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getContentById();
    });
  }

  getContentById() {
    this.contentManagementService.findById(this.id).subscribe(
      response => {
        this.content = response;
        var date = this.content.date.split("T");
        date = date[0].split("-");
        this.content.date = `${date[0]}/${date[1]}/${date[2]}`;
      },
    );
  }

}
