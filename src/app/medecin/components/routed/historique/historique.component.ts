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
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;
  patient$!: Observable<Patient>;
  categorie!: string;

  constructor(private patientService: PatientService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    console.log("joe");
    this.initObservables();
    this.route.params.subscribe(val => this.categorie = val['categorie']);
  }

  initObservables(): void{
    this.patient$ = this.patientService.patient$;
    this.loading$ = this.patientService.loading$;
    this.error$ = this.patientService.error$;
  }

  getCardId(cardId: string): void{
    this.cardId = cardId;
    this.disabled = cardId==="";
    if(cardId.length>7) this.getPatientHistory();
  }

  getPatientHistory(): void{
    this.patientService.getPatient(this.cardId);
  }
}
