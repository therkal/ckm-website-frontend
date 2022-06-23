import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost, BlogPostCard } from '../entities/models';
import { TransformService } from './transform.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private client: HttpClient, private transformService: TransformService) { }

  get(): Observable<BlogPostCard[]> {
    return this.client.get<BlogPostCard[]>(environment.assetsBasePath + 'blog-posts.json').pipe(
      // ToDo: Come up with generic solution
      // ToDo: Remove map
      // TEMP WHILE HOSTING LOCAL --> Change all occurances of imageUrl to append base path
      map((collection) => this.transformService.transformImageUrl(collection))
    );
  }
}
