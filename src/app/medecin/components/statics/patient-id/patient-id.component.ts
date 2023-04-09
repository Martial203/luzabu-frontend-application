import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/medecin/services/patient.service';
import { QrCodeScannerComponent } from '../qr-code-scanner/qr-code-scanner.component';

@Component({
  selector: 'app-patient-id',
  templateUrl: './patient-id.component.html',
  styleUrls: ['./patient-id.component.scss']
})
export class PatientIdComponent {
  @Input() input: boolean = false;
  idControl: FormControl = new FormControl({value:'', disabled: false});
  @Output() cardId: EventEmitter<string> = new EventEmitter<string>();
  value!: string;

  constructor(private dialog: MatDialog, private patientService: PatientService) {}

  ngOnInit(): void{
    this.idControl.valueChanges.subscribe(val => this.cardId.emit(val));
    this.value = this.patientService.getPatientId();
    if(this.value!=="") this.idControl.setValue(this.value);
    this.detectCamera();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(QrCodeScannerComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.idControl.setValue(result);
      console.log(`Dialog result: ${result}`);
    });
  }


  detectCamera(): void{
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      devices.forEach(device => {
        if(device.kind=="videoinput"){
          this.idControl.disable();
        }
      });
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
      return false;
    });
  }
}
