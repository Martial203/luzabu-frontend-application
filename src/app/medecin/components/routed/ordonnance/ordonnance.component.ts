import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Ordonnance } from 'src/app/medecin/models/ordonnance';
import { FormService } from 'src/app/medecin/services/form.service';
import { PatientService } from 'src/app/medecin/services/patient.service';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.scss']
})
export class OrdonnanceComponent {

  mainForm!: FormGroup;
  medicamentForm: FormGroup[] = [];
  images: WebcamImage[] = [];
  imagesFiles: File[] = [];

  @ViewChild('ordonnanceForm') form!: NgForm;

  constructor(private formBuilder: FormBuilder, private formService: FormService, private patientService: PatientService) {}

  ngOnInit(): void{
    this.onAddMedicament();
  }
  
  updateMain(): void{
    this.mainForm = this.formBuilder.group({
      ...this.medicamentForm
    });
  }

  onAddMedicament(): void{
    this.medicamentForm.push(this.formBuilder.group({
      nom: [null, [Validators.required]],
      famille: [null, [Validators.required]],
      forme: [null, [Validators.required]],
      dosage: [null, [Validators.required]],
      posologie: [null, [Validators.required]],
      observations: [null, [Validators.required]],
    }, {
      updateOn: 'blur'
    }));
    this.updateMain();
  }

  onRemoveMedicament(index: number): void{
    this.medicamentForm = this.medicamentForm.filter((val, i) => i!==index);
    this.updateMain();
  }

  getObservations(value: string[], index: number): void{
    this.medicamentForm[index].controls['observations'].setValue(value);
  }

  onSubmit(): void{
    if(this.mainForm.valid){
      const ordonnance: Ordonnance = this.formService.addHeaders({
        id: '1',
        medicaments: [],
        images: []
      });
      this.medicamentForm.forEach(form => ordonnance.medicaments.push(form.value));
      this.images.forEach(image => ordonnance.images.push(image.imageAsDataUrl));

      // Api call for submission
      this.patientService.newMedication(ordonnance);
    }
  }

  getImages(images: WebcamImage[]): void{
    this.images = images;
    images.forEach(image => this.imagesFiles.push(this.formService.toFile(image, "name", "image/jpg")));
    console.log(this.formService.toFile(images[0], "image", "image/jpg"));
  }
}
