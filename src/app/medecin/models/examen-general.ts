export class ExamenGeneral {
  id!: string;
  examens!: Examen[];
  images!: string[];
  idPatient!: string;
  idMedecin!: string;
  hopital!: string;
  time!: Date;
}

export class Examen {
  examen!: string;
  consignes!: string[];
}
