import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/models/atendimento.model';
import { Especialidade } from 'src/app/models/especialidade.model';
import { Triagem } from 'src/app/models/triagem.model';
import { AtendimentoService } from 'src/app/services/atendimento-service';
import { EspecialidadeService } from 'src/app/services/especialidade-service';
import { TriagemService } from 'src/app/services/triagem-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-triagem-cadastro',
  templateUrl: './triagem-cadastro.component.html',
  styleUrls: ['./triagem-cadastro.component.css']
})
export class TriagemCadastroComponent implements OnInit {
  constructor(
    private triagemService: TriagemService,
    private especialidadeService: EspecialidadeService,
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router) { }


  triagem: Triagem = {} as Triagem;
  especialidades: Especialidade[] = []
  atendimento: Atendimento = {} as Atendimento;


  ngOnInit(): void {
    // Captura o atendimentoId que foi informado na url
    const atendimentoId = this.route.snapshot.paramMap.get('atendimentoId');

    if (atendimentoId) {
      // Busca o atendimento para preenchimento de dados básicos
      this.atendimentoService.getAtendimentoById(Number(atendimentoId)).subscribe({
        next: (data) => {
          this.atendimento = data;
          this.triagem.atendimentoId = data.id;
          this.triagem.especialidadeId = 1
        },
        error: (error) => {
          console.log(error)
        }
      })
    }

    // Busca a lista de especialidades
    this.especialidadeService.getEspecialidades().subscribe({
      next: (data: Especialidade[]) => {
        this.especialidades = data;
        console.log('Especialidades carregadas:', this.especialidades);
      },
      error: (error) => {
        console.error('Erro ao buscar especialidades:', error);
      }
    });
  }

  // Salva o cadastro
  salvarTriagem() {
    this.triagemService.addTriagem(this.triagem).subscribe({
      next: (data) => {
        this.atendimentoService.chamarProximo().subscribe({
          next: (dataProx: Atendimento) => {
            this.router.navigate(['/triagem/fila'])
          }
        })
      },
      error: (error: any) => {
        Swal.fire({
          html: `
                <div class="mb-4">
                  <h3 class="text-danger">Corrija os seguintes campos:</h3>
                </div>
                ${error.error.errors.map((erro: any) => `<p class="alert alert-danger small"><span class="text-danger fw-bold">*</span> ${erro}</p>`).join("")}
                `,
          customClass: {
            confirmButton: "btn btn-success me-3",
          },
          buttonsStyling: false
        })
      }
    })
  }
}
