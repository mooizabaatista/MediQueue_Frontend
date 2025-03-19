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
  selector: 'app-triagem-atualizacao',
  templateUrl: './triagem-atualizacao.component.html',
  styleUrls: ['./triagem-atualizacao.component.css']
})
export class TriagemAtualizacaoComponent implements OnInit {
  triagem: Triagem = {} as Triagem;
  especialidades: Especialidade[] = [];
  atendimento: Atendimento = {} as Atendimento;

  constructor(
    private triagemService: TriagemService,
    private especialidadeService: EspecialidadeService,
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Captura os ids passados na url
    const id = this.route.snapshot.paramMap.get('id');
    const atendimentoId = this.route.snapshot.paramMap.get('atendimentoId');

    // Busca a lista de especialidades
    this.especialidadeService.getEspecialidades().subscribe({
      next: (data: Especialidade[]) => {
        this.especialidades = data;

        // Busca a triagem para a edição
        if (id) {
          this.triagemService.getTriagemById(Number(id)).subscribe({
            next: (data: Triagem) => {
              this.triagem = data;
              this.triagem.especialidadeId = data.especialidade.id;
              this.triagem.atendimentoId = Number(atendimentoId);
            },
            error: (error) => {
              console.log(error);
            }
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });

    // Busca os dados do atendimento referente a triagem atual
    if (atendimentoId) {
      this.atendimentoService.getAtendimentoById(Number(atendimentoId)).subscribe({
        next: (data) => {
          this.atendimento = data;
        },
        error: (error) => {
          console.log(error.error);
        }
      });
    }
  }

  // Salva a edição
  atualizarTriagem() {
    this.triagemService.updateTriagem(this.triagem).subscribe({
      next: (data) => {
        this.router.navigate(['/triagem/fila']);
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
    });
  }
}
