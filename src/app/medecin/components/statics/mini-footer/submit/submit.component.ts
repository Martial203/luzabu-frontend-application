import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from '../../camera/camera.component';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/medecin/services/patient.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent {

  @Output() images: EventEmitter<WebcamImage[]> = new EventEmitter<WebcamImage[]>();
  @Output() submit: EventEmitter<Event> = new EventEmitter<Event>();

  @Input() disabled: boolean = true;
  loading$!: Observable<boolean>;

  constructor(public dialog: MatDialog, private patientService: PatientService) {}

  ngOnInit(): void {
    this.loading$ = this.patientService.loading$;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CameraComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.images.emit(result);
    });
  }

  onClick(event: Event): void{
    this.submit.emit(event);
  }

}
