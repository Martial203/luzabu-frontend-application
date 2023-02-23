export class Radiologie {
  id!: string;
  examens!: RadioExam[];
  images!: string[];
  idPatient!: string;
  idMedecin!: string;
  hopital!: string;
  time!: Date;
}

export class RadioExam {
  titre!: string;
  results!: string[];
}
