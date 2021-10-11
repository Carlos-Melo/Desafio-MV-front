import { Injectable } from '@angular/core';
import { Participante } from './model/participante';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {

  private readonly API = 'https://desafioback-carlos.herokuapp.com/user';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Participante[]>(this.API);
  }

  adicionar(participante: Participante) {
    return this.http.post(this.API, participante).pipe(take(1));
  }

  getEditar(id: number) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  setEditar(participante: any) {
    return this.http.put(`${this.API}`, participante).pipe(take(1));
  }

  excluir(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
