import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/entities/models';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  @Input() persona?: Persona;

  constructor() { }

  ngOnInit(): void {
  }

}
