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
    if(this._patient$.value.cardId !== cardId){
      this.setLoadingStatus(true);
      this.http.request<Patient>('get', `${environment.apiUrl}/doctor/getPatient`, {body: {cardId}}).pipe(
      tap(val => {
        this._patient$.next(val);
        this.patientExists = true;
        this.setLoadingStatus(false);
      })).subscribe()
    }
  }

  getPatientId(): string{
    return this._patient$.value.id;
  }

  updatePatient(patient: Patient): void{
    this.setLoadingStatus(true);
    this.http.put<Patient>(`${environment.apiUrl}/doctor/updatePatient`, patient).pipe(
      tap(val => {
        console.log(val);
        this._patient$.next(patient);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  newMedication(medication: Consultation|Ordonnance|Radiologie|ExamenGeneral|ExamenLaboratoire): void{
    let patient : Patient = this._patient$.value;
    let type : string;
    if(medication instanceof Consultation){
      type = 'consultations';
    }else if(medication instanceof Ordonnance){
      type = 'ordonnances';
    }else if(medication instanceof Radiologie){
      type = 'radiologies';
    }else if(medication instanceof ExamenGeneral){
      type = 'examensGeneraux';
    }else if(medication instanceof ExamenLaboratoire){
      type = 'examensLaboratoire';
    }else{
      type = '';
    }
    if(type!==''){
      patient[type] = [medication, ...patient[type]];
      this.updatePatient(patient);
    }
  }
}
