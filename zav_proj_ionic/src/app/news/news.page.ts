import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {
  news: { newsId: number; title: string; description: string; img_url: string; source_url:string ;source: string; publishedAt: string }[] = [];
  constructor(private apiService: ApiService) {}
  defaultImage = '../../assets/images/pocket_news.JPEG'

  ionViewWillEnter() {
    this.apiService.getNews('/news').subscribe({
      next: (response) => {
        this.news = response.articles.map((article: any) => ({
          newsId: article.newsId,
          title: article.title,
          description: article.description,
          img_url: article.img_url || this.defaultImage, 
          source_url: article.source_url,
          source: article.source,
          publishedAt: article.publishedAt,
        }));
      },
      error: (error) => {
        console.error('Failed to load news:', error);
      },
    });
  }

  openExternalLink(url: string) {
    if (url) {
      window.open(url, '_blank'); 
    } else {
      console.warn('No URL provided for this article.');
    }
  }
}
