export class Ordonnance {
  id!: string;
  medicaments!: Medicament[];
  images!: string[];
  idPatient!: string;
  idMedecin!: string;
  hopital!: string;
  time!: Date;
}

export class Medicament {
  nom!: string;
  famille!: string;
  forme!: string;
  dosage!: string;
  posologie!: string;
  observations!: string[];
}
