import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-galleries-page',
  templateUrl: './galleries-page.component.html',
  styleUrls: ['./galleries-page.component.scss']
})
export class GalleriesPageComponent implements OnInit {

  galleries: any = [];

  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.client.get("/assets/galleries.json").subscribe(data => {
        this.galleries = data;
    });
  }

}
