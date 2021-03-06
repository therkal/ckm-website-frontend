import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MenuItem } from 'src/app/entities/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  menuItems$: Observable<MenuItem[]> = new Observable();

  isMenuOpen = false;

  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.menuItems$ = this.client.get<MenuItem[]>(environment.assetsBasePath + 'nav-menu-items.json');
  }

}
