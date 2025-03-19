import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Atendimento } from 'src/app/models/atendimento.model';
import { Paciente } from 'src/app/models/paciente.model';
import { AtendimentoService } from 'src/app/services/atendimento-service';
import { PacienteService } from 'src/app/services/paciente-service.';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-cadastro',
  templateUrl: './paciente-cadastro.component.html',
  styleUrls: ['./paciente-cadastro.component.css']
})
export class PacienteCadastroComponent {

  constructor(
    private pacienteService: PacienteService,
    private atendimentoService: AtendimentoService,
    private router: Router) { }

  paciente: Paciente = {} as Paciente;
  atendimento: Atendimento = {} as Atendimento;

  // Salva o cadastro
  cadastrarPaciente() {
    this.pacienteService.addPaciente(this.paciente).subscribe({
      next: (data) => {
        // Prepara o atendimento para ser cadastrado
        this.atendimento = { status: 'Aguardando', pacienteId: Number(data.id) }

        // Cadastra o atendimento que irá gerar o número de chamada na triagem
        this.atendimentoService.addAtendimento(this.atendimento).subscribe({
          next: (data: any) => {
            if (data) {
              this.router.navigate(['/'],)
            }
          },
          error: (error) => {
            console.log(error);
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
