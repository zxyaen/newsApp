import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-bell',
  templateUrl: './bell.component.html',
  styleUrls: ['./bell.component.scss']
})
export class BellComponent implements OnInit {
  distortedNews: any

  constructor(private newsService: NewsService) { }
  ngOnInit(): void {
    this.newsService.checkIsDistorted().subscribe(res => {
      this.distortedNews = res
    })
  }

}
