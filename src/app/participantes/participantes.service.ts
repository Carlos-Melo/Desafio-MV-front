import { Injectable } from '@angular/core';
import { Participante } from './model/participante';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {

  participantes: Participante[] = [
    { id: 1, nome: 'Carlos', cpf: '11111111111', colaboracao: 'Pão com mortadela' },
    { id: 2, nome: 'João', cpf: '000.000.000-00', colaboracao: 'Guaravita' },
  ]

  constructor() { }

  getAllParticipantes() {
    //get
    return this.participantes
  }

  editParticipante(id: number): Participante {
    //get
    return this.participantes.find((participante: Participante) => participante.id === id);
  }
}
