import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Consultation } from 'src/app/medecin/models/consultation';
import { Patient } from 'src/app/medecin/models/patient';
import { ConsultationsListComponent } from '../consultations-list/consultations-list.component';

@Component({
  selector: 'app-medications-list',
  templateUrl: './medications-list.component.html',
  styleUrls: ['./medications-list.component.scss']
})
export class MedicationsListComponent {

  @Input() patient!: Patient|null;
  @Input() categorie!: string;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void{

  }

  openDialog(consultation: Consultation, index: number): void{
    const dialogRef = this.dialog.open(ConsultationsListComponent, {
      data: {consultation: consultation, index: index}
    });
  }
}
