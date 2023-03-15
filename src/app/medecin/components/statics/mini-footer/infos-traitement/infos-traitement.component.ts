import { Component } from '@angular/core';
import { MedecinService } from 'src/app/medecin/services/medecin.service';

@Component({
  selector: 'app-infos-traitement',
  templateUrl: './infos-traitement.component.html',
  styleUrls: ['./infos-traitement.component.scss']
})
export class InfosTraitementComponent {

  medecin!: {matricule: string, nom: string, prenom: string, hopital: string} | null;
  datetime: Date = new Date();

  constructor(private medecinService: MedecinService) {}

  ngOnInit(): void{
    this.medecin = this.medecinService.getMedecin();
  }
}
