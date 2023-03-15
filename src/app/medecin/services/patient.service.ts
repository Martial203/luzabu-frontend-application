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

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _patient$: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(new Patient());
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private patientExists : boolean = false;

  constructor(private http: HttpClient) { }

  get patient$(): Observable<Patient>{
    return this._patient$.asObservable();
  }

  get loading$(): Observable<boolean>{
    return this._loading$.asObservable();
  }

  private setLoadingStatus(loading: boolean): void{
    this._loading$.next(loading);
  }

  getPatient(cardId: string): void{
    console.log(this._patient$.value);
    if(this._patient$.value.cardId !== cardId){
      this.setLoadingStatus(true);
      this.http.get<Patient>(`${environment.apiUrl}/doctor/getPatient`, {params: {cardId}}).pipe(
      tap(val => {
        this._patient$.next(val['patient']);
        this.patientExists = true;
        this.setLoadingStatus(false);
      })).subscribe({
        next: (val) => console.log(val['patient']),
        error: (err) => console.log(err),
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
    this.http.put<Patient>(`${environment.apiUrl}/doctor/updatePatient`, {cardId: patient.cardId, patient: patient}).pipe(
      tap(val => {
        console.log(val);
        this._patient$.next(patient);
        this.setLoadingStatus(false);
      })
    ).subscribe({
      next: val => console.log(val),
      error: err => console.log(err),
      complete: () => console.log("complete", this._patient$.value['NewPatient'])
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
