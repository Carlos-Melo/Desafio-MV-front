import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Comida } from '../../model/comida';
import { Participante } from '../../model/participante';
import { ParticipantesService } from '../../participantes.service';

@Component({
  selector: 'app-form-participantes',
  templateUrl: './form-participantes.component.html',
  styleUrls: ['./form-participantes.component.scss']
})
export class FormParticipantesComponent implements OnInit {

  formulario: FormGroup;
  submitted: boolean = false;
  participante: Participante = new Participante();
  participanteEditar: any;
  editarComida: Comida[] = [];
  comidaSelecionada: string;
  isEdit: boolean = false;
  isSelected: boolean = false;
  validEditar: string = localStorage.getItem('editar');
  idComida: number;
  indexComida: number;
  comidas: Comida[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: ParticipantesService,
    private route: Router,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {

    if(this.validEditar === 'true'){
      this.pegarRotaEdit();
    }


    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      colaboracao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    })

  }

  pegarRotaEdit(){
    this.activatedRoute.params.subscribe(
      (params: Participante) => {
        const id = +params['id'];
        const participante$ = this.service.getEditar(id);
        participante$.subscribe(data => {
          this.updateForm(data);
          this.participanteEditar = data;
        })
        if(id){
          this.isEdit = true;
        }
      }
    )
  }

  updateForm(participante) {
    this.editarComida = participante.food;
    this.formulario.patchValue({
      nome: participante.nome,
      cpf: participante.cpf,
      colaboracao: this.comidaSelecionada
    })
  }

  addComida() {
    let inputColaboracao = this.formulario.controls.colaboracao.value
    if(inputColaboracao.length >= 3) {
      this.comidas.push({food: inputColaboracao});
      this.alerta('success', 'Comida cadastrada com sucesso');
      this.onClose()
    }
    else {
      this.alerta('danger', 'Erro ao cadastrar comida');
      this.onClose()
    }
  }

  setarDadosObjeto() {
    this.participante = {
      nome: this.formulario.get('nome').value,
      cpf: this.formulario.get('cpf').value,
      food: this.comidas
    }
  }

  onSubmit() {
    if(this.formulario.valid){
      this.setarDadosObjeto();
      this.service.adicionar(this.participante).subscribe({
        next: data => {
          this.alerta('success', 'Participante cadastrado com sucesso!');
          this.onClose()
        },
        error: err => {
          this.alerta('danger', 'Erro ao cadastrar participante.');
          this.onClose()
        }
      });
      this.formulario.reset();
    }else {
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      })
    }
  }

  setarEditarFalse() {
    localStorage.setItem('editar', 'false');
  }

  editComida() {
    if(this.formulario.controls.colaboracao.value != undefined) {
      this.participanteEditar.food[this.indexComida].idFood = this.idComida;
      this.participanteEditar.food[this.indexComida].food = this.formulario.controls.colaboracao.value;
      this.isSelected = false;
    }else{
      this.alerta('danger', 'Erro ao alterar comida');
      this.onClose()
    }

  }

  editar() {
    this.participanteEditar.nome = this.formulario.controls.nome.value;
    this.participanteEditar.cpf = this.formulario.controls.cpf.value;

    this.service.setEditar(this.participanteEditar).subscribe({
      next: data => {
        this.alerta('success', 'Participante editado com sucesso!');
        this.onClose()
      },
      error: err => {
        this.alerta('danger', 'Erro ao editar participante');
        this.onClose()
      }
    })
  }

  selecionada(idComida, i) {
    this.isSelected = true;

    this.formulario.controls.colaboracao.setValue(this.comidaSelecionada);

    this.idComida = idComida;
    this.indexComida = i;
  }

  cancelar() {
    this.route.navigate([''])
  }

  alerta(typeError: string, messagemErro: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = typeError;
    this.bsModalRef.content.message = messagemErro;
  }

  onClose() {
    setTimeout( () => {
      this.bsModalRef.hide();
    }, 1000)

  }

  //Verifica e retorna campo touched inválido
  verificaTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  //Aplica a classe Bootstrap para campos inválidos
  aplicaCssErro(campo) {
    return{
      'is-invalid': this.verificaTouched(campo) && !this.formulario.valid
    }
  }

}
