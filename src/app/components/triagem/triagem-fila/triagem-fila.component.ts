import { Component, OnInit } from '@angular/core';
import { TriagemService } from 'src/app/services/triagem-service';
import { Atendimento } from 'src/app/models/atendimento.model';
import { AtendimentoService } from 'src/app/services/atendimento-service';
import { Triagem } from 'src/app/models/triagem.model';

@Component({
  selector: 'app-triagem-fila',
  templateUrl: './triagem-fila.component.html',
  styleUrls: ['./triagem-fila.component.css']
})
export class TriagemFilaComponent implements OnInit {

  atendimentos: Atendimento[] = [];
  listaAguardando: Atendimento[] = [];
  listaAtendidos: Atendimento[] = [];
  triagens: Triagem[] = [];

  constructor(
    private atendimentoService: AtendimentoService,
    private triagemService: TriagemService) { }

  ngOnInit(): void {
    // Busca a lista de atendimentos
    this.atendimentoService.getAtendimentos().subscribe({
      next: (data) => {
        this.atendimentos = data;
        this.filtrarTriagens();
      },
      error: (error) => console.error("Erro ao carregar atendimentos:", error)
    });

    // Busca a lista de triagens
    this.triagemService.getTriagens().subscribe({
      next: (data) => {
        this.triagens = data;
      },
      error: (error) => console.error("Erro ao carregar as triagens:", error)
    })
  }

  // Filtra os atendimentos que estão aguardando e os que foram atendidos
  private filtrarTriagens(): void {
    this.listaAguardando = this.atendimentos.filter(t => t.status === 'Aguardando');
    this.listaAtendidos = this.atendimentos.filter(t => t.status === 'Atendimento');
  }
}
