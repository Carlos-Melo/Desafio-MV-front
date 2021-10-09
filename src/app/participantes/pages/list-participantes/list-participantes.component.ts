import { Component, OnInit } from '@angular/core';
import { Participante } from '../../model/participante';
import { ParticipantesService } from '../../participantes.service';

@Component({
  selector: 'app-list-participantes',
  templateUrl: './list-participantes.component.html',
  styleUrls: ['./list-participantes.component.scss']
})
export class ListParticipantesComponent implements OnInit {

  participantes: Participante[];

  constructor(private service: ParticipantesService) { }

  ngOnInit(): void {
    this.participantes = this.service.getAllParticipantes();
  }

}
