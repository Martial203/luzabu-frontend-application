import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from '../models/medecin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getSessionInfos(): {sessionId: string, token: string}|null{

    return {sessionId: "", token: ""};
  }
}
