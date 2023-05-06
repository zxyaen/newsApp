import { Component, EventEmitter, Output } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchNews = new EventEmitter<void>();
  searchContent: string = ''
  constructor(private newsService: NewsService) { }

  search() {
    console.log('123');
    this.newsService.searchNews(this.searchContent).subscribe(res => {
      this.newsService.searchNewsResults = res
      console.log(this.newsService.searchNewsResults);
      this.searchNews.emit()
    })
  }
}
