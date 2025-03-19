import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteCadastroComponent } from './components/paciente/paciente-cadastro/paciente-cadastro.component';
import { PacienteListaComponent } from './components/paciente/paciente-lista/paciente-lista.component';
import { PacienteAtualizacaoComponent } from './components/paciente/paciente-atualizacao/paciente-atualizacao.component';
import { TriagemFilaComponent } from './components/triagem/triagem-fila/triagem-fila.component';
import { TriagemCadastroComponent } from './components/triagem/triagem-cadastro/triagem-cadastro.component';
import { TriagemAtualizacaoComponent } from './components/triagem/triagem-atualizacao/triagem-atualizacao.component';

const routes: Routes = [

  // Pacientes
  { path: 'pacientes', component: PacienteListaComponent },
  { path: 'pacientes/cadastro', component: PacienteCadastroComponent },
  { path: 'pacientes/atualizacao/:id', component: PacienteAtualizacaoComponent },

  // Triagem
  { path: 'triagem/fila', component: TriagemFilaComponent },
  { path: 'triagem/cadastro/:atendimentoId', component: TriagemCadastroComponent },
  { path: 'triagem/cadastro/:atendimentoId', component: TriagemCadastroComponent },
  { path: 'triagem/atualizacao/:id/:atendimentoId', component: TriagemAtualizacaoComponent },

  { path: '', redirectTo: '/pacientes', pathMatch: 'full' }, // Redireciona para a lista de pacientes
  { path: '**', redirectTo: '/pacientes' } // Rota coringa (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
