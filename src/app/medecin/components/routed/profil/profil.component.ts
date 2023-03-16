import { Component } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Patient } from 'src/app/medecin/models/patient';
import { PatientService } from 'src/app/medecin/services/patient.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  cardId!: string;
  disabled: boolean = true;
  loading!: Observable<boolean>;
  patient$!: Observable<Patient>;
  contactsUrgence: {nom: string, relation: string, numero: string}[] = [];
  infosMedicales: {parametre: string, valeur: string}[] = [];
  allergies: {type: string, manifestations: string}[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void{
    this.initObservables();
    console.log(sessionStorage.getItem('Token'));
    this.patientService.getPatient("UIECC2000");
  }

  initObservables(): void{
    this.patient$ = this.patientService.patient$;
  }

  getCardId(cardId: string): void{
    this.cardId = cardId;
    this.disabled = cardId==="";
    console.log("card : ", cardId, this.disabled);
  }

  getPatientProfile(): void{
    this.patientService.getPatient(this.cardId);
  }
}
