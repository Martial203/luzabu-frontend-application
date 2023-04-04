import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmEqualValidator } from 'src/app/core/validators/confirm-equal.validator';
import { Medecin } from 'src/app/medecin/models/medecin';
import { AuthMedecinService } from '../../services/auth-medecin.service';

@Component({
  selector: 'app-new-physician',
  templateUrl: './new-physician.component.html',
  styleUrls: ['./new-physician.component.scss']
})
export class NewPhysicianComponent {

  newPhysicianForm!: FormGroup;
  loading: boolean = false;
  complete: boolean = false;

  @ViewChild('file') file!: FormControl;

  constructor(private router: Router, private formBuilder: FormBuilder, private medecinAuthService: AuthMedecinService){}

  ngOnInit(): void{
    this.initFormControls();
    this.newPhysicianForm.valueChanges.subscribe(val => console.log(this.newPhysicianForm));
  }

  initFormControls(): void{
    this.newPhysicianForm = this.formBuilder.group({
      matricule: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      birthPlace: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      city: [null, [Validators.required]],
      qualification: [null, [Validators.required]],
      hopitalName: [null, [Validators.required]],
      certificate: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(9)]],
      conditions: [null, [Validators.requiredTrue]]
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });
  }

  onSubmit(): void{
    console.log(this.newPhysicianForm.value);
    this.loading = true;
    if(this.newPhysicianForm.valid){
      const formValue = this.newPhysicianForm.value;
      delete formValue.conditions;
      delete formValue.confirmPassword;
      const physician: Medecin = {
        ...formValue,
        profilePicture: '/assets/doctor.jpg',
        registrationDate: new Date()
      }

      this.medecinAuthService.signUp(physician).subscribe({
        next: (val) => console.log(val),
        error: (err) => console.log(err),
        complete: () => {
          this.loading = false;
          this.router.navigateByUrl('/medecin');
        }
      });
    }

  }

  getControlError(ctrl: AbstractControl | "password"): string | null{
    if(ctrl === "password"){
      return (this.newPhysicianForm.value.password !== this.newPhysicianForm.value.confirmPassword) ? "Les mots de passe ne correspondent pas" : null;
    }else if (ctrl.hasError("required")) {
      return "Ce champ est requis";
    } else if (ctrl.hasError("email")) {
      return "Adresse mail invalide";
    } else if (ctrl.hasError("minlength") || ctrl.hasError("maxlength")) {
      return "Numero de téléphone invalide";
    } else {
      return "Ce champ contient une erreur";
    }
  }

  onGetImage(event: any): void{
    this.newPhysicianForm.controls['certificate'].setValue([event.target.files[0].name]);
  }

  countries : string[] = ["Afghanistan","Afrique_du_Sud","Albanie","Algerie","Allemagne","Andorre","Angola","Antigua-et-Barbuda","Arabie_saoudite","Argentine","Armenie","Australie","Autriche","Azerbaidjan","Bahamas","Bahrein","Bangladesh","Barbade","Belau","Belgique","Belize","Benin","Bhoutan","Bielorussie","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Bresil","Brunei","Bulgarie","Burkina","Burundi","Cambodge","Cameroun","Canada","Cap-Vert","Chili","Chine","Chypre","Colombie","Comores","Congo","Cook","Coree_du_Nord","Coree_du_Sud","Costa_Rica","Cote_Ivoire","Croatie","Cuba","Danemark","Djibouti","Dominique","Egypte","Emirats_arabes_unis","Equateur","Erythree","Espagne","Estonie","Etats-Unis","Ethiopie","Fidji","Finlande","France","Gabon","Gambie","Georgie","Ghana","Grèce","Grenade","Guatemala","Guinee","Guinee-Bissao","Guinee_equatoriale","Guyana","Haiti","Honduras","Hongrie","Inde","Indonesie","Iran","Iraq","Irlande","Islande","Israël","Italie","Jamaique","Japon","Jordanie","Kazakhstan","Kenya","Kirghizistan","Kiribati","Koweit","Laos","Lesotho","Lettonie","Liban","Liberia","Libye","Liechtenstein","Lituanie","Luxembourg","Macedoine","Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc","Marshall","Maurice","Mauritanie","Mexique","Micronesie","Moldavie","Monaco","Mongolie","Mozambique","Namibie","Nauru","Nepal","Nicaragua","Niger","Nigeria","Niue","Norvège","Nouvelle-Zelande","Oman","Ouganda","Ouzbekistan","Pakistan","Panama","Papouasie-Nouvelle_Guinee","Paraguay","Pays-Bas","Perou","Philippines","Pologne","Portugal","Qatar","Republique_centrafricaine","Republique_dominicaine","Republique_tcheque","Roumanie","Royaume-Uni","Russie","Rwanda","Saint-Christophe-et-Nieves","Sainte-Lucie","Saint-Marin","Saint-Siège","Saint-Vincent-et-les_Grenadines","Salomon","Salvador","Samoa_occidentales","Sao_Tome-et-Principe","Senegal","Seychelles","Sierra_Leone","Singapour","Slovaquie","Slovenie","Somalie","Soudan","Sri_Lanka","Sued","Suisse","Suriname","Swaziland","Syrie","Tadjikistan","Tanzanie","Tchad","Thailande","Togo","Tonga","Trinite-et-Tobago","Tunisie","Turkmenistan","Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Venezuela","Viet_Nam","Yemen","Yougoslavie","Zaire","Zambie","Zimbabwe"];

}
