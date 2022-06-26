import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BlogPostCard } from 'src/app/entities/models';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  active$: Observable<BlogPostCard> = new Observable();

  constructor(private service: BlogService) { }

  ngOnInit(): void {
    this.active$ = this.service.getSelectedBlogPost();
  }
}

