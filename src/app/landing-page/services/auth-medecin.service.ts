import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/core/models/medecin';

@Injectable({
  providedIn: 'root'
})
export class AuthMedecinService {

  constructor() { }

  login(matricule: string, password: string): Observable<any>{

    return new Observable();
  }

  signIn(physician: Medecin): Observable<any>{

    return new Observable();
  }
  
  getSessionInfos(): {sessionId: string, token: string}|null{

    return {sessionId: "", token: ""};
  }

}
