import { Component, OnInit } from '@angular/core';
import { NewsDownloadService } from '../services/newsDownload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  news;
  image: string = "../../../assets/images/picture.svg";
  constructor(private newsService: NewsDownloadService,
    private router:Router) { }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.findAllNews().subscribe(
      response => {
        this.news = response;
      },
    );
  }

  navigate(route, id) {
    this.router.navigate([this.router.url, route, id])
  }
  

}
