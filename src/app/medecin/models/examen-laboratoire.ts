export class ExamenLaboratoire {
  id!: string;
  tests!: Test[];
  images!: string[];
  idPatient!: string;
  idMedecin!: string;
  hopital!: string;
  time!: Date;
}

export class Test {
  type!: string;
  result!: string;
  laboratoire!: string;
  remarks!: string
}
