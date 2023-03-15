import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { ExamenLaboratoire } from 'src/app/medecin/models/examen-laboratoire';
import { FormService } from 'src/app/medecin/services/form.service';
import { PatientService } from 'src/app/medecin/services/patient.service';

@Component({
  selector: 'app-test-laboratoire',
  templateUrl: './test-laboratoire.component.html',
  styleUrls: ['./test-laboratoire.component.scss']
})
export class TestLaboratoireComponent {

  mainForm!: FormGroup;
  testForm: FormGroup[] = [];
  images: WebcamImage[] = [];
  imagesFiles: File[] = [];

  @ViewChild('laboForm') form!: NgForm;

  constructor(private formBuilder: FormBuilder, private formService: FormService, private patientService: PatientService) {}

  readonly idPatient: string = this.patientService.getPatientId();

  ngOnInit(): void{
    this.onAddTest();
  }
  
  updateMain(): void{
    this.mainForm = this.formBuilder.group({
      ...this.testForm,
      idPatient: [(this.idPatient!=="") ? this.idPatient : null, [Validators.required]]
    });
  }

  onAddTest(): void{
    this.testForm.push(this.formBuilder.group({
      type: [null, [Validators.required]],
      result: [null, [Validators.required]],
      laboratoire: [null, [Validators.required]],
      remarks: [null, [Validators.required]]
    }, {
      updateOn: 'blur'
    }));
    this.updateMain();
  }

  onRemoveTest(index: number): void{
    this.testForm = this.testForm.filter((val, i) => i!==index);
    this.updateMain();
  }

  getRemarques(value: string[], index: number): void{
    this.testForm[index].controls['remarks'].setValue(value);
  }

  onSubmit(): void{
    if(this.mainForm.valid){
      const examenLaboratoire: ExamenLaboratoire = this.formService.addHeaders({
        id: "1",
        tests: [],
        images: []
      });

      this.testForm.forEach(test => examenLaboratoire.tests.push(test.value))
      this.images.forEach(image => examenLaboratoire.images.push(image.imageAsDataUrl));

      //Api post
      this.patientService.newMedication(examenLaboratoire);
    }
  }

  getImages(images: WebcamImage[]): void{
    this.images = images;
    images.forEach(image => this.imagesFiles.push(this.formService.toFile(image, "name", "image/jpg")));
  }
}
