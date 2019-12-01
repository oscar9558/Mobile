import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsDownloadService } from 'src/app/services/newsDownload.service';

@Component({
  selector: 'app-news-inspection',
  templateUrl: './news-inspection.page.html',
  styleUrls: ['./news-inspection.page.scss'],
})
export class NewsInspectionPage implements OnInit {
  sub: any;
  id: number;
  news: any;

  constructor(private route: ActivatedRoute,
    private newsDownloadService: NewsDownloadService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getNewsById();
  }

  getNewsById() {
    this.newsDownloadService.findById(this.id).subscribe(
      response => {
        this.news = response;
        var date = this.news.date.split("T");
        date = date[0].split("-");
        this.news.date = `${date[0]}/${date[1]}/${date[2]}`;
      },
    );
  }

}
