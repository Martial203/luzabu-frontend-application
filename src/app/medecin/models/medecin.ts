export class Medecin {
  matricule!: string;
  firstName!: string;
  lastName!: string;
  sex!: "masculin"|"feminin";
  nationality!: string;
  birthdate!: Date;
  birthPlace!: string;
  phoneNumber!: string;
  email!: string;
  city!: string;
  qualification!: "généraliste"|"spécialiste";
  hopitalName!: string;
  certificate!: [string];
  password!: string;
  profilePicture?: string;
  registrationDate!: Date;
}
