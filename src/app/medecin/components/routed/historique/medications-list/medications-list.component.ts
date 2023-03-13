import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/medecin/models/patient';

@Component({
  selector: 'app-medications-list',
  templateUrl: './medications-list.component.html',
  styleUrls: ['./medications-list.component.scss']
})
export class MedicationsListComponent {

  @Input() patient!: Patient;
  @Input() categorie!: string;

  ngOnInit(): void{

  }
}
