import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeScannerComponent } from '../qr-code-scanner/qr-code-scanner.component';

@Component({
  selector: 'app-patient-id',
  templateUrl: './patient-id.component.html',
  styleUrls: ['./patient-id.component.scss']
})
export class PatientIdComponent {
  @Input() input: boolean = false;
  idControl: FormControl = new FormControl('');

  constructor(private dialog: MatDialog) {}

  openDialog(): void{
    const dialogRef = this.dialog.open(QrCodeScannerComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.idControl.setValue(result);
      console.log(`Dialog result: ${result}`);
    });
  }
}
