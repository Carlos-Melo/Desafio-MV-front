import { Comida } from "./comida";

export class Participante {
  id?: number;
  nome: string;
  cpf: string;
  food: Comida[];
}
