import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantesRoutingModule } from './participantes-routing.module';
import { ListParticipantesComponent } from './pages/list-participantes/list-participantes.component';
import { FormParticipantesComponent } from './pages/form-participantes/form-participantes.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListParticipantesComponent,
    FormParticipantesComponent
  ],
  imports: [
    CommonModule,
    ParticipantesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ParticipantesModule { }
