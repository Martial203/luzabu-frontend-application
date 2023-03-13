import { Component } from '@angular/core';
import { MedecinService } from 'src/app/medecin/services/medecin.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  constructor(private medecinService: MedecinService) {}

  onSignOut(): void{
    this.medecinService.signOut();
  }
}
