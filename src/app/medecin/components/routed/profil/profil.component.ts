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

  constructor(private patientService: PatientService) {}

  ngOnInit(): void{
    this.initObservables();
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
