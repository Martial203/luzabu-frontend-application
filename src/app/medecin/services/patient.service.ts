import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _patient$: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(new Patient());
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  
  constructor() { }

  get patient$(): Observable<Patient>{
    return this._patient$.asObservable();
  }

  get loading$(): Observable<boolean>{
    return this._loading$.asObservable();
  }

  private setLoadingStatus(loading: boolean): void{
    this._loading$.next(loading);
  }

  getPatientFromServer(id: string): Observable<Patient>{
    this.setLoadingStatus(true);
    // API call
    return new Observable<Patient>();
  }

  getPatientId(): string{
    // return this.patient$.pipe(
    //   map(patient => patient.id)
    // )
    return this._patient$.value.id;
  }
}
