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
    return this.client.get<BlogPostCard[]>(`${environment.assetsBasePath}blog-posts.json`).pipe(
      // ToDo: Find out why type doesn't work.
      map(items => items.map(entry => {
        entry.type = 'blog'
        entry.navigable = true;
        return entry;
      })),
      // ToDo: Come up with generic solution
      // ToDo: Remove map
      // TEMP WHILE HOSTING LOCAL --> Change all occurances of imageUrl to append base path
      map((collection) => this.transformService.transformImageUrl(collection))
    );
  }

  getById(id: string) {
    return this.client.get<BlogPost>(`${environment.assetsBasePath}blog-${id}.json`);
  }
}
