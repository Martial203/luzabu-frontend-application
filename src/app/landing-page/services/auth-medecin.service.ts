import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Medecin } from 'src/app/core/models/medecin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthMedecinService {

  constructor(private http: HttpClient) { }

  login(matricule: string, password: string): Observable<any>{

    return new Observable();
  }

  signIn(medecin: {matricule: string, password: string}): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/doctor/signin`, medecin).pipe(
      tap(val => {
        sessionStorage.setItem('Token', val.token);
        sessionStorage.setItem('physician', JSON.stringify(val.fetchedMedecin));
      })
    );
  }

  getSessionInfos(): {sessionId: string, token: string}|null{

    return {sessionId: "", token: ""};
  }

  signUp(medecin: Medecin): Observable<any>{
    return this.http.post<Medecin>(`${environment.apiUrl}/admin/signupDoctor`, medecin);
  }

}
