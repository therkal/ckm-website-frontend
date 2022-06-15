import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Persona } from 'src/app/entities/models';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  personaInfo: Observable<Persona[]> = new Observable();
  personaCats: Observable<Persona[]> = new Observable();

  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.personaInfo = this.client.get<Persona[]>('/assets/about-persona.json');
    this.personaCats = this.client.get<Persona[]>('/assets/about-persona-cats.json')
  }

}
