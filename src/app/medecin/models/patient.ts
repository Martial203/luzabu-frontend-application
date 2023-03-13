import { Consultation } from "./consultation";
import { ExamenGeneral } from "./examen-general";
import { ExamenLaboratoire } from "./examen-laboratoire";
import { Ordonnance } from "./ordonnance";
import { Radiologie } from "./radiologie";

export class Patient {
  [key: string]: any;
  id!: string;
  cardId!: string;
  infosPersonnelles!: InfosPersonnelles;
  consultations!: Consultation[];
  ordonnances!: Ordonnance[];
  examensGeneraux!: ExamenGeneral[];
  examensLaboratoire!: ExamenLaboratoire[];
  radiologies!: Radiologie[];
}

export class InfosPersonnelles {
  nom!: string;
  prenom!: string;
  dateNaissance!: Date;
  telephone!: string;
  sexe!: "masculin"|"feminin";
  password!: string;
  adresse!: string;
  profession!: string;
  nationalite!: string;
  avatar!: string;
}
