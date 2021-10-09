import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  participante: Participante;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: ParticipantesService
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params: any) => {
        const id = +params['id'];
        const participante$ = this.service.editParticipante(id);
        console.log(participante$);
        this.updateForm(participante$);

        /*participante$.subscribe(participante => {
          this.updateForm(participante);
        })*/
      }
    )

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      colaboracao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    })

  }

  updateForm(participante) {
    this.formulario.patchValue({
      nome: participante.nome,
      cpf: participante.cpf,
      colaboracao: participante.colaboracao
    })
  }

  onSubmit() {
    if(this.formulario.valid){
      console.log(this.formulario);
      this.formulario.reset();
    }else {
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      })
    }

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
