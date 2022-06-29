import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, filter, map, Observable, of, switchMap } from 'rxjs';
import { BlogPost } from 'src/app/entities/models';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  active$: Observable<BlogPost> = new Observable();

  constructor(private service: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const getRouteParamId$ = this.route.paramMap.pipe(
      map(params => params.get("id")),
      filter(id => id !== null),
      map(id => id as string)
    );

    // Get Blog Post Detail
    const getBlogPostDetais$ = getRouteParamId$.pipe(
      switchMap(id => this.service.getById(id))
    );

    // Get Blog Post Summary
    const getBlogPostSummary$ = this.service.getSelectedBlogPost().pipe(
      // If there is a value, get the value, otherwise switch to get
      switchMap(value => value ? of(value) : combineLatest([getRouteParamId$, this.service.get()])),
      // Check if result is Array [id | allBlogPosts], if so filter on post that has same Id
      map((result) => {
        return Array.isArray(result) ? result[1].filter(post => post.id === result[0])[0] : result
      })
    );

    // Combine data into one.
    this.active$ = combineLatest([getBlogPostSummary$, getBlogPostDetais$]).pipe(
      map(([blogPostSummary, blogPostDetails]) => {
        return { ...blogPostSummary, ...blogPostDetails }
      })
    );

  }
}

