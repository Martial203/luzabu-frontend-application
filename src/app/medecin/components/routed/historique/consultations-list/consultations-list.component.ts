import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consultation } from 'src/app/medecin/models/consultation';

@Component({
  selector: 'app-consultations-list',
  templateUrl: './consultations-list.component.html',
  styleUrls: ['./consultations-list.component.scss']
})
export class ConsultationsListComponent {

  constructor(private dialogRef: MatDialogRef<ConsultationsListComponent>, @Inject(MAT_DIALOG_DATA) private data: {consultation: Consultation, index: number}) {}

  consultation!: Consultation;
  index!: number;
  
  ngOnInit(): void{
    this.consultation = this.data.consultation;
    this.index = this.data.index;
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
