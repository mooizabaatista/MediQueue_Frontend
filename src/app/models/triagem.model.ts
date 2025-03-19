import { Atendimento } from "./atendimento.model";
import { Especialidade } from "./especialidade.model";

export interface Triagem {
    id?: number;
    sintomas: string;
    pressaoArterial?: number;
    peso?: number;
    altura?: number;
    atendimentoId?: number;
    atendimento?: Atendimento;
    especialidadeId?: number;
    especialidade: Especialidade
}