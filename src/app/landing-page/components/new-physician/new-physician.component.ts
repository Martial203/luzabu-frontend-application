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

  constructor(private router: Router, private formBuilder: FormBuilder, private medecinAuthService: AuthMedecinService){}

  @ViewChild('form') form!: NgForm;

  ngOnInit(): void{
    this.initFormControls();
  }

  ngAfterViewInit(): void{
    this.form.ngSubmit.emit(this.form.value);
  }

  initFormControls(): void{
    this.newPhysicianForm = this.formBuilder.group({
      matricule: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      sexe: [null, [Validators.required]],
      nationalite: [null, [Validators.required]],
      date_naissance: [null, [Validators.required]],
      lieu_naissance: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      ville: [null, [Validators.required]],
      qualite: [null, [Validators.required]],
      hopital: [null, [Validators.required]],
      certificat: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(9)]],
      conditions: [null, [Validators.requiredTrue]]
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });
  }

  onSubmit(): void{

    if(this.newPhysicianForm.valid){
      const formValue = this.newPhysicianForm.value;
      delete formValue.conditions;
      delete formValue.confirmPassword;
      const physician: Medecin = {
        id: 1,
        ...formValue,
        avatar: '/assets/doctor.jpg',
        registration_date: new Date()
      }

      this.medecinAuthService.signIn(physician).subscribe({
        next: val => {
          if(val==='success'){
            this.router.navigateByUrl('/medecin');
          }
        },
        error: err => console.log(err),
        complete: () => console.log('complete')
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

  countries : string[] = ["Afghanistan","Afrique_du_Sud","Albanie","Algerie","Allemagne","Andorre","Angola","Antigua-et-Barbuda","Arabie_saoudite","Argentine","Armenie","Australie","Autriche","Azerbaidjan","Bahamas","Bahrein","Bangladesh","Barbade","Belau","Belgique","Belize","Benin","Bhoutan","Bielorussie","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Bresil","Brunei","Bulgarie","Burkina","Burundi","Cambodge","Cameroun","Canada","Cap-Vert","Chili","Chine","Chypre","Colombie","Comores","Congo","Cook","Coree_du_Nord","Coree_du_Sud","Costa_Rica","Cote_Ivoire","Croatie","Cuba","Danemark","Djibouti","Dominique","Egypte","Emirats_arabes_unis","Equateur","Erythree","Espagne","Estonie","Etats-Unis","Ethiopie","Fidji","Finlande","France","Gabon","Gambie","Georgie","Ghana","Grèce","Grenade","Guatemala","Guinee","Guinee-Bissao","Guinee_equatoriale","Guyana","Haiti","Honduras","Hongrie","Inde","Indonesie","Iran","Iraq","Irlande","Islande","Israël","Italie","Jamaique","Japon","Jordanie","Kazakhstan","Kenya","Kirghizistan","Kiribati","Koweit","Laos","Lesotho","Lettonie","Liban","Liberia","Libye","Liechtenstein","Lituanie","Luxembourg","Macedoine","Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc","Marshall","Maurice","Mauritanie","Mexique","Micronesie","Moldavie","Monaco","Mongolie","Mozambique","Namibie","Nauru","Nepal","Nicaragua","Niger","Nigeria","Niue","Norvège","Nouvelle-Zelande","Oman","Ouganda","Ouzbekistan","Pakistan","Panama","Papouasie-Nouvelle_Guinee","Paraguay","Pays-Bas","Perou","Philippines","Pologne","Portugal","Qatar","Republique_centrafricaine","Republique_dominicaine","Republique_tcheque","Roumanie","Royaume-Uni","Russie","Rwanda","Saint-Christophe-et-Nieves","Sainte-Lucie","Saint-Marin","Saint-Siège","Saint-Vincent-et-les_Grenadines","Salomon","Salvador","Samoa_occidentales","Sao_Tome-et-Principe","Senegal","Seychelles","Sierra_Leone","Singapour","Slovaquie","Slovenie","Somalie","Soudan","Sri_Lanka","Sued","Suisse","Suriname","Swaziland","Syrie","Tadjikistan","Tanzanie","Tchad","Thailande","Togo","Tonga","Trinite-et-Tobago","Tunisie","Turkmenistan","Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Venezuela","Viet_Nam","Yemen","Yougoslavie","Zaire","Zambie","Zimbabwe"];
}
