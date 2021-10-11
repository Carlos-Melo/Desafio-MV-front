import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantesRoutingModule } from './participantes-routing.module';
import { ListParticipantesComponent } from './pages/list-participantes/list-participantes.component';
import { FormParticipantesComponent } from './pages/form-participantes/form-participantes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParticipantesService } from './participantes.service';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    ListParticipantesComponent,
    FormParticipantesComponent
  ],
  imports: [
    CommonModule,
    ParticipantesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    ParticipantesService
  ]
})
export class ParticipantesModule { }
