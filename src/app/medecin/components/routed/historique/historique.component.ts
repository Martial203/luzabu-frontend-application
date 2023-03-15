import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { Patient } from 'src/app/medecin/models/patient';
import { PatientService } from 'src/app/medecin/services/patient.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss', '../profil/profil.component.scss']
})
export class HistoriqueComponent {

  cardId!: string;
  disabled: boolean = true;
  loading!: Observable<boolean>;
  patient$!: Observable<Patient>;

  constructor(private patientService: PatientService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.initObservables();
  }

  initObservables(): void{
    this.patient$ = this.patientService.patient$;
  }

  getCardId(cardId: string): void{
    this.cardId = cardId;
    this.disabled = cardId==="";
  }

  getPatientHistory(): void{
    this.patientService.getPatient(this.cardId);
  }


}
