import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { Radiologie } from 'src/app/medecin/models/radiologie';
import { FormService } from 'src/app/medecin/services/form.service';
import { PatientService } from 'src/app/medecin/services/patient.service';

@Component({
  selector: 'app-radiologie',
  templateUrl: './radiologie.component.html',
  styleUrls: ['./radiologie.component.scss']
})
export class RadiologieComponent {

  mainForm!: FormGroup;
  radiologieForm: FormGroup[] = [];
  images: WebcamImage[] = [];
  imagesFiles: File[] = [];
  loading$!: Observable<boolean>;

  @ViewChild('radioForm') form!: NgForm;

  constructor(private formBuilder: FormBuilder, private formService: FormService, private patientService: PatientService) {}

  readonly idPatient: string = this.patientService.getPatientId();

  ngOnInit(): void{
    this.onAddRadiologie();
    this.loading$ = this.patientService.loading$;
  }

  updateMain(): void{
    this.mainForm = this.formBuilder.group({
      ...this.radiologieForm,
      idPatient: [(this.idPatient!=="") ? this.idPatient : null, [Validators.required]]
    });
  }

  onAddRadiologie(): void{
    this.radiologieForm.push(this.formBuilder.group({
      titre: [null, [Validators.required]],
      results: [null, [Validators.required]]
    }, {
      updateOn: 'blur'
    }));
    this.updateMain();
  }

  onRemoveRadiologie(index: number): void{
    this.radiologieForm = this.radiologieForm.filter((val, i) => i!==index);
    this.updateMain();
  }

  getResultats(value: string[], index: number): void{
    this.radiologieForm[index].controls['results'].setValue(value);
  }

  onSubmit(): void{
    console.log("submit")
    if(this.mainForm.valid){
      const radiologie: Radiologie = this.formService.addHeaders({
        id: "1",
        examens: [],
        images: []
      });

      this.radiologieForm.forEach(exam => radiologie.examens.push(exam.value))
      this.images.forEach(image => radiologie.images.push(image.imageAsDataUrl));

      //API post
      this.patientService.newMedication(radiologie, 'radiologies');
    }
  }

  getImages(images: WebcamImage[]): void{
    this.images = images;
    images.forEach(image => this.imagesFiles.push(this.formService.toFile(image, "name", "image/jpg")));
  }
}
