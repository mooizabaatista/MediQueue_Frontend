import { Paciente } from "./paciente.model";

export interface Atendimento {
    id?: number;
    numeroSequencial?: number;
    dataHoraChegada?: string;
    status: string;
    pacienteId: number;
    paciente?: Paciente
}