import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Patient } from '../models/patient';
import { environment } from 'src/environments/environment';
import { Consultation } from '../models/consultation';
import { ExamenGeneral } from '../models/examen-general';
import { ExamenLaboratoire } from '../models/examen-laboratoire';
import { Ordonnance } from '../models/ordonnance';
import { Radiologie } from '../models/radiologie';
import { MatDialog } from '@angular/material/dialog';
import { ErrorsComponent } from 'src/app/core/components/errors/errors.component';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _patient$: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(new Patient());
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private patientExists : boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  get patient$(): Observable<Patient>{
    return this._patient$.asObservable();
  }

  get loading$(): Observable<boolean>{
    return this._loading$.asObservable();
  }

  get error$(): Observable<boolean>{
    return this._error$.asObservable();
  }

  private setErrorStatus(error: boolean): void{
    this._error$.next(error);
  }

  private setLoadingStatus(loading: boolean): void{
    this._loading$.next(loading);
  }

  getPatient(cardId: string): void{
    console.log(this._patient$.value);
    if(this._patient$.value.cardId !== cardId){
      this.setLoadingStatus(true);
      this.setErrorStatus(false);
      this.http.get<Patient>(`${environment.apiUrl}/doctor/getPatient`, {params: {cardId}}).pipe(
      tap(val => {
        this._patient$.next(val['patient']);
        this.patientExists = true;
        this.setLoadingStatus(false);
        console.log(val['patient'])
      })).subscribe({
        next: (val) => console.log(val['patient']),
        error: (err) => {
          this.setErrorStatus(true),
          this.setLoadingStatus(false);
        },
        complete: () => console.log('Complete', this._patient$.value)
      })
    }
  }

  getPatientId(): string{
    const id = this._patient$.value.cardId;
    console.log("id", id);
    return (id!==undefined) ? id : "";
  }

  updatePatient(patient: Patient): void{
    this.setLoadingStatus(true);
    this.setErrorStatus(false);
    this.http.put<Patient>(`${environment.apiUrl}/doctor/updatePatient`, {cardId: patient.cardId, patient: patient}).pipe(
      tap(val => {
        console.log(val);
        this._patient$.next(patient);
        this.setLoadingStatus(false);
      })
    ).subscribe({
      next: val => console.log(val),
      error: err => {
        this.setErrorStatus(true);
        this.setLoadingStatus(false);
        this.dialog.open(ErrorsComponent)
      },
      complete: () => {
        console.log("complete", this._patient$.value['NewPatient'])
        alert("Mise à jour effectuée avec succès");
      }
    });
  }

  newMedication(medication: Consultation|Ordonnance|Radiologie|ExamenGeneral|ExamenLaboratoire, categorie?: "consultations"|"ordonnances"|"radiologies"|"examensGeneraux"|"examensLaboratoire"): void{
    let patient : Patient = this._patient$.value;
    let type : string;
    // if(medication instanceof Consultation){
    //   type = 'consultations';
    // }else if(medication instanceof Ordonnance){
    //   type = 'ordonnances';
    // }else if(medication instanceof Radiologie){
    //   type = 'radiologies';
    // }else if(medication instanceof ExamenGeneral){
    //   type = 'examensGeneraux';
    // }else if(medication instanceof ExamenLaboratoire){
    //   type = 'examensLaboratoire';
    // }else{
    //   type = '';
    // }
    if(categorie){
      patient[categorie] = [medication, ...patient[""+categorie]];
      this.updatePatient(patient);
    }
    console.log(medication)
  }


}
