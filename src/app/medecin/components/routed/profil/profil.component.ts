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
  error$!: Observable<boolean>;
  loading$!: Observable<boolean>;
  patient$!: Observable<Patient>;
  infosMedicales: {parametre: string, valeur: string}[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void{
    this.initObservables();
    console.log(sessionStorage.getItem('Token'));
  }

  initObservables(): void{
    this.patient$ = this.patientService.patient$.pipe(
      tap(val => {
        console.log(val);
      })
    );
    this.loading$ = this.patientService.loading$;
    this.error$ = this.patientService.error$;
  }

  getCardId(cardId: string): void{
    this.cardId = cardId;
    this.disabled = cardId==="";
    console.log("card : ", cardId, this.disabled);
  }

  getPatientProfile(): void{
    this.patientService.getPatient(this.cardId);
  }

  getYears(date: string|Date): number{
    const d = new Date().getTime() - new Date(date).getTime();
    return Math.floor(d/31536000000);
  }

  getContacts(patient: any): {nom: string, address: string, numero: string}[]{
    let contacts: {nom: string, address: string, numero: string}[] = [];
    patient['medicalProfile'].emergencyContacts.forEach((contact: any) => {
      contacts.push({
        nom: contact.name,
        address: contact.address,
        numero: contact.phoneNumber
      })
    })
    return contacts;
  }

  getAllergies(patient: any): {type: string, manifestations: string}[]{
    let allergies: {type: string, manifestations: string}[] = [];
    patient['medicalProfile'].allergies.forEach((allergie: any) => {
      allergies.push({
        type: allergie.type,
        manifestations: allergie.manifestation
      })
    })
    return allergies;
  }
}
