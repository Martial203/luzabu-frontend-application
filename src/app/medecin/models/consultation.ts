export class Consultation {
  id!: string;
  examen_clinique!: ExamenClinique;
  symptomes!: Symptome[];
  diagnostiques!: Diagnostique[];
  images!: string[];
  idPatient!: string;
  idMedecin!: string;
  hopital!: string;
  time!: Date;
}

export class ExamenClinique {
  motif_consultation!: string;
  age!: number;
  taille!: number;
  temperature!: number;
  pression_arterielle!: number;
  poids!: number;
  pouls!: number;
  spo2!: number;
}

export class Symptome {
  symptome!: string;
  commentaire!: string;
}

export class Diagnostique {
  diagnostique!: string;
  remarque!: string;
}
