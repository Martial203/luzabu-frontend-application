export class Medecin {
  id!: string;
  matricule!: string;
  nom!: string;
  prenom!: string;
  sexe!: "masculin"|"feminin";
  nationalite!: string;
  date_naissance!: Date;
  lieu_naissance!: string;
  telephone!: string;
  email!: string;
  ville!: string;
  qualite!: "généraliste"|"spécialiste";
  hopital!: string;
  certificat!: [string];
  password!: string;
  avatar?: string;
  registration_date!: Date;
}
