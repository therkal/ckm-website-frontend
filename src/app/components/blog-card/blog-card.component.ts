import { Component, Input, OnInit } from '@angular/core';
import { BlogPostCard } from 'src/app/entities/models';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent {

  @Input() post!: BlogPostCard;

}
