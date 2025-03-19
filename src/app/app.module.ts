import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteListaComponent } from './components/paciente/paciente-lista/paciente-lista.component';
import { PacienteCadastroComponent } from './components/paciente/paciente-cadastro/paciente-cadastro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PacienteAtualizacaoComponent } from './components/paciente/paciente-atualizacao/paciente-atualizacao.component';
import { TriagemFilaComponent } from './components/triagem/triagem-fila/triagem-fila.component';
import { TriagemCadastroComponent } from './components/triagem/triagem-cadastro/triagem-cadastro.component';
import { TriagemAtualizacaoComponent } from './components/triagem/triagem-atualizacao/triagem-atualizacao.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteListaComponent,
    PacienteCadastroComponent,
    NavbarComponent,
    PacienteAtualizacaoComponent,
    TriagemFilaComponent,
    TriagemCadastroComponent,
    TriagemAtualizacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
