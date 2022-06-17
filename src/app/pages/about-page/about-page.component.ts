import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Persona } from 'src/app/entities/models';
import { TransformService } from 'src/app/services/transform.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  baseUrl = environment.assetsBasePath;

  personaInfo$: Observable<Persona[]> = new Observable();
  personaCats$: Observable<Persona[]> = new Observable();

  constructor(private client: HttpClient, private transformService: TransformService) { }

  ngOnInit(): void {
    this.personaInfo$ = this.client.get<Persona[]>(environment.assetsBasePath + 'about-persona.json').pipe(
      map(collection => this.transformService.transformImageUrl(collection))
    );
    this.personaCats$ = this.client.get<Persona[]>(environment.assetsBasePath + 'about-persona-cats.json').pipe(
      map(collection => this.transformService.transformImageUrl(collection))
    );
  }

}
