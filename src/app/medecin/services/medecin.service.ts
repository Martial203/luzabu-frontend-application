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
    this.router.navigateByUrl('/');
  }

  getToken(): string|null{
    return sessionStorage.getItem('Token');
  }

  updateMedecin(): void{

  }

  getMedecin(): {matricule: string, nom: string, prenom: string, hopital: string} | null {
    const medecin = sessionStorage.getItem('physician');
    const medecinObject = (medecin) ? JSON.parse(medecin) : null;
    return (medecinObject) ? {matricule: medecinObject.matricule, nom: medecinObject.lastName, prenom: medecinObject.firstName, hopital: medecinObject.hopitalName} : null;
  }
}
