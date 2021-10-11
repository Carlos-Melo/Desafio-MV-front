import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Participante } from '../../model/participante';
import { ParticipantesService } from '../../participantes.service';

@Component({
  selector: 'app-list-participantes',
  templateUrl: './list-participantes.component.html',
  styleUrls: ['./list-participantes.component.scss']
})
export class ListParticipantesComponent implements OnInit {

  participantes: Participante[];
  bsModalRef: BsModalRef;

  constructor(private service: ParticipantesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listarParticipantes()

  }

  listarParticipantes() {
    this.service.listar().subscribe({
      next: participantes => {
        this.participantes = participantes;
      },
      error: err => this.alertaErro('danger', 'Erro ao listar usuarios')

    })
  }

  abrirEdit() {
    localStorage.setItem('editar', 'true');
  }

  excluir(id) {

    this.service.excluir(id).subscribe({
      next: data => {
        this.alertaErro('success', 'Usuario excuido com sucesso!');
        setTimeout(() => {
          location.reload();
        }, 1000)
      },
      error: err => {
        this.alertaErro('danger', 'Erro ao excluir usuario');
      }
    })
  }

  alertaErro(typeError: string, messagemErro: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = typeError;
    this.bsModalRef.content.message = messagemErro;
  }

}
