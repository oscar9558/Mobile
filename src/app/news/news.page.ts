import { Component, OnInit } from '@angular/core';
import { NewsDownloadService } from '../services/newsDownload.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  news;
  image: string = "../../../assets/images/picture.svg";
  constructor(private newsService: NewsDownloadService) { }

  ngOnInit() {
    this.newsService.findAllNews().subscribe(res => {
      this.news=res;
    }
    )
  }

}
