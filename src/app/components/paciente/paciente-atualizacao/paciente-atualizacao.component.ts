import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/paciente-service.';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-atualizacao',
  templateUrl: './paciente-atualizacao.component.html',
  styleUrls: ['./paciente-atualizacao.component.css']
})
export class PacienteAtualizacaoComponent implements OnInit {

  paciente: Paciente = {} as Paciente;

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Captura o id informado na url
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Busca o paciente para a edição
      this.pacienteService.getPacienteById(Number(id)).subscribe({
        next: (data: Paciente) => {
          this.paciente = data;
        },
        error: (error: any) => {
          console.error('Erro ao carregar paciente:', error);
        }
      });
    }
  }

  // Salva a edição
  atualizarPaciente() {
    this.pacienteService.updatePaciente(this.paciente).subscribe({
      next: () => {
        this.router.navigate(['/pacientes']);
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
