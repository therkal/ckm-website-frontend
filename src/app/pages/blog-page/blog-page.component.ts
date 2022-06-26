import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BlogPostCard, Card } from 'src/app/entities/models';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  selectedPost$: Observable<BlogPostCard> = new Observable();
  blogPosts$: Observable<BlogPostCard[]> = new Observable();

  constructor(private service: BlogService) { }

  ngOnInit(): void {
    this.blogPosts$ = this.service.get();
  }

  selectPostEventHandler(post: Card) {
    this.service.selectBlogPost(post as BlogPostCard);
  }

  // ToDo: extract to generic component.
  backToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
