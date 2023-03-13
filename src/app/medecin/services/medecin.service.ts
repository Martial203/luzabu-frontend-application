import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Medecin } from '../models/medecin';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  constructor(private router: Router) { }

  getMedecinId(): string{

    return "";
  }

  getHospital(): string{

    return "";
  }

  signOut(): void{
    sessionStorage.clear();
    this.router.navigateByUrl('/medecin');
  }

  getToken(): string|null{
    return sessionStorage.getItem('Token');
  }
}
