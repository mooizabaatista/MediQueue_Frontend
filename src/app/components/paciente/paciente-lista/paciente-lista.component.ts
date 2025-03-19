import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/paciente-service.';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.css']
})
export class PacienteListaComponent implements OnInit {
  pacientes: Paciente[] = []

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    // Busca a lista de pacientes
    this.pacienteService.getPacientes().subscribe({
      next: (data: Paciente[]) => {
        this.pacientes = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // Deleta o paciente informado
  deletar(id: any) {
    Swal.fire({
      title: "Tem certeza disso?",
      text: "Essa ação não poderá ser revertida",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-danger me-3",
        cancelButton: "btn btn-outline-dark"
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.deletePaciente(id).subscribe({
          next: () => {
            Swal.fire({
              title: "Excluído com sucesso!",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                confirmButton: "btn btn-success"
              },
              buttonsStyling: false
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          },
          error: (error) => {
            Swal.fire({
              title: "Erro!",
              text: error.error,
              icon: "error",
              confirmButtonText: "OK",
              customClass: {
                confirmButton: "btn btn-danger"
              },
              buttonsStyling: false
            });
          }
        });
      }
    });
  }
}
