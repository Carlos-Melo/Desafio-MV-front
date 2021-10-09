import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormParticipantesComponent } from './pages/form-participantes/form-participantes.component';
import { ListParticipantesComponent } from './pages/list-participantes/list-participantes.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'participantes', pathMatch: 'full' },
  { path: '', component: ListParticipantesComponent},
  { path: 'novo', component: FormParticipantesComponent },
  { path: 'editar/:id', component: FormParticipantesComponent },
  { path: '**' /*Página de erro*/}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantesRoutingModule { }
